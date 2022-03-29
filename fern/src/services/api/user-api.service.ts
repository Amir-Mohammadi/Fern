import { IAddress, IUser } from '@Interfaces/common';
import { ISaveUserAddress } from '@Interfaces/common/save-user-address';
import { UserAddressModel, UserModel } from '@Services';
import { adaptorService } from '@Services/adaptor';
import authService from '@Services/common/auth.service';
import Transporter from '@Utils/transporter';

class UserApiService {
  private _transporter: Transporter;

  constructor(transporter: Transporter) {
    this._transporter = transporter;
  }
  public async getUserAddresses(): Promise<IAddress[]> {
    const addresses = await this._transporter.get<Array<UserAddressModel>>(`me/addresses`);
    return adaptorService.userApiAdaptor.transformAddresses(addresses);
  }

  public async addNewAddress(address: ISaveUserAddress): Promise<void> {
    var saveUserAddressModel = adaptorService.userApiAdaptor.reverseTransformSaveUserAddressModel(address);
    return await this._transporter.post<void>(`me/addresses`, {
      data: saveUserAddressModel,
    });
  }
  public async getCurrentUser(): Promise<IUser> {
    try {
      const user = await this._transporter.get<UserModel>(`me`);
      return adaptorService.userApiAdaptor.transformUser(user);
    } catch (error) {
      // ? if 'me' route fails, that means out token is wrong or invalid for the api, so we delete that here
      authService.removeAuthenticationResult();
      throw error;
    }
  }
  public async logout(): Promise<void> {
    return await this._transporter.post<void>(`users/logout`);
  }
}

export default UserApiService;
