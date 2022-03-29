import AddAddressForm from '@Components/add-address-form';
import { Avatar, Icons, Location } from '@Components/icons';
import RadioButton from '@Components/radio-button';
import Separator from '@Components/separator';
import { IAddress, ICity, IProvince } from '@Interfaces/common';
import React, { useState } from 'react';
import styles from './order-addresses.module.scss';

interface Props {
  cityList: Array<ICity>;
  addresses: Array<IAddress>;
  provinceList: Array<IProvince>;
  selectedAddressIndex: number;
  loadProvincesList: () => void;
  loadCitiesList: (provinceId: number) => any;
  onAddNewAddress: (newAddress: IAddress, callBack?: () => void) => void;
  changeSelectedAddress: (addressIndex: number) => any;
}

export type OrderAddressesProps = Props;
const OrderAddresses: React.FC<OrderAddressesProps> = (props) => {
  const [isSaveAddressOpen, setIsSaveAddressOpen] = useState<boolean>(false);
  const [selectMode, setSelectMode] = useState<boolean>(false);

  const openSaveAddressForm = () => {
    setIsSaveAddressOpen(true);
    props.loadProvincesList();
  };

  const closeSaveAddressForm = () => {
    setIsSaveAddressOpen(false);
  };

  const renderAddressItem = (address: IAddress, index: number) => {
    return (
      <div className={styles.addressItem}>
        <div
          onClick={() => {
            props.changeSelectedAddress(index);
            setSelectMode(false);
          }}
          style={{
            cursor: 'pointer',
          }}>
          <RadioButton onChange={() => {}} text={'انتخاب آدرس'} value={props.selectedAddressIndex == index} />
        </div>

        <Separator />
        <div className={styles.addressParam}>
          <Icons icon={Location} size={20} />
          <span>{`${address.description}`}</span>
        </div>
        <div className={styles.addressParam}>
          <Icons icon={Avatar} size={20} />
          <span>{`${address.addressOwnerName}`}</span>
        </div>
        <div className={styles.addressParam}>
          <span>{`${address.phone} - ${address.postalCode}`}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {!selectMode && props.selectedAddressIndex > -1 ? (
        <div className={styles.orderAddress}>
          <span>آدرس تحویل سفارش: </span>
          <div className={styles.addressDescription}>
            {`${props.addresses[props.selectedAddressIndex].city.province.name} - ${
              props.addresses[props.selectedAddressIndex].city.name
            } - ${props.addresses[props.selectedAddressIndex].description}`}
          </div>
          <div className={styles.addressOwner}>
            <Icons icon={Avatar} color="#707070" size={16} />
            <span>{props.addresses[props.selectedAddressIndex].addressOwnerName}</span>
          </div>

          <button onClick={() => setSelectMode(true)}>تغییر یا ویرایش آدرس</button>
        </div>
      ) : (
        <div className={styles.selectAddress}>
          <div className={styles.actionBar}>
            {!props.addresses.length && <span>آدرسی برای انتخاب وجود ندارد</span>}
            <button
              onClick={() => {
                openSaveAddressForm();
              }}>
              افزود آدرس
            </button>
          </div>
          <div className={styles.addressesList}>
            {props.addresses.map((address, i) => renderAddressItem(address, i))}
          </div>
          {isSaveAddressOpen && (
            <AddAddressForm
              onCloseForm={closeSaveAddressForm}
              cityList={props.cityList}
              provinceList={props.provinceList}
              onSelectProvince={(province) => props.loadCitiesList(province)}
              onAddNewAddress={(address: IAddress) => props.onAddNewAddress(address)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default OrderAddresses;
