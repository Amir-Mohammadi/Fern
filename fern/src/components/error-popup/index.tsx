import Button from '@Components/button';
import React, { useEffect, useRef } from 'react';
import styles from './error-popup.module.scss';

export type ErrorPopupProps = {
  title: string;
  message: string;
  onClickOutside?: () => void;
  onClickButton?: () => void;
};

const ErrorPopup: React.FC<ErrorPopupProps> = (props) => {
  const node = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    // ? i ignored this error because type script error were not accurate, this is a valid js statement
    // @ts-ignore
    if (node.current != null && node.current.contains(e.target)) {
      return;
    }

    props.onClickOutside ? props.onClickOutside() : null;
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container} ref={node}>
      <h1 className={styles.header}>{props.title}</h1>
      <p className={styles.middle}>{props.message}</p>
      <div>
        <Button.Outline
          text={'تایید'}
          onClick={() => {
            props.onClickButton ? props.onClickButton() : null;
          }}
        />
      </div>
    </div>
  );
};

export default ErrorPopup;
