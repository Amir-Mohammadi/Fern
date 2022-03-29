import { Exit, IconGenerator, Icons, Logo as LogoIcon } from '@Components/icons';
import { PageUrls } from '@Constants/page-urls';
import styles from './profile-summary.module.scss';
type Props = {
  userFullName: string;
  options?: { title: string; icon: IconGenerator; url: string }[];
  onLogout: () => void;
};
const ProfileSummary: React.FC<Props> = (props) => {
  return (
    <ul className={styles.profileSummary}>
      <li>
        <div className={styles.iconBackground}>
          <Icons icon={LogoIcon} size={25} color="#D3D3D3" />
        </div>
        <a href={PageUrls.Profile}>{props.userFullName}</a>
      </li>
      {props.options &&
        props.options.map((item, i) => (
          <li key={i}>
            <span>
              <Icons size={17} icon={item.icon} color="#D3D3D3" />
            </span>

            <div>
              <a href={item.url}>{item.title}</a>
            </div>
          </li>
        ))}
      <li>
        <Icons size={17} icon={Exit} color="#D3D3D3" />
        <div onClick={props.onLogout} className={styles.logOut}>
          خروج
        </div>
      </li>
    </ul>
  );
};

export default ProfileSummary;
