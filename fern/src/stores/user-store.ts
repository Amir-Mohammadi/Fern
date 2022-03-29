//#region imports
import { BriefProductProps } from '@Components/brief-product';
import { PopUpProps } from '@Components/pop-up';
import { ProductItemProps } from '@Components/product-item';
import { IAddress, ICity, IOrder, IProvince } from '@Interfaces/common';
import { IUserComment } from '@Interfaces/common/user-comment';
import { IUserOrder } from '@Interfaces/common/user-orders';
import { Targets, UserProfileTabs } from '@Screens/user-panel-screen';
import { UserInfoValuesProps } from '@Screens/user-panel-screen/user-information';
import UserService from '@Services/user.service';
import { Stores } from '@Stores';
import { IAddAddress, IChangeEmail, IChangePassword, IChangePhone, IEditAccountInfo } from 'api/models';
import moment from 'jalali-moment';
import { action, makeObservable, observable } from 'mobx';
//#endregion

export class UserStore {
  private userService: UserService;
  constructor() {
    makeObservable(this);

    this.userService = new UserService();
  }

  @observable popUp: { status: boolean; data: PopUpProps } = {
    status: false,
    data: {
      title: '',
      message: '',
      onClose: () => {},
    },
  };
  @observable userProfileTabIndex: UserProfileTabs = UserProfileTabs.Orders;
  @observable orders: Array<IOrder> = [];
  @observable favoriteList: Array<ProductItemProps> = [];
  @observable addFormIsOpen: boolean = false;
  @observable commentList: Array<IUserComment> = [];
  @observable userAddressList: Array<IAddress> = [];
  @observable recentVisits: Array<BriefProductProps> = [];
  @observable userOrders: Array<IUserOrder> = [];

  @observable editTextInput: string = '';
  @observable datePickerDay: number = +moment().locale('fa').format('DD');
  @observable datePickerMonth: number = +moment().locale('fa').format('MM');
  @observable datePickerYear: number = +moment().locale('fa').format('YYYY');
  @observable userData: UserInfoValuesProps = {
    id: 0,
    birthDate: '',
    cardNumber: '',
    email: '',
    job: '',
    nationalCode: '',
    phoneNumber: '',
    nameAndLastName: '',
    rowVersion: '',
    cityId: 0,
    economicCode: '',
    fatherName: '',
    firstName: '',
    gender: 0,
    lastName: '',
    pictureId: '',
  };

  @observable cityList: ICity[] = [];
  @observable provinceList: IProvince[] = [];
  @observable addingAddress: boolean = false;

  private loadAddresses = async () => {
    try {
      this.userAddressList = await this.userService.getAddresses();
    } catch (error) {}
  };

  private loadOrders = async () => {
    try {
      this.userOrders = await this.userService.getOrders();
    } catch (error) {}
  };

  private loadComments = async () => {
    try {
      this.commentList = await this.userService.getUserComments();
    } catch (error) {}
  };

  private loadRecentVisits = async () => {
    try {
      this.recentVisits = await this.userService.getUserRecentVisits();
    } catch (error) {}
  };

  private getAccountInfo = async () => {
    try {
      this.userData = await this.userService.getAccountInfo();
    } catch (error) {}
  };

  @action setUserProfileTab = (index: UserProfileTabs) => {
    this.userProfileTabIndex = index;
  };
  @action changeDatePickerDay(day: number) {
    this.datePickerDay = day;
  }

  @action changeDatePickerMonth(month: number) {
    this.datePickerMonth = month;
  }

  @action changeDatePickerYear(year: number) {
    this.datePickerYear = year;
  }

