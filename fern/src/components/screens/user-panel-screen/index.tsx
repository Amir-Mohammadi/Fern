import Alert from '@Components/alert';
import { BriefProductProps } from '@Components/brief-product';
import { Avatar, Comments, Like, Location, OrderList, RecentVisits } from '@Components/icons';
import NavBar from '@Components/nav-bar';
import PopUP, { PopUpProps } from '@Components/pop-up';
import { ProductItemProps } from '@Components/product-item';
import SupportTag from '@Components/support-tag';
import { IUserOrder } from '@Interfaces/common/user-orders';
import React, { useState } from 'react';
import UserAddress, { UserAddressProps } from './user-address';
import UserComments, { UserCommentsProps } from './user-comment';
import UserFavorites from './user-favorite';
import UserInfo, { UserInformationProps } from './user-information';
import UserOrders from './user-orders';
import styles from './user-panel.module.scss';
import UserRecentVisits from './user-visit';

export enum Targets {
  GET_ORDERS = 'user-panel-get-orders',
  CHANGE_JOB = 'user-panel-change-job',
  ADD_ADDRESS = 'user-panel-add-address',
  CHANGE_EMAIL = 'user-panel-change-email',
  GET_COMMENTS = 'user-panel-get-comments',
  GET_USER_INFO = 'user-panel-get-user-info',
  GET_FAVORITES = 'user-panel-get-favorites',
  GET_ADDRESSES = 'user-panel-get-addresses',
  DELETE_ADDRESS = 'user-panel-delete-address',
  DELETE_COMMENT = 'user-panel-delete-comment',
  CHANGE_PASSWORD = 'user-panel-change-password',
  SELECT_PROVINCE = 'user-panel-select-province',
  CHANGE_BIRTH_DATE = 'user-panel-change-birth-date',
  GET_RECENT_VISITS = 'user-panel-get-recent-visits',
  GET_PROVINCES_LIST = 'user-panel-get-provinces-list',
  SET_DEFAULT_ADDRESS = 'user-panel-set-default-address',
  CHANGE_PHONE_NUMBER = 'user-panel-change-phone-number',
  CHANGE_NATIONAL_CODE = 'user-panel-change-national-code',
  CHANGE_FIRST_AND_LAST_NAME = 'user-panel-change-first-and-last-name',
}

export enum UserProfileTabs {
  Orders,
  Favorites,
  Comments,
  Addresses,
  // GiftCards,
  // Messages,
  RecentVisits,
  ProfileInfo,
}
interface Props {
  orders: Array<IUserOrder>;
  favoriteList: Array<ProductItemProps>;
  recentVisits: Array<BriefProductProps>;
  addressList: UserAddressProps;
  userInfo: UserInformationProps;
  userCommentsProps: UserCommentsProps;

  popUp: { status: boolean; data: PopUpProps };

  action: (target: Targets, value?: any) => void;
}

export type UserPanelProps = Props;

const UserPanel: React.FC<UserPanelProps> = (props) => {
  const [tabIndex, setTabIndex] = useState<UserProfileTabs>(UserProfileTabs.Orders);

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div className={styles.navBar}>
          <NavBar
            name={props.userInfo.userInfoValues.nameAndLastName}
            onClick={setTabIndex}
            selected={tabIndex}
            items={navigationTabs}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.alertBox}>
            <Alert text={navigationTabs[tabIndex].text} />
          </div>
          <div className={styles.box}>{renderPanel(props, tabIndex)}</div>
        </div>
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.support}>
          <SupportTag />
        </div>
      </div>
      {props.popUp.status && <PopUP {...props.popUp.data} />}
    </div>
  );
};
export default UserPanel;

const renderPanel = (props: UserPanelProps, tabIndex: UserProfileTabs) => {
  switch (tabIndex) {
    case UserProfileTabs.Orders:
      return <UserOrders orders={props.orders} getOrders={() => props.action(Targets.GET_ORDERS)} />;
    case UserProfileTabs.Favorites:
      return <UserFavorites favorites={props.favoriteList} getFavorites={() => props.action(Targets.GET_FAVORITES)} />;
    case UserProfileTabs.Comments:
      return (
        <UserComments
          {...props.userCommentsProps}
          getComments={() => props.action(Targets.GET_COMMENTS)}
          onDeleteComment={(comment) => props.action(Targets.DELETE_COMMENT, comment)}
        />
      );
    case UserProfileTabs.Addresses:
      return (
        <UserAddress
          {...props.addressList}
          getAddresses={() => props.action(Targets.GET_ADDRESSES)}
          loadProvincesList={() => props.action(Targets.GET_PROVINCES_LIST)}
          onSaveNewAddress={(address) => props.action(Targets.ADD_ADDRESS, address)}
          onSelectProvince={(provinceId) => props.action(Targets.SELECT_PROVINCE, provinceId)}
          onDeleteAddress={(address) => props.action(Targets.DELETE_ADDRESS, address)}
          setDefault={(address) => {
            props.action(Targets.SET_DEFAULT_ADDRESS, address);
          }}
        />
      );
    // case UserProfileTabs.GiftCards:
    //   return <UserGiftCard />;
    // case UserProfileTabs.Messages:
    // return <UserMassage />;
    case UserProfileTabs.ProfileInfo:
      return (
        <UserInfo
          {...props.userInfo}
          getAccountInfo={() => props.action(Targets.GET_USER_INFO)}
          changeBirthDate={() => props.action(Targets.CHANGE_BIRTH_DATE)}
          changeJob={(job) => props.action(Targets.CHANGE_JOB, job)}
          changeEmail={(email) => props.action(Targets.CHANGE_EMAIL, email)}
          changePassword={(password) => props.action(Targets.CHANGE_PASSWORD, password)}
          changeFirstAndLastName={(name) => props.action(Targets.CHANGE_FIRST_AND_LAST_NAME, name)}
          changePhoneNumber={(phoneNumber) => props.action(Targets.CHANGE_PHONE_NUMBER, phoneNumber)}
          changeNationalCode={(nationalCode) => props.action(Targets.CHANGE_NATIONAL_CODE, nationalCode)}
        />
      );
    case UserProfileTabs.RecentVisits:
      return (
        <UserRecentVisits visits={props.recentVisits} getRecentVisits={() => props.action(Targets.GET_RECENT_VISITS)} />
      );
    default:
      return null;
  }
};

const navigationTabs = [
  { icon: OrderList, text: 'سفارش های من' },
  { icon: Like, text: 'علاقه مندی ها' },
  { icon: Comments, text: 'نظرات' },
  { icon: Location, text: 'نشانی ها' },
  // { icon: IconTypes.GiftCard, text: 'کارت هدیه' },
  // { icon: IconTypes.Email, text: 'پیغام ها' },
  { icon: RecentVisits, text: 'بازدیدهای اخیر' },
  { icon: Avatar, text: 'اطلاعات حساب' },
];
