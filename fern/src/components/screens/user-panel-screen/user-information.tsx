import Button from '@Components/button';
import ChangeCreditCardModal from '@Components/change-credit-card';
import ChangeFirstAndLastNameModal from '@Components/change-first-and-last-name';
import ChangePasswordModal from '@Components/change-password-form';
import DatePicker, { DatePickerProps } from '@Components/datepicker-form';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { inputValidator, VALIDATION_ROLES } from '@Utils/input-validator';
import { Input } from '@Utils/types';
import { IChangePassword } from 'api/models';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import styles from './user-information.module.scss';

export interface UserInfoValuesProps {
  id: number;
  job: string;
  email: string;
  firstName: string;
  birthDate: string;
  cardNumber: string;
  phoneNumber: string;
  nationalCode: string;
  cityId?: number | null;
  gender?: number | null;
  lastName: string | null;
  nameAndLastName: string;
  pictureId: string | null;
  fatherName: string | null;
  rowVersion: string | null;
  economicCode: string | null;
}
interface Props {
  datePickerProps: DatePickerProps;
  userInfoValues: UserInfoValuesProps;

  changeFirstAndLastName?: (name: { firstName: string; lastName: string }) => void;
  changePassword?: (password: IChangePassword) => void;
  changeNationalCode?: (nationalCode: string) => void;
  changePhoneNumber?: (phoneNumber: string) => void;
  changeEmail?: (email: string) => void;
  changeJob?: (job: string) => void;
  changeBirthDate?: () => void;
  getAccountInfo?: () => void;
}

export type UserInformationProps = Props;

