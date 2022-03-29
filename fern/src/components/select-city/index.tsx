import { Close, Icons, LeftSwipe, RightSwipe } from '@Components/icons';
import { ICity, ILocation, IProvince } from '@Interfaces/common';
import React, { useState } from 'react';
import styles from './select-city.module.scss';

interface Props {
  onClose?: () => void;
  onSelectProvince?: (province: IProvince) => void;
  onSelectCity?: (city: ICity) => void;
  locationList: ILocation[];
}
export type SelectCityProps = Props;

const SelectCity: React.FC<SelectCityProps> = (props) => {
  const [selectedProvinceIndex, setSelectedProvinceIndex] = useState(-1);

  if (selectedProvinceIndex < 0) {
    return (
      <div className={styles.container}>
        <div onClick={props.onClose} className={styles.top}>
          <span>{'انتخاب استان'}</span>
          <Icons icon={Close} size={18} color="#707070" />
        </div>
        <div className={styles.middle}>
          {props.locationList.map((location, index) => (
            <div className={styles.Icons} onClick={() => {}}>
              <div
                onClick={() => {
                  setSelectedProvinceIndex(index);
                  props.onSelectProvince ? props.onSelectProvince(location.province) : null;
                }}
                className={styles.pay}>
                {location.province.name}
              </div>

              <Icons icon={LeftSwipe} size={15} color="#707070" />
            </div>
          ))}
        </div>
      </div>
    );
  } else
    return (
      <div className={styles.container}>
        <div onClick={props.onClose} className={styles.top}>
          <span>{'انتخاب شهر'}</span>
          <Icons icon={Close} size={18} color="#707070" />
        </div>
        <div className={styles.pay}>
          <Icons icon={RightSwipe} size={18} color="#707070" />
          <span
            onClick={() => {
              setSelectedProvinceIndex(-1);
            }}>
            {'بازگشت به لیست استان ها'}
          </span>
        </div>
        <div className={styles.middle}>
          {props.locationList[selectedProvinceIndex].cities.map((city, index) => (
            <div className={styles.Icons} onClick={() => {}}>
              <div
                onClick={() => {
                  props.onSelectCity ? props.onSelectCity(city) : null;
                  props.onClose ? props.onClose() : null;
                }}
                className={styles.pay}>
                {city.name}
              </div>
              <Icons icon={LeftSwipe} size={15} color="#707070" />
            </div>
          ))}
        </div>
      </div>
    );
};

export default SelectCity;
