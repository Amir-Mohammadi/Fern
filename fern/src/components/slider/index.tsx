import Button from '@Components/button';
import { Mode } from '@Constants/colors';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { castPosition, Position } from '@Utils/position-types';
import classNames from 'classnames';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { MoonLoader } from 'react-spinners';
import styles from './slider.module.scss';

interface Props {
  data: SliderDataProps[];
  loading?: boolean;
  index?: number;
  autoSlide?: boolean;
  badgeVisible?: boolean;
  disabled?: boolean;
  buttonPosition?: Position;
}

export type SliderDataProps = {
  imageUrl?: string;
  targetUrl?: string;
  alt?: string;
  title?: string;
};

export type SliderProps = Props;

const Slider: React.FC<SliderProps> = (props) => {
  const isSmallDevice = useMediaQuery({
    query: '(max-device-width: 768px)',
  });
  const [index, setIndex] = useState(props.index || 0);

  const limit = props.data.length - 1;

  if (props.autoSlide) {
    setTimeout(() => {
      if (index < limit) {
        setIndex(1 + index);
      } else {
        setIndex(0);
      }
    }, 3500);
  }

  return (
    <div className={styles.container}>
      {props.loading && (
        <div className={styles.loadingDialog}>
          <MoonLoader color={Mode.success} loading={true} size={60} />
        </div>
      )}
      <div className={styles.slider}>
        <div className={styles.bxImage}>
          {props.data.map((url, i) => (
            <img key={i + 'data'} className={classNames({ [styles.active]: i === index })} src={url.imageUrl} />
          ))}
        </div>
        <div className={styles.controller}>
          <div className={styles.bxButton} style={castPosition(props.buttonPosition || Position.topLeft)}>
            <Button.Basic text="لیست محصولات" />
          </div>
          <div className={styles.bxBadge}>
            {props.data.map((data, i) => (
              <span
                key={i + 'data2'}
                className={styles.bullet}
                style={{
                  backgroundColor: i == index ? '#DB0060' : '#FFFFFF',
                }}
                onClick={() => {
                  setIndex(i);
                }}
              />
            ))}
          </div>
        </div>
        <div className={styles.bxIcons}>
          <span
            onClick={() => {
              if (index < limit) {
                setIndex(1 + index);
              } else {
                setIndex(0);
              }
            }}>
            <FontAwesomeIcon icon={faChevronRight} color={'#FFFFFF'} width={'30px'} />
          </span>
          <span
            onClick={() => {
              if (index > 0) {
                setIndex(index - 1);
              } else {
                setIndex(limit);
              }
            }}>
            <FontAwesomeIcon icon={faChevronLeft} color={'#FFFFFF'} width={'30px'} />
          </span>
        </div>
      </div>
      {!isSmallDevice && (
        <div className={styles.previews}>
          <div className={styles.preview}>{props.data.length > 0 && <img src={props.data[0].imageUrl} alt="" />}</div>

          <div
            className={styles.preview}
            style={{
              backgroundImage: 'linear-gradient(#FF9E80, #FFF3E0)',
            }}>
            {props.data.length > 1 && <img src={props.data[1].imageUrl} alt="" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;
