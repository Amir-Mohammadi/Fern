import Button from '@Components/button';
import DropDown from '@Components/dropdown';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IAddress, ICity, IProvince } from '@Interfaces/common';
import React, { useEffect, useState } from 'react';
import styles from './add-address-form.module.scss';

interface props {
  onCloseForm: () => void;
  provinceList: Array<IProvince>;
  cityList: Array<ICity>;
  onSelectProvince: (province: number) => void;
  onAddNewAddress: (newAddress: IAddress) => void;
  editingAddress?: IAddress;
}

export type AddAddressFormProps = props;

const AddAddressForm: React.FC<AddAddressFormProps> = (props) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const [selectedProvinceIndex, setSelectedProvinceIndex] = useState(
    props.editingAddress ? props.provinceList.findIndex((x) => x.id == props.editingAddress?.city.province.id) : -1,
  );
  const [selectedCityIndex, setSelectedCityIndex] = useState(
    props.editingAddress ? props.cityList.findIndex((x) => x.id == props.editingAddress?.city.id) : -1,
  );
  const [addressDescription, setAddressDescription] = useState(props.editingAddress?.description || '');
  const [addressOwnerName, setAddressOwnerName] = useState(props.editingAddress?.addressOwnerName || '');
  const [addressPhoneNumber, setAddressPhoneNumber] = useState(props.editingAddress?.phone || '');
  const [addressPostalCode, setAddressPostalCode] = useState(props.editingAddress?.postalCode || '');

  // const resetAddressForm = () => {
  //   setSelectedProvinceIndex(-1);
  //   setSelectedCityIndex(-1);
  //   setAddressDescription('');
  //   setAddressOwnerName('');
  //   setAddressPhoneNumber('');
  //   setAddressPostalCode('');
  // };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.formHD}>
          <span>افزودن آدرس جدید</span>
          <Button.Basic
            onClick={() => {
              props.onCloseForm();
            }}>
            <FontAwesomeIcon icon={faTimes} color={'#db0060'} />
          </Button.Basic>
        </div>
        <div className={styles.formBD}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <span>استان</span>
              <DropDown
                option={props.provinceList.map((province) => ({
                  title: province.name,
                }))}
                selectedIndex={[selectedProvinceIndex]}
                onSelect={(index) => {
                  setSelectedProvinceIndex(index);
                  setSelectedCityIndex(-1);
                  if (props.onSelectProvince && props.provinceList[index]) {
                    props.onSelectProvince(props.provinceList[index].id);
                  }
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <span>شهر</span>
              <DropDown
                option={props.cityList.map((city) => ({ title: city.name }))}
                selectedIndex={[selectedCityIndex]}
                onSelect={setSelectedCityIndex}
                disabled={selectedProvinceIndex === -1}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <span>آدرس</span>
              <input
                type="text"
                value={addressDescription}
                onChange={({ target }) => {
                  setAddressDescription(target.value);
                }}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <span>نام تحویل گیرنده</span>
              <input
                type="text"
                value={addressOwnerName}
                onChange={({ target }) => {
                  setAddressOwnerName(target.value);
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <span>شماره تلفن</span>
              <input
                type="text"
                value={addressPhoneNumber}
                onChange={({ target }) => {
                  setAddressPhoneNumber(target.value);
                }}
              />
            </div>
            <div className={styles.inputGroup}>
              <span>کد پستی</span>
              <input
                type="text"
                value={addressPostalCode}
                onChange={({ target }) => {
                  setAddressPostalCode(target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.formFT}>
          <Button.Basic
            text="ثبت"
            buttonClassName={styles.success}
            onClick={() => {
              props.onAddNewAddress({
                id: props.editingAddress?.id || 0,
                city: props.cityList[selectedCityIndex],
                addressOwnerName: addressOwnerName,
                description: addressDescription,
                phone: addressPhoneNumber,
                postalCode: addressPostalCode,
                isDefault: false,
                rowVersion: props.editingAddress?.rowVersion || '',
              });
              props.onCloseForm();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddAddressForm;
