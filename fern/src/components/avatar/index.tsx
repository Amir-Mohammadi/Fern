import { Icons, Logo as LogoIcon } from '@Components/icons';
import React from 'react';
import styles from './avatar.module.scss';

interface Props {
  url?: string;
  tooltip?: string;
}

export type AvatarProps = Props;

const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <div className={styles.logo}>
      <Icons icon={LogoIcon} size={43} color="#d3d3d3" />
    </div>
  );
};

export default Avatar;
