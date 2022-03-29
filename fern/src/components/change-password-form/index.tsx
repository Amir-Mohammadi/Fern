import Button from '@Components/button';
import { inputValidator, VALIDATION_ROLES } from '@Utils/input-validator';
import { Input } from '@Utils/types';
import { IChangePassword } from 'api/models';
import classNames from 'classnames';
import { useState } from 'react';
import styles from './change-password-form.module.scss';
interface props {
  onSubmitChange: (password: IChangePassword) => void;
}

export type ChangePasswordModalProps = props;
const ChangePasswordModal: React.FC<ChangePasswordModalProps> = (props) => {
  const [oldPassword, setOldPassword] = useState<Input>({
    roles: [],
    value: '',
  });
  const [newPassword, setNewPassword] = useState<Input>({
    roles: [{ name: VALIDATION_ROLES.MIN_LENGTH, roleScope: 8 }],
    value: '',
  });
  const [newPasswordRepeat, setNewPasswordRepeat] = useState<Input>({
    roles: [{ name: VALIDATION_ROLES.MIN_LENGTH, roleScope: 8 }],
    value: '',
  });

  function handleOldPasswordChange(v: string) {
    const temp = { ...oldPassword };
    const { error, value } = inputValidator(temp.roles!, v);

    temp.error = error;
    temp.value = value;
    setOldPassword(temp);
  }
  function handleNewPasswordChange(v: string) {
    const temp = { ...newPassword };
    const { error, value } = inputValidator(temp.roles!, v);

    temp.error = error;
    temp.value = value;
    setNewPassword(temp);
  }
  function handleNewPasswordRepeatChange(v: string) {
    const temp = { ...newPasswordRepeat };
    const { error, value } = inputValidator(temp.roles!, v);

    temp.error = error;
    temp.value = value;
    setNewPasswordRepeat(temp);
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <span>رمز فعلی</span>
          <input
            type="password"
            className={classNames({ [styles.hasError]: oldPassword.error })}
            value={oldPassword.value}
            onChange={({ target }) => {
              handleOldPasswordChange(target.value);
            }}
          />
          <span>&nbsp;{oldPassword.error}</span>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <span>رمز جدید</span>
          <input
            type="password"
            className={classNames({ [styles.hasError]: newPassword.error })}
            value={newPassword.value}
            onChange={({ target }) => {
              handleNewPasswordChange(target.value);
            }}
          />
          <span>&nbsp;{newPassword.error}</span>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <span>تکرار رمز جدید</span>
          <input
            type="password"
            className={classNames({ [styles.hasError]: newPasswordRepeat.error })}
            value={newPasswordRepeat.value}
            onChange={({ target }) => {
              handleNewPasswordRepeatChange(target.value);
            }}
          />
          <span>&nbsp;{newPasswordRepeat.error}</span>
        </div>
      </div>
      <div className={styles.formFT}>
        {console.log(!(newPassword.error || newPasswordRepeat.error || !newPassword.value || !newPasswordRepeat.value))}
        <Button.Basic
          disabled={
            newPassword.error || newPasswordRepeat.error || !newPassword.value || !newPasswordRepeat.value
              ? true
              : false
          }
          onClick={() => {
            if (!(newPassword.error || newPasswordRepeat.error || !newPassword.value || !newPasswordRepeat.value)) {
              console.log('dfsfj');

              if (newPassword.value == newPasswordRepeat.value) {
                props.onSubmitChange({ new_password: newPassword.value, old_password: oldPassword.value });
              } else {
                alert('رمز جدید با تکرار رمز جدید تطابق ندارد!');
              }
            }
          }}
          buttonClassName={styles.success}
          text={'ثبت'}
        />
      </div>
    </div>
  );
};

export default ChangePasswordModal;
