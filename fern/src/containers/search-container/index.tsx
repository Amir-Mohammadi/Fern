import AllProducts from '@Components/screens/all-products-screen';
import { ComponentWithStore, connect } from '@Stores/core/decorator';
import { InjectedSearchStore } from '@Stores/search-page-store';
import { observer } from 'mobx-react';
import React from 'react';
@connect('search')
@observer
class SearchContainer extends ComponentWithStore<InjectedSearchStore> {
  searchStore = this.stores.search;

  render() {
    return (
      <AllProducts
        sortOption={{
          option: ['گرانترین', 'ارزانترین', 'پربازدیدترین', 'محبوب ترین', 'پرفروشترین'],
          selectedIndex: this.searchStore.selectedSortOption,
        }}
        priceRange={this.searchStore.pricesRange}
        espFilters={this.searchStore.espFilters}
        brandsFilter={this.searchStore.brandsFilter}
        products={this.searchStore.productList}
        action={this.searchStore.handleActions}
      />
    );
  }
}
export default SearchContainer;
