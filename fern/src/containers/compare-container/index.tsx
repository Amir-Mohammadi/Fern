import CompareScreen from '@Components/screens/compare-screen';
import { InjectedCompareStore } from '@Stores';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

type ComparContainerProps = InjectedCompareStore;

@inject('compareStore')
@observer
class CompareContainer extends Component<ComparContainerProps> {
  render() {
    return (
      <CompareScreen
        productsToCompare={this.props.compareStore.productsToCompare}
        products={this.props.compareStore.products}
        properties={this.props.compareStore.properties}
        action={(target, value) => this.props.compareStore.handleActions(target, value)}
      />
    );
  }
}

export default CompareContainer as any;
