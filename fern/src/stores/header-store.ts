//#region imports
import { ICategoryTree } from '@Components/header';
import { IUser } from '@Interfaces/common';
import { IBriefCart } from '@Interfaces/common/brief-cart';
import { apiService, cartService } from '@Services';
import authService from '@Services/common/auth.service';
import HeaderService from '@Services/headerService';
import { action, computed, makeObservable, observable } from 'mobx';
//#endregion

export class HeaderStore {
  headerService: HeaderService;
  constructor() {
    makeObservable(this);

    this.headerService = new HeaderService();
  }

  @observable user?: IUser = undefined;
  @observable categoryLists: ICategoryTree[] = [];
  @observable cart: IBriefCart = { id: 0, cartItems: [], totalPrice: '0' };

  @action onLogout = async () => {
    await authService.logout();
    this.user = undefined;
    window.location.href = '/';
    localStorage.clear();
  };

  @action hydrate(state: HeaderStoreHydrateProps | undefined): void {
    if (state == undefined) return;

    this.user = state.user ?? undefined;
    this.categoryLists = state.categoryLists;
    this.cart = state.cart;
  }

  @computed get userFullName() {
    if (this.user?.firstName || this.user?.lastName) {
      return `${this.user?.firstName}  ${this.user?.lastName}`;
    } else {
      return this.user?.phone;
    }
  }

  /**
   * this function run whenever header get rendered
   */
  @action async onFetchData() {
    if (authService.isAuthenticated) {
      await Promise.all([this._onFetchCategoryListData(), this._onFetchUserData(), this.onFetchCartItemData()]);
    } else {
      await Promise.all([this._onFetchCategoryListData(), this.onFetchCartItemData()]);
    }
  }

  @action private async _onFetchCategoryListData() {
    try {
      this.categoryLists = await this.headerService.getCategories();
      // this.categoryLists = await apiService.v1.MarketApi.getMarketProductCategories();
    } catch (error) {
      console.error('failed on fetch data ' + error.message);
    }
  }

  @action private async _onFetchUserData() {
    try {
      this.user = await apiService.v1.UserApi.getCurrentUser();
    } catch (error) {
      console.error('failed on fetch data ' + error.message);
    }
  }

  @action public async onFetchCartItemData() {
    try {
      const cart = await cartService.getBriefCart();

      if (cart !== undefined) {
        this.cart = cart;
      }
    } catch (error) {
      console.error('failed on fetch data ' + error.message);
    }
  }
}
//#region types
export interface InjectedHeaderStore {
  headerStore: HeaderStore;
}

export interface HeaderStoreHydrateProps {
  user: IUser | null;
  categoryLists: ICategoryTree[];
  cart: IBriefCart;
}
//#endregion
