import Footer from '@Components/footer';
import { ComponentWithStore } from '@Stores/core/decorator';
import { observer } from 'mobx-react';
import React from 'react';

@observer
class FooterContainer extends ComponentWithStore<{}> {
  render() {
    return <Footer />;
  }
}
export default FooterContainer;
