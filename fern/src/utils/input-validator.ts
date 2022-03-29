export enum VALIDATION_ROLES {
  IS_EMAIL,
  MIN_LENGTH,
  MAX_LENGTH,
  IS_NUMERICAL,
  IS_NOT_EMPTY,
  IS_PHONE_NUMBER,
  IS_NATIONAL_CODE,
  IS_FA_ALPHABETICAL,
  IS_EN_ALPHABETICAL,
}

export const inputValidator = (
  roles: Array<{ name: VALIDATION_ROLES; roleScope?: any }>,
  value: any,
  previousValue?: any,
): { value: any; error?: string } => {
  let validation_result: { value: any; error?: string } = { value };

  for (const role of roles) {
    switch (role.name) {
      case VALIDATION_ROLES.IS_EMAIL:
        validation_result = email_checker(value);
        break;
      case VALIDATION_ROLES.IS_FA_ALPHABETICAL:
        validation_result = fa_alphabet_checker(value);
        break;
      case VALIDATION_ROLES.IS_NATIONAL_CODE:
        validation_result = national_code_checker(value, previousValue);
        break;
      case VALIDATION_ROLES.IS_NUMERICAL:
        validation_result = number_checker(value, previousValue);
        break;
      case VALIDATION_ROLES.IS_PHONE_NUMBER:
        validation_result = phone_number_checker(value, previousValue);
        break;
      case VALIDATION_ROLES.MAX_LENGTH:
        validation_result = max_length_checker(value, role.roleScope, previousValue);
        break;
      case VALIDATION_ROLES.MIN_LENGTH:
        validation_result = min_length_checker(value, role.roleScope, previousValue);
        break;
      default:
        break;
    }
  }

  return validation_result;
};

function email_checker(value: string): { value: any; error?: string } {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isValid = emailRegex.test(value);

  if (isValid) {
    return { value };
  }

  return { value, error: 'ایمیل وارد شده معتبر نمی‌باشد.' };
}

function fa_alphabet_checker(value: string): { value: any; error?: string } {
  const faAlphabetRegex = /^[آ-ی]*$/;

  const isValid = faAlphabetRegex.test(value);

  if (isValid) {
    return { value };
  }

  return { value, error: 'مقدار وارد شده معتبر نمی‌باشد.' };
}

function phone_number_checker(value: string, previousValue?: any): { value: any; error?: string } {
  value = max_length_checker(value, 11, previousValue).value;
  value = number_checker(value, previousValue).value;
  const phoneNumberRegex = /^(\+98|0)?9\d{9}$/;

  const isValid = phoneNumberRegex.test(value);

  if (isValid) {
    return { value };
  }

  return { value, error: 'شماره موبایل وارد شده نا معتبر میباشد' };
}

function number_checker(value: string, previousValue?: any) {
  if (value.length == 0) {
    return { value };
  }
  const numberRegex = /^\d+$/;
  const isValid = numberRegex.test(value);

  if (isValid) {
    return { value };
  }

  return { value: previousValue };
}

function max_length_checker(value: string, length: number, previousValue?: any) {
  if (value.length <= length) {
    return { value };
  }

  return { value: previousValue };
}

function min_length_checker(value: string, length: number, previousValue?: any): { value: any; error?: string } {
  if (value.length < length) {
    return { value, error: `طول مقدار وارد شده حداقل باید${length} باشد` };
  }

  return { value: value };
}

function national_code_checker(code: string, previousValue?: any): { value: any; error?: string } {
  code = max_length_checker(code, 10, previousValue).value;
  code = number_checker(code, previousValue).value;

  if (
    code.length < 10 ||
    parseInt(code, 10) === 0 ||
    code === '0000000000' ||
    code === '1111111111' ||
    code === '2222222222' ||
    code === '3333333333' ||
    code === '4444444444' ||
    code === '5555555555' ||
    code === '6666666666' ||
    code === '7777777777' ||
    code === '8888888888' ||
    code === '9999999999'
  ) {
    return { value: code, error: 'مقدار وارد شده نا معتبر میباشد' };
  } else {
    code = ('0000' + code).substr(code.length + 4 - 10);
    if (parseInt(code.substr(3, 6), 10) === 0) {
      return { value: code, error: 'مقدار وارد شده نا معتبر میباشد' };
    }
    var c = parseInt(code.substr(9, 1), 10);
    var s = 0;
    for (var i = 0; i < 9; i++) s += parseInt(code.substr(i, 1), 10) * (10 - i);
    s = s % 11;
    if ((s < 2 && c === s) || (s >= 2 && c === 11 - s)) {
      return { value: code };
    }

    return { value: code, error: 'مقدار وارد شده نا معتبر میباشد' };
  }
}
