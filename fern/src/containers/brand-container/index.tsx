import BrandScreen from '@Components/screens/brand-screen';
import { connect, InjectedBrandStore } from '@Stores';
import { observer } from 'mobx-react';
import React, { Component } from 'react';

@connect('brandStore')
@observer
class BrandContainer extends Component<InjectedBrandStore> {
  render() {
    return (
      <BrandScreen
        brand={this.props.brandStore.brand}
        categories={this.props.brandStore.categories}
        products={this.props.brandStore.products}
        action={this.props.brandStore.handleActions}
      />
    );
  }
}

export default BrandContainer as any;
