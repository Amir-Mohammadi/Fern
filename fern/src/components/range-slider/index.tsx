import { Filter as FilterIcon, Icons } from '@Components/icons';
import Slider, { Mark } from '@material-ui/core/Slider';
import React from 'react';
import styles from './range-slider.module.scss';

interface Props {
  header?: string;
  min: number;
  max: number;
  marks: Array<Mark>;
  value: Array<number>;
  onChange?: (value: Array<number>) => void;
  onApply?: () => void;
}

export type RangeSliderProps = Props;

const RangeSlider: React.FC<RangeSliderProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardHeader}>
        <Icons icon={FilterIcon} color="#707070" size={16} />
        <span>&nbsp;{props.header}</span>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.rangeSlider}>
          <Slider
            value={props.value}
            step={null}
            onChange={(event: React.ChangeEvent<{}>, value: number | number[]) => {
              props.onChange!(value as number[]);
              console.log(value);
            }}
            valueLabelDisplay="off"
            marks={props.marks}
            min={props.min}
            max={props.max}
          />
          <div className={styles.labels}>
            <div className={styles.price}>
              <label>تا</label>
              <span>{props.value[1]}</span>
            </div>
            <div className={styles.price}>
              <label>از</label>
              <span>{props.value[0]}</span>
            </div>
          </div>
          <div className={styles.applyBtn}>
            <button onClick={() => props.onApply!()}>اعمال محدوده</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
