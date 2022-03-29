import { inputValidator, VALIDATION_ROLES } from '@Utils/input-validator';
import { Input } from '@Utils/types';
import { useState } from 'react';
import styles from './change-first-and-last-name.module.scss';
interface props {
  onSubmitChange?: (name: { firstName: string; lastName: string }) => void;
}

export type ChangeFirstAndLastNameModalProps = props;
const ChangeFirstAndLastNameModal: React.FC<ChangeFirstAndLastNameModalProps> = (props) => {
  const [firstName, setFirstName] = useState<Input>({
    value: '',
    roles: [{ name: VALIDATION_ROLES.IS_FA_ALPHABETICAL }],
  });
  const [lastName, setLastName] = useState<Input>({
    value: '',
    roles: [{ name: VALIDATION_ROLES.IS_FA_ALPHABETICAL }],
  });

  function handleFirstNameChange(v: string) {
    const temp = { ...firstName };
    const { error, value } = inputValidator(temp.roles!, v);

    temp.error = error;
    temp.value = value;
    setFirstName(temp);
  }

  function handleLastNameChange(v: string) {
    const temp = { ...lastName };
    const { error, value } = inputValidator(temp.roles!, v);

    temp.error = error;
    temp.value = value;
    setLastName(temp);
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <span>نام</span>
          <input
            type="text"
            value={firstName.value}
            onChange={({ target }) => {
              handleFirstNameChange(target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <span>نام خانوادگی</span>
          <input
            type="text"
            value={lastName.value}
            onChange={({ target }) => {
              handleLastNameChange(target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.formFT}>
        <button
          className={styles.success}
          onClick={() => {
            if (firstName.value != '' && lastName.value != '') {
              props.onSubmitChange!({ firstName: firstName.value, lastName: lastName.value });
            }
          }}>
          ثبت
        </button>
      </div>
    </div>
  );
};

export default ChangeFirstAndLastNameModal;
