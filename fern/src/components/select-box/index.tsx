import React from 'react';
import styles from './selectBox.module.scss';

interface Props {
  options?: string[];
  tooltip?: string;
  disabled?: boolean;
  handleChange: (value: string) => void;
  placeholder: string;
}

type SelectBoxProps = Props;

const SelectBox: React.FC<SelectBoxProps> = (props) => {
  return (
    <select disabled={props.disabled} className={styles.box} onChange={(x) => props.handleChange(x.target.value)}>
      <option value="" hidden>
        {props.placeholder}
      </option>
      {props.options
        ? props.options.map((option, index) => (
            <option className={styles.options} value={index} key={index}>
              {option}
            </option>
          ))
        : null}
    </select>
  );
};

export default SelectBox;
