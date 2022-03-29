import { IconGenerator } from '@Components/icons';
import Logo from '@Components/logo';
import styles from './source.module.scss';

export enum Mode {
  primary = '#24AFFF',
  danger = '#DB0060',
  warning = '#FF9124',
  success = '#009289',
  light = '#FFFFFF',
}
interface Props {
  button: { icon: IconGenerator; url: string }[];
}

export type CompanyIconProps = Props;
const CompanyIcon: React.FC<CompanyIconProps> = (props) => {
  return (
    <div className={styles.content}>
      <div className={styles.items}>
        {props.button.map((item, i) => {
          return (
            <a key={i + 'buttons'} href={item.url}>
              <div className={styles.Logo}>
                <Logo color={Mode.light} secondColor={Mode.light} />
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default CompanyIcon;
