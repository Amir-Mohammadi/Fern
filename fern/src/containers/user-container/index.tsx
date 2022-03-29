import UserPanel from '@Components/screens/user-panel-screen';
import { ComponentWithStore, connect } from '@Stores/core/decorator';
import { InjectedUserStore } from '@Stores/user-store';
import { observer } from 'mobx-react';
import React from 'react';

@connect('user')
@observer
class UserPanelContainer extends ComponentWithStore<InjectedUserStore> {
  render() {
    return (
      <UserPanel
        popUp={this.stores.user.popUp}
        orders={this.stores.user.userOrders}
        favoriteList={this.stores.user.favoriteList}
        userCommentsProps={{
          comments: this.stores.user.commentList,
        }}
        addressList={{
          adding: this.stores.user.addingAddress,
          cityList: this.stores.user.cityList,
          addresses: this.stores.user.userAddressList,
          provinceList: this.stores.user.provinceList,
        }}
        recentVisits={this.stores.user.recentVisits}
        userInfo={{
          datePickerProps: {
            day: this.stores.user.datePickerDay,
            year: this.stores.user.datePickerYear,
            month: this.stores.user.datePickerMonth,
            changeDay: (day) => this.stores.user.changeDatePickerDay(day),
            changeMonth: (month) => this.stores.user.changeDatePickerMonth(month),
            changeYear: (year) => this.stores.user.changeDatePickerYear(year),
          },
          userInfoValues: this.stores.user.userData,
        }}
        action={this.stores.user.handleActions}
      />
    );
  }
}

export default UserPanelContainer;
