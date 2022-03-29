import BriefProduct, { BriefProductProps } from '@Components/brief-product';
import Shapes, { ShapeTypes } from '@Components/shapes';
import React, { useEffect } from 'react';
import styles from './user-panel.module.scss';

export enum Target {
  FORM_LOAD = 'from-load--user-visit',
}
interface Props {
  visits: BriefProductProps[];
  getRecentVisits?: () => void;
}

export type UserRecentVisitsProps = Props;

const UserRecentVisits: React.FC<UserRecentVisitsProps> = (props) => {
  useEffect(() => {
    props.getRecentVisits!();
    return () => {};
  }, []);
  return (
    <div className={styles.MainVisitBX}>
      {props.visits?.length ? (
        props.visits.map((visit, i) => (
          <div className={styles.visitBX} key={i}>
            <div className={styles.fridgePart}>
              <BriefProduct {...visit} />
            </div>
            <div className={styles.secondPart}>
              <div className={styles.textPart}>
                <span>جزئیات محصول</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.shape}>
          <Shapes type={ShapeTypes.NoVisiting} />
          <span>بازدیدی برای شما ثبت نشده است.</span>
        </div>
      )}
    </div>
  );
};

export default UserRecentVisits;
