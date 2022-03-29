import _Login from './_login';

interface Props {
  step: LoginSteps;
  authenticateType: AuthenticateType;
  loginId: string;
  validationCode: string;
  password: string;
  onSubmitVerify: () => void;
  onSubmitLoginId: Function;
  isOptionalAuthenticateType: boolean;
  onChangeLoginId: (text: string) => any;
  onChangePassword: (text: string) => any;
  setAuthenticateTypeAction: (type: AuthenticateType) => void;
}

export enum LoginSteps {
  EnterLoginId,
  Authenticate,
}

export enum AuthenticateType {
  Password = 0,
  OneTimePassword = 1,
}

export type LoginProps = Props;
const Login: React.FC<LoginProps> = (props) => {
  function renderLoginBaseOnStep() {
    switch (props.step) {
      case LoginSteps.EnterLoginId: {
        return (
          <_Login
            button={{ title: 'ادامه', onSubmit: props.onSubmitLoginId }}
            input={{
              placeHolder: 'شماره موبایل/ایمیل خود را وارد کنید',
              value: props.loginId,
              onChange: (text) => {
                props.onChangeLoginId(text);
              },
            }}
            mainExplanation="ورود و عضویت"
            isOptionalAuthenticateType={false}
          />
        );
      }
      case LoginSteps.Authenticate: {
        if (props.authenticateType == AuthenticateType.OneTimePassword) {
          return (
            <_Login
              button={{ title: 'ادامه', onSubmit: () => props.onSubmitVerify() }}
              input={{
                placeHolder: 'کد تایید را وارد کنید',
                value: props.password,
                onChange: (text) => {
                  props.onChangePassword(text);
                },
              }}
              authenticateType={props.authenticateType}
              setAuthenticateTypeAction={() => props.setAuthenticateTypeAction(AuthenticateType.Password)}
              mainExplanation={`کد تایید به شماره ${props.loginId} ارسال شد`}
              isOptionalAuthenticateType={props.isOptionalAuthenticateType}
            />
          );
        }
        return (
          <_Login
            button={{ title: 'ادامه', onSubmit: () => props.onSubmitVerify() }}
            input={{
              placeHolder: 'رمز عبور خود را وارد کنید',
              value: props.password,
              onChange: (text) => {
                props.onChangePassword(text);
              },
            }}
            authenticateType={props.authenticateType}
            setAuthenticateTypeAction={() => props.setAuthenticateTypeAction(AuthenticateType.OneTimePassword)}
            mainExplanation={`رمز عبور خود را وارد کنید`}
            isOptionalAuthenticateType={props.isOptionalAuthenticateType}
          />
        );
      }
      default: {
        return null;
      }
    }
  }

  return renderLoginBaseOnStep();
};

export default Login;
