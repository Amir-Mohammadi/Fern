//#region imports
import { AuthStore, AuthStoreHydrateProps, InjectedAuthStore } from '@Stores/auth-store';
import { BrandStore, BrandStoreHydrateProps, InjectedBrandStore } from '@Stores/brand-store';
import { CompareStore, InjectedCompareStore } from '@Stores/compare-store';
import { HeaderStore, HeaderStoreHydrateProps, InjectedHeaderStore } from '@Stores/header-store';
import { InjectedOrderStore, OrderStore, OrderStoreHydrateProps } from '@Stores/order-store';
import { enableStaticRendering } from 'mobx-react';
import { CartStore, CartStoreHydrateProps, InjectedCartStore } from '../cart-store';
import { GlobalStore, InjectedGlobalStore } from '../global-store';
import { HomeStore, HomeStoreHydrateProps, InjectedHomeStore } from '../home-page-store';
import { InjectedProductStore, ProductStore, ProductStoreHydrateProps } from '../product-page-store';
import { InjectedSearchStore, SearchStore, SearchStoreHydrateProps } from '../search-page-store';
import { InjectedUserStore, UserStore } from '../user-store';
//#endregion

enableStaticRendering(typeof window === 'undefined');

export interface initialMobxState {
  homeStore?: HomeStoreHydrateProps;
  productStore?: ProductStoreHydrateProps;
  searchStore?: SearchStoreHydrateProps;
  loginStore?: AuthStoreHydrateProps;
  cartStore?: CartStoreHydrateProps;
  orderStore?: OrderStoreHydrateProps;
  headerStore?: HeaderStoreHydrateProps;
  brandStore?: BrandStoreHydrateProps;
}

export type Stores = InjectedHomeStore &
  InjectedAuthStore &
  InjectedUserStore &
  InjectedCartStore &
  InjectedBrandStore &
  InjectedOrderStore &
  InjectedHeaderStore &
  InjectedGlobalStore &
  InjectedSearchStore &
  InjectedProductStore &
  InjectedCompareStore;

export let Stores: Stores | undefined = undefined; // this is the client side store

export default function initializeStores(initialData: initialMobxState) {
  const _store: Stores = Stores ?? {
    auth: new AuthStore(),
    home: new HomeStore(),
    user: new UserStore(),
    search: new SearchStore(),
    global: new GlobalStore(),
    cartStore: new CartStore(),
    product: new ProductStore(),
    brandStore: new BrandStore(),
    orderStore: new OrderStore(),
    headerStore: new HeaderStore(),
    compareStore: new CompareStore(),
  };

  if (initialData) {
    // if you need to hydrate a store with initial data you have to write a function for it
    _store.home.hydrate(initialData.homeStore);
    _store.product.hydrate(initialData.productStore);
    _store.search.hydrate(initialData.searchStore);
    _store.brandStore.hydrate(initialData.brandStore);
    _store.cartStore.hydrate(initialData.cartStore);
    _store.orderStore.hydrate(initialData.orderStore);
    _store.headerStore.hydrate(initialData.headerStore);
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') {
    return _store;
  }

  // Create the store once in the client
  if (!Stores) {
    Stores = _store;
  }

  return _store;
}
