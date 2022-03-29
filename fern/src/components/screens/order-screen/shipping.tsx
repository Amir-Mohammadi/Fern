import Step from '@Components/step';
import SupportTag from '@Components/support-tag';
import classNames from 'classnames';
import styles from './shipping.module.scss';

export enum ShoppingPageTypes {
  EditAddress,
  Normal,
}

interface Props {
  mainBarComponents: any[];
  sideBarComponents: any[];
  currentStep: number;
  steps: { title: string; tooltip?: string; optional?: boolean }[];
  mainBarButton?: any;
  type: ShoppingPageTypes;
}

export type _ShoppingProps = Props;

const _Shopping: React.FC<_ShoppingProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.statusBar}>
          <Step steps={props.steps} currentStep={props.currentStep} />
        </div>
        <div className={styles.informationContainer}>
          <div className={styles.information}>
            {props.mainBarComponents.map((value, index) => (
              <div
                key={index + 'shopping'}
                className={classNames({
                  [styles.card]: true,
                })}>
                {value}
              </div>
            ))}
          </div>
          <div className={styles.sideBar}>
            {props.sideBarComponents.map((value, index) => (
              <div
                key={index + 'shipping-side'}
                className={classNames({
                  [styles.card]: true,
                })}>
                {value}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footerContainer}>
        <div className={styles.support}>
          <SupportTag />
        </div>
      </div>
    </div>
  );
};

export default _Shopping;
