import React from 'react';
import ReactLoading from 'react-loading';
import styles from './loading.module.scss';

interface Props {}

export type LoadingProps = Props;
const LoadingScreen: React.FC<LoadingProps> = (props) => {
  return (
    <div className={styles.loadingContainer}>
      <ReactLoading className={styles.loading} />
    </div>
  );
};

export default LoadingScreen;
