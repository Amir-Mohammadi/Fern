import LoginScreen from '@Components/screens/login-screen';
import { InjectedAuthStore } from '@Stores/auth-store';
import { ComponentWithStore, connect } from '@Stores/core/decorator';
import { observer } from 'mobx-react';
import React from 'react';
@connect('auth')
@observer
class LoginContainer extends ComponentWithStore<InjectedAuthStore> {
  render() {
    return (
      <LoginScreen
        login={{
          onChangeLoginId: (phoneNumber) => {
            this.stores.auth.setLoginId(phoneNumber);
          },
          onChangePassword: (password) => {
            this.stores.auth.setPassword(password);
          },
          onSubmitLoginId: () => {
            this.stores.auth.onConfirmLoginId();
          },
          onSubmitVerify: () => {
            this.stores.auth.verifyAuthenticate();
          },

          setAuthenticateTypeAction: (authenticateType) => {
            this.stores.auth.setAuthenticateType(authenticateType);
          },
          isOptionalAuthenticateType: this.stores.auth.isOptionalAuthenticateType,
          password: this.stores.auth.password,
          loginId: this.stores.auth.loginId,
          step: this.stores.auth.loginStep,
          validationCode: this.stores.auth.validationCode,
          authenticateType: this.stores.auth.authenticateType,
        }}
      />
    );
  }
}

export default LoginContainer;