const UserInformation: React.FC<UserInformationProps> = (props) => {
  useEffect(() => {
    props.getAccountInfo!();
    return () => {};
  }, []);

  const [modalIndex, setModalIndex] = useState<UserInfoEditModalType>(UserInfoEditModalType.Hidden);

  return (
    <div className={styles.container}>
      <div className={styles.bottom}>
        <div className={styles.rightBX}>
          <RenderTextInfo
            title="نام و نام خانوادگی"
            value={props.userInfoValues?.nameAndLastName}
            onClick={() => {
              setModalIndex(UserInfoEditModalType.NameAndLastName);
            }}
          />
          <RenderTextInfo
            title="شماره تلفن همراه"
            value={props.userInfoValues?.phoneNumber}
            onClick={() => {
              // props.editUserInfoValues.onChangePhoneNumber(props.userInfoValues.phoneNumber);
              setModalIndex(UserInfoEditModalType.PhoneNumber);
            }}
          />
          {renderDateInfo('تاریخ تولد', props.userInfoValues?.birthDate, () => {
            setModalIndex(UserInfoEditModalType.BirthDate);
          })}

          <RenderTextInfo
            title="شماره کارت جهت مرجوعی وجه"
            value={props.userInfoValues?.cardNumber}
            onClick={() => {
              setModalIndex(UserInfoEditModalType.CardNumber);
            }}
          />
        </div>
        <div className={styles.leftBX}>
          <RenderTextInfo
            title="کد ملی"
            value={props.userInfoValues?.nationalCode}
            onClick={() => {
              setModalIndex(UserInfoEditModalType.NationalCode);
            }}
          />
          <RenderTextInfo
            title="پست الکترونیک"
            value={props.userInfoValues?.email}
            onClick={() => {
              setModalIndex(UserInfoEditModalType.Email);
            }}
          />
          <RenderTextInfo
            title="شغل"
            value={props.userInfoValues?.job}
            onClick={() => {
              setModalIndex(UserInfoEditModalType.Job);
            }}
          />
          {renderPasswordInfo('رمز عبور', () => {
            setModalIndex(UserInfoEditModalType.Password);
          })}
        </div>
      </div>

      {modalIndex != UserInfoEditModalType.Hidden && (
        <div className={styles.editModal}>
          <div className={styles.form}>
            <div className={styles.formHD}>
              <span>ویرایش اطلاعات کاربر</span>
              <Button.Basic
                onClick={() => {
                  setModalIndex(UserInfoEditModalType.Hidden);
                }}>
                <FontAwesomeIcon icon={faTimes} color={'#db0060'} />
              </Button.Basic>
            </div>
            <div className={styles.formBD}>
              <RenderModal
                props={props}
                modalIndex={modalIndex}
                closeModal={() => setModalIndex(UserInfoEditModalType.Hidden)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export enum UserInfoEditModalType {
  Hidden,
  NameAndLastName,
  NationalCode,
  PhoneNumber,
  Email,
  BirthDate,
  Job,
  CardNumber,
  Password,
}

const RenderModal: React.FC<{
  props: UserInformationProps;
  modalIndex: UserInfoEditModalType;
  closeModal: Function;
}> = (modal) => {
  const [nationalCode, setNationalCode] = useState<Input>({
    value: '',
    roles: [{ name: VALIDATION_ROLES.IS_NATIONAL_CODE }],
  });
  const [phoneNumber, setPhoneNumber] = useState<Input>({
    value: '',
    roles: [{ name: VALIDATION_ROLES.IS_PHONE_NUMBER }],
  });
  const [email, setEmail] = useState<Input>({
    value: '',
    roles: [{ name: VALIDATION_ROLES.IS_EMAIL }],
  });
  const [job, setJob] = useState<Input>({
    value: '',
    roles: [],
  });

  function handleNationalCodeChange(v: string) {
    const temp = { ...nationalCode };
    const { error, value } = inputValidator(temp.roles!, v, temp.value);

    temp.error = error;
    temp.value = value;
    setNationalCode(temp);
  }

  function handlePhoneNumberChange(v: string) {
    const temp = { ...phoneNumber };
    const { error, value } = inputValidator(temp.roles!, v, temp.value);

    temp.error = error;
    temp.value = value;
    setPhoneNumber(temp);
  }
  function handleEmailChange(v: string) {
    const temp = { ...email };
    const { error, value } = inputValidator(temp.roles!, v, temp.value);

    temp.error = error;
    temp.value = value;
    setEmail(temp);
  }
  function handleJobChange(v: string) {
    const temp = { ...job };
    const { error, value } = inputValidator(temp.roles!, v, temp.value);

    temp.error = error;
    temp.value = value;
    setJob(temp);
  }
  switch (modal.modalIndex) {
    case UserInfoEditModalType.BirthDate: {
      return (
        <DatePicker
          {...modal.props.datePickerProps}
          onSubmitChange={() => {
            modal.props.changeBirthDate!();
            modal.closeModal();
          }}
        />
      );
    }
    case UserInfoEditModalType.CardNumber: {
      return <ChangeCreditCardModal />;
    }
    case UserInfoEditModalType.Email: {
      return renderTextModal(
        'پست الکترونیکی',
        email.value,
        (value) => handleEmailChange(value),
        () => modal.props.changeEmail!(email.value),
        modal.closeModal,
        email.error,
      );
    }
    case UserInfoEditModalType.Job: {
      return renderTextModal(
        'شغل',
        job.value,
        (job) => handleJobChange(job),
        () => modal.props.changeJob!(job.value),
        modal.closeModal,
        job.error,
      );
    }
    case UserInfoEditModalType.NameAndLastName: {
      return (
        <ChangeFirstAndLastNameModal
          onSubmitChange={(name) => {
            modal.props.changeFirstAndLastName!(name);
            modal.closeModal();
          }}
        />
      );
    }
    case UserInfoEditModalType.NationalCode: {
      return renderTextModal(
        'شماره ملی',
        nationalCode.value,
        (value) => handleNationalCodeChange(value),
        () => modal.props.changeNationalCode!(nationalCode.value),
        modal.closeModal,
        nationalCode.error,
      );
    }
    case UserInfoEditModalType.Password: {
      return <ChangePasswordModal onSubmitChange={(password) => modal.props.changePassword!(password)} />;
    }
    case UserInfoEditModalType.PhoneNumber: {
      return renderTextModal(
        'شماره تلفن همراه',
        phoneNumber.value,
        (value) => handlePhoneNumberChange(value),
        () => modal.props.changePhoneNumber!(phoneNumber.value),
        modal.closeModal,
        phoneNumber.error,
      );
    }
    default:
      return null;
  }
};

const renderTextModal = (
  title: string,
  value: string,
  onChange: (value: string) => void,
  onSubmit: () => void,
  closeModal: Function,
  error?: string,
) => {
  return (
    <>
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <span>{title}</span>
          <input
            type="text"
            value={value}
            className={classNames({ [styles.hasError]: error })}
            onChange={({ target }) => {
              onChange(target.value);
            }}
          />
          <span>{error}</span>
        </div>
      </div>
      <div className={styles.formFT}>
        <Button.Basic
          text="ثبت"
          onClick={() => {
            onSubmit();
            closeModal();
          }}
          disabled={error && value.length ? true : false}
          buttonClassName={styles.success}
        />
      </div>
    </>
  );
};

const RenderTextInfo: React.FC<{ title: string; value: string; onClick: Function }> = (props) => {
  return (
    <div className={styles.chart}>
      <div className={styles.title}>
        <div className={styles.info}>{props.title}</div>
        <div className={styles.value}>{props.value}</div>
      </div>
      <div className={styles.icon}>
        <button onClick={() => props.onClick()}>
          <FontAwesomeIcon icon={faEdit} color={'#d3d3d3'} />
        </button>
      </div>
    </div>
  );
};

const renderDateInfo = (title: string, value: string, onClick: Function) => {
  return (
    <div className={styles.chart}>
      <div className={styles.title}>
        <div className={styles.info}>{title}</div>
        <div className={styles.value}>{value}</div>
      </div>
      <div className={styles.icon}>
        <Button.Basic onClick={() => onClick()}>
          <FontAwesomeIcon icon={faEdit} color={'#d3d3d3'} />
        </Button.Basic>
      </div>
    </div>
  );
};

const renderPasswordInfo = (title: string, onClick: Function) => {
  return (
    <div className={styles.chart}>
      <div className={styles.title}>
        <div className={styles.info}>{title}</div>
        <div className={styles.value}></div>
      </div>
      <div className={styles.icon}>
        <Button.Basic
          text="تغییر رمز عبور"
          onClick={() => {
            onClick();
          }}
          buttonClassName={classNames(styles.changePassBTN)}
        />
      </div>
    </div>
  );
};

export default UserInformation;
