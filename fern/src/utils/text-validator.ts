export class TextValidator {
  validatorScopes: ValidatorScope[];
  private _emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private _phoneNumberRegex = /^(0)?9\d{9}$/;

  constructor(...validatorScopes: ValidatorScope[]) {
    this.validatorScopes = validatorScopes;
  }

  public isValid(value: string): boolean {
    let isValid: boolean = true;
    this.validatorScopes.forEach((validatorScope) => {
      const isValidScope = this._validateScope(validatorScope, value);
      isValid = isValid && isValidScope;
    });
    return isValid;
  }

  private _validateScope(validatorScope: ValidatorScope, value: string): boolean {
    switch (validatorScope) {
      case ValidatorScope.email:
        return this._validationEmail(value);
      case ValidatorScope.phoneNumber:
        return this._validationPhoneNumber(value);
      default:
        return false;
    }
  }

  private _validationEmail(value: string): boolean {
    return this._emailRegex.test(value);
  }

  private _validationPhoneNumber(value: string): boolean {
    return this._phoneNumberRegex.test(value);
  }
}

export enum ValidatorScope {
  email,
  phoneNumber,
}
