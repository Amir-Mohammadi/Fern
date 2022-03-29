import AddAddressForm from '@Components/add-address-form';
import Button from '@Components/button';
import { Avatar, Call, Delete, Desc, Email, Icons, Location } from '@Components/icons';
import { IAddress, ICity, IProvince } from '@Interfaces/common';
import React, { useEffect, useState } from 'react';
import styles from './user-panel.module.scss';

interface Props {
  adding: boolean;
  cityList: Array<ICity>;
  addresses: Array<IAddress>;
  provinceList: Array<IProvince>;
  getAddresses?: () => void;
  loadProvincesList?: () => void;
  setDefault?: (address: IAddress) => void;
  onDeleteAddress?: (address: IAddress) => void;
  onSelectProvince?: (provinceId: number) => void;
  onSaveNewAddress?: (newAddress: IAddress) => void;
}
export type UserAddressProps = Props;

const UserAddress: React.FC<UserAddressProps> = (props) => {
  const [isSaveAddressOpen, setIsSaveAddressOpen] = useState<boolean>(false);
  const [editingAddressIndex, setEditingAddressIndex] = useState<number>(-1);

  useEffect(() => {
    props.getAddresses!();
    return () => {};
  }, []);

  const openSaveAddressForm = () => {
    setIsSaveAddressOpen(true);
    props.loadProvincesList!();
  };

  const closeSaveAddressForm = () => {
    setIsSaveAddressOpen(false);
    setEditingAddressIndex(-1);
  };

  return (
    <div className={styles.AddressBX}>
      {props.addresses.length ? (
        <div className={styles.mainAddress}>
          <div className={styles.actionBar}>
            <button
              onClick={() => {
                openSaveAddressForm();
              }}>
              افزودن آدرس
            </button>
          </div>
          <div className={styles.addressBoard}>
            {props.addresses.map((address, i) => (
              <div className={styles.addressInfo} key={address.id}>
                <div className={styles.infoLine}>
                  <Icons icon={Location} size={14} color={'#707070'} />
                  <span>{address.city.province.name + ' - ' + address.city.name + ' - ' + address.description}</span>
                </div>
                <div className={styles.infoLine}>
                  <Icons icon={Avatar} size={14} color={'#707070'} />
                  <span>{address.addressOwnerName}</span>
                </div>
                <div className={styles.infoLine}>
                  <Icons icon={Email} size={14} color={'#707070'} />
                  <span>{address.postalCode}</span>
                </div>
                <div className={styles.infoLine}>
                  <Icons icon={Call} size={14} color={'#707070'} />
                  <span>{address.phone}</span>
                </div>
                <div className={styles.addressIcon}>
                  {address.isDefault == false && <button onClick={() => props.setDefault!(address)}>پیش فرض</button>}
                  <button
                    onClick={() => {
                      openSaveAddressForm();
                      setEditingAddressIndex(i);
                    }}>
                    <Icons icon={Desc} color={'#d3d3d3'} size={24} />
                  </button>
                  <Button.Basic onClick={() => props.onDeleteAddress!(address)}>
                    <Icons icon={Delete} color={'#d3d3d3'} size={24} />
                  </Button.Basic>
                </div>
                <div className={styles.addressIcon}></div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.addAddress}>
          <button
            onClick={() => {
              openSaveAddressForm();
            }}>
            افزودن آدرس
          </button>
        </div>
      )}

      {(isSaveAddressOpen || props.adding) && (
        <AddAddressForm
          onCloseForm={closeSaveAddressForm}
          cityList={props.cityList}
          provinceList={props.provinceList}
          onSelectProvince={(provinceId) => props.onSelectProvince!(provinceId)}
          onAddNewAddress={(address) => props.onSaveNewAddress!(address)}
          editingAddress={editingAddressIndex == -1 ? undefined : props.addresses[editingAddressIndex]}
        />
      )}
    </div>
  );
};

export default UserAddress;
