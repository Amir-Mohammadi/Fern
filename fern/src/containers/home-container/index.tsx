import Home from '@Components/screens/home-screen';
import { ComponentWithStore, connect } from '@Stores/core/decorator';
import { InjectedHomeStore } from '@Stores/home-page-store';
import { observer } from 'mobx-react';
import React from 'react';

@connect('home')
@observer
class HomeContainer extends ComponentWithStore<InjectedHomeStore> {
  homeStore = this.stores.home;

  componentDidMount() {
    this.homeStore.fetchHomePageData();
  }

  render() {
    return (
      <Home
        fridgeAndFreezerProductList={{
          loading: this.homeStore.isLoadingFridgeAndFreezerProductList,
          products: this.homeStore.fridgeAndFreezerProductList,
        }}
        bestSellerProductList={{
          loading: this.homeStore.isLoadingBestSellerProductList,
          products: this.homeStore.bestSellerProductList,
        }}
        brandsList={{
          loading: this.homeStore.isLoadingBrandsList,
          list: this.homeStore.brandsList,
        }}
        coolingProductList={{
          loading: this.homeStore.isLoadingCoolingProductList,
          products: this.homeStore.coolingProductList,
        }}
        offeredProductList={{
          loading: this.homeStore.isLoadingOfferedProductList,
          products: this.homeStore.offeredProductList,
        }}
        popularProductList={{
          loading: this.homeStore.isLoadingPopularProductList,
          products: this.homeStore.popularProductList,
        }}
        sliderContent={{
          loading: this.homeStore.isLoadingSliderContent,
          data: this.homeStore.sliderContent,
        }}
        onHomeStoreDidMount={this.homeStore.onHomeStoreDidMount}
      />
    );
  }
}
export default HomeContainer;
