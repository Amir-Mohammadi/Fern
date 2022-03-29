import Button from '@Components/button';
import ChangeFirstAndLastNameModal, { ChangeFirstAndLastNameModalProps } from '@Components/change-first-and-last-name';
import ChangePasswordModal, { ChangePasswordModalProps } from '@Components/change-password-form';
import DatePicker, { DatePickerProps } from '@Components/datepicker-form';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import styles from './info.module.scss';

export enum Color {
  primary = '#24AFFF',
  danger = '#DB0060',
  warning = '#FF9124',
  success = '#009289',
  light = '#AAAAAA',
}

export enum textTypes {
  text,
  password,
  date,
}

export type itemType = { title: string; value: string; type?: textTypes };

interface Props {
  mode?: Color;
  title?: string;
  userData: Array<itemType>;
  editModalIndex?: number;
  changePasswordModalProps: ChangePasswordModalProps;
  changeFirstAndLastNameProps: ChangeFirstAndLastNameModalProps;
  datePickerProps: DatePickerProps;
  editTextInput: string;

  toggleEditModal: (index: number) => void;
  onEditModalChangeValue: (value: string) => void;
  onSubmitEdit: () => void;
}

export type InfoProps = Props;
const Info: React.FC<InfoProps> = (props) => {
  return (
    <div className={styles.container}>
      {props.title && (
        <div
          className={classNames({
            [styles.alert]: true,
            [styles.gPrimary]: props.mode === Color.primary,
            [styles.gDanger]: props.mode === Color.danger,
            [styles.gSuccess]: props.mode === Color.success,
            [styles.gWarning]: props.mode === Color.warning,
          })}>
          <span>{props.title}</span>
        </div>
      )}
      <div className={styles.bottom}>
        <div className={styles.rightBX}>
          {props.userData.map(
            (value, i) =>
              i % 2 === 0 && (
                <div className={styles.chart} key={i + 'InFo'}>
                  <div className={styles.title}>
                    <div className={styles.info}>{value.title}</div>
                    <div className={styles.value}>{value.value}</div>
                  </div>
                  <div className={styles.icon}>
                    <Button.Basic
                      onClick={() => {
                        props.toggleEditModal(i);
                      }}
                      buttonClassName={classNames({ [styles.changePassBTN]: value.type === textTypes.password })}>
                      {value.type === textTypes.password ? (
                        'تغییر رمز عبور'
                      ) : (
                        <FontAwesomeIcon icon={faEdit} color={'#d3d3d3'} />
                      )}
                    </Button.Basic>
                  </div>
                </div>
              ),
          )}
        </div>
        <div className={styles.rightBX}>
          {props.userData.map(
            (value, i) =>
              i % 2 !== 0 && (
                <div className={styles.chart} key={i + 'InFo'}>
                  <div className={styles.title}>
                    <div className={styles.info}>{value.title}</div>
                    <div className={styles.value}>{value.value}</div>
                  </div>
                  <div className={styles.icon}>
                    <Button.Basic
                      onClick={() => {
                        props.toggleEditModal(i);
                      }}
                      buttonClassName={classNames({ [styles.changePassBTN]: value.type === textTypes.password })}>
                      {value.type === textTypes.password ? (
                        'تغییر رمز عبور'
                      ) : (
                        <FontAwesomeIcon icon={faEdit} color={'#d3d3d3'} />
                      )}
                    </Button.Basic>
                  </div>
                </div>
              ),
          )}
        </div>
      </div>

      {props.editModalIndex! > -1 && (
        <div className={styles.editModal}>
          <div className={styles.form}>
            <div className={styles.formHD}>
              <span>ویرایش اطلاعات کاربر</span>
              <Button.Basic
                onClick={() => {
                  props.toggleEditModal(-1);
                }}>
                <FontAwesomeIcon icon={faTimes} color={'#db0060'} />
              </Button.Basic>
            </div>
            <div className={styles.formBD}>
              {props.userData[props.editModalIndex!].type === textTypes.password && (
                <ChangePasswordModal {...props.changePasswordModalProps} />
              )}
              {props.userData[props.editModalIndex!].type === textTypes.date && (
                <DatePicker {...props.datePickerProps} />
              )}
              {props.userData[props.editModalIndex!].type !== textTypes.date &&
                props.userData[props.editModalIndex!].type !== textTypes.password && (
                  <div className={styles.row}>
                    <div className={styles.inputGroup}>
                      <span>{props.userData[props.editModalIndex!].title}</span>
                      <input
                        type="text"
                        value={props.editTextInput}
                        onChange={({ target }) => {
                          props.onEditModalChangeValue(target.value);
                        }}
                      />
                    </div>
                  </div>
                )}
              {props.userData[props.editModalIndex!].type === textTypes.text && (
                <ChangeFirstAndLastNameModal {...props.changeFirstAndLastNameProps} />
              )}
            </div>
            <div className={styles.formFT}>
              <Button.Basic
                buttonClassName={styles.success}
                text={'ثبت'}
                onClick={() => {
                  props.onSubmitEdit();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Info;
