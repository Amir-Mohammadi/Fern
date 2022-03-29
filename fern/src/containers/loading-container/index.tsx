import LoadingScreen from '@Components/screens/loading-screen';
import { ComponentWithStore, connect } from '@Stores/core/decorator';
import { InjectedGlobalStore } from '@Stores/global-store';
import { observer } from 'mobx-react';
import React from 'react';
@connect('global')
@observer
class LoadingContainer extends ComponentWithStore<InjectedGlobalStore> {
  render() {
    if (this.stores.global.loading) {
      return <LoadingScreen />;
    } else return null;
  }
}

export default LoadingContainer;
