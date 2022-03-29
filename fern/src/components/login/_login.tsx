import { Gradients } from '@Constants/colors';
import React from 'react';
import { AuthenticateType } from '.';
import Button from '../button';
import DefaultAvatar from './default-avatar';
import styles from './login.module.scss';

interface Props {
  button: { onSubmit: Function; title: string };
  input: { value: string; onChange: (text: string) => any; placeHolder: string };
  mainExplanation: string;
  authenticateType?: AuthenticateType;
  isOptionalAuthenticateType: boolean;
  setAuthenticateTypeAction?: (type: AuthenticateType) => void;
  sendPasswordRecoveryAction?: () => void;
}

type _LoginProps = Props;
const _Login: React.FC<_LoginProps> = (props) => {
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      props.button.onSubmit();
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.avatar}>
        <DefaultAvatar width="30%" />
      </div>
      <label className={styles.mainExplanation}>{props.mainExplanation}</label>
      <input
        className={styles.input}
        autoFocus={true}
        placeholder={props.input.placeHolder}
        value={props.input.value}
        onChange={(event) => {
          props.input.onChange(event.target.value);
        }}
        onKeyDown={onKeyDown}
      />
      <Button.Rounded
        buttonClassName={styles.button}
        text={props.button.title}
        mode={Gradients.success}
        onClick={props.button.onSubmit}
      />
      {props.isOptionalAuthenticateType && (
        <div className={styles.formSwitch}>
          {props.authenticateType == AuthenticateType.Password ? (
            <Button.Basic
              text={'ورود با رمز یکبار مصرف'}
              onClick={() => props.setAuthenticateTypeAction!(AuthenticateType.OneTimePassword)}
            />
          ) : (
            <Button.Basic
              text={'ورود با رمز عبور'}
              onClick={() => props.setAuthenticateTypeAction!(AuthenticateType.Password)}
            />
          )}

          {props.authenticateType == AuthenticateType.Password && <button>فراموشی رمز عبور</button>}
        </div>
      )}
    </div>
  );
};

export default _Login;