  @action async onSubmitBirthDateEdit() {
    var solarDate = `${this.datePickerYear}/${this.datePickerMonth}/${this.datePickerDay}`;
    var gregorianDate = moment.locale('en');
    gregorianDate = moment.from(solarDate, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');
    const info: IEditAccountInfo = {
      id: this.userData.id,
      birthday: gregorianDate,
      row_version: this.userData.rowVersion,
    };
    try {
      const res = await this.userService.editAccountInfo(info);

      this.getAccountInfo();
    } catch (error) {
      alert(error.message);
    }
  }
  private async onSubmitNameAndLastNameEdit(name: { firstName: string; lastName: string }) {
    const info: IEditAccountInfo = {
      id: this.userData.id,
      first_name: name.firstName,
      last_name: name.lastName,
      row_version: this.userData.rowVersion,
    };
    try {
      const res = await this.userService.editAccountInfo(info);

      this.getAccountInfo();
    } catch (error) {
      alert(error.message);
    }
  }

  private async onSubmitNationalCodeEdit(value: string) {
    const info: IEditAccountInfo = {
      id: this.userData.id,
      national_code: value,
      row_version: this.userData.rowVersion,
    };
    try {
      const res = await this.userService.editAccountInfo(info);

      this.getAccountInfo();
    } catch (error) {
      alert(error.message);
    }
  }

  private async onSubmitPhoneNumberEdit(phoneNumber: string) {
    const info: IChangePhone = {
      phone: phoneNumber,
      row_version: this.userData.rowVersion,
    };

    try {
      const res = await this.userService.changePhone(info);

      this.getAccountInfo();
    } catch (error) {}
  }

  private async onSubmitEmailEdit(email: string) {
    const info: IChangeEmail = {
      email: email,
      row_version: this.userData.rowVersion,
    };

    try {
      const res = await this.userService.changeEmail(info);
      this.getAccountInfo();
    } catch (error) {
      alert(error.message);
    }
  }
  private async onSubmitPasswordEdit(password: IChangePassword) {
    try {
      await this.userService.changePassword(password);
    } catch (error) {
      alert(error.message);
    }
  }

  private async loadProvinceList() {
    this.provinceList = await this.userService.getProvinces();
  }

  private async saveNewAddress(address: IAddress) {
    this.addingAddress = true;
    Stores?.global.setLoading(true);
    try {
      const newAddress: IAddAddress = {
        city_id: address.city.id,
        address_owner_name: address.addressOwnerName,
        phone: address.phone,
        postal_code: address.postalCode,
        description: address.description,
        row_version: address.rowVersion || null,
      };

      if (address.id == 0) {
        await this.userService.addAddress(newAddress);
      } else {
        await this.userService.updateAddress(newAddress, address.id);
      }

      this.loadAddresses();
    } catch (error) {
      alert('failed');
    } finally {
      Stores?.global.setLoading(false);
      this.addingAddress = false;
    }
  }

  private async setDefault(address: IAddress) {
    Stores?.global.setLoading(true);
    try {
      await this.userService.setDefaultAddress(address.id);
      this.loadAddresses();
    } catch (error) {}
    Stores?.global.setLoading(false);
  }

  private deleteAddress(address: IAddress) {
    this.setPopUp(true, {
      title: 'حذف آدرس',
      message: 'آیا میخواهید آدرس موردنظر را حذف کنید ؟',
      options: [
        {
          text: 'بله',
          type: 'submit',
          action: async () => {
            Stores?.global.setLoading(true);
            try {
              await this.userService.deleteAddress(address.id);
              this.loadAddresses();
              Stores?.global.setLoading(false);
              this.setPopUp(false);
            } catch (error) {
              Stores?.global.setLoading(false);
            }
          },
        },
        {
          text: 'انصراف',
          type: 'cancel',
          action: () => {
            this.setPopUp(false);
          },
        },
      ],
      onClose: () => this.setPopUp(false),
    });
  }

  private loadFavoriteList = async () => {
    try {
      this.favoriteList = await this.userService.getLikedProducts();
    } catch (error) {
      console.log(error);
    }
  };

  private selectProvince = async (province: number) => {
    Stores?.global.setLoading(true);
    try {
      this.cityList = await this.userService.getProvinceCities(province);
    } catch (error) {}
    Stores?.global.setLoading(false);
  };

  private async deleteComment(comment: IUserComment) {
    Stores?.global.setLoading(true);
    try {
      await this.userService.deleteComment(comment.productId, comment.id);
      this.loadComments();
    } catch (error) {}
    Stores?.global.setLoading(false);
  }

  private setPopUp = (status: boolean, data?: PopUpProps) => {
    const temp = { ...this.popUp };
    temp.status = status;
    temp.data = data || {
      title: '',
      message: '',
      onClose: () => {},
    };

    this.popUp = temp;
  };

  @action handleActions = (target: Targets, value?: any) => {
    switch (target) {
      case Targets.GET_ADDRESSES:
        this.loadAddresses();
        break;
      case Targets.GET_COMMENTS:
        this.loadComments();
        break;
      case Targets.DELETE_COMMENT:
        this.deleteComment(value);
        break;
      case Targets.GET_FAVORITES:
        this.loadFavoriteList();
        break;
      case Targets.GET_ORDERS:
        this.loadOrders();
        break;
      case Targets.GET_RECENT_VISITS:
        this.loadRecentVisits();
        break;
      case Targets.GET_USER_INFO:
        this.getAccountInfo();
        break;
      case Targets.GET_PROVINCES_LIST:
        this.loadProvinceList();
        break;
      case Targets.SET_DEFAULT_ADDRESS:
        this.setDefault(value);
        break;
      case Targets.SELECT_PROVINCE:
        this.selectProvince(value);
        break;
      case Targets.DELETE_ADDRESS:
        this.deleteAddress(value);
        break;
      case Targets.ADD_ADDRESS:
        this.saveNewAddress(value);
        break;
      case Targets.CHANGE_JOB:
        this.onSubmitEmailEdit(value);
        break;
      case Targets.CHANGE_EMAIL:
        this.onSubmitEmailEdit(value);
        break;
      case Targets.CHANGE_PASSWORD:
        this.onSubmitPasswordEdit(value);
        break;
      case Targets.CHANGE_PHONE_NUMBER:
        this.onSubmitPhoneNumberEdit(value);
        break;
      case Targets.CHANGE_NATIONAL_CODE:
        this.onSubmitNationalCodeEdit(value);
        break;
      case Targets.CHANGE_FIRST_AND_LAST_NAME:
        this.onSubmitNameAndLastNameEdit(value);
        break;
      default:
        break;
    }
  };
}

//#region consts

//#endregion

//#region types
export interface InjectedUserStore {
  user: UserStore;
}
//#endregion
