import Login, { LoginProps } from '@Components/login';
import Shapes, { ShapeTypes } from '@Components/shapes';
import React from 'react';
import styles from './login.module.scss';

interface Props {
  login: LoginProps;
}

export type LoginScreenProps = Props;
const LoginScreen: React.FC<LoginScreenProps> = (props) => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.content}>
        <div className={styles.shape}>
          <div className={styles.svg}>
            <Shapes type={ShapeTypes.LoginBackground} />
          </div>
          <div className={styles.login}>
            <Login {...props.login} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
