import Header from '@Components/header';
import { ComponentWithStore, connect } from '@Stores/core/decorator';
import { InjectedHeaderStore } from '@Stores/header-store';
import { InjectedSearchStore } from '@Stores/search-page-store';
import { observer } from 'mobx-react';
import React from 'react';

@connect('headerStore')
@connect('search')
@observer
class HeaderContainer extends ComponentWithStore<InjectedHeaderStore & InjectedSearchStore> {
  render() {
    return (
      <Header
        user={this.stores.headerStore.user}
        userFullName={this.stores.headerStore.userFullName}
        categoryLists={this.stores.headerStore.categoryLists}
        cart={this.stores.headerStore.cart}
        onLogout={this.stores.headerStore.onLogout}
        onSearch={this.stores.search.setSearchQuery}
      />
    );
  }
}

export default HeaderContainer;
