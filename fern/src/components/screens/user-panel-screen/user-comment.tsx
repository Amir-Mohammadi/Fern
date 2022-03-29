import BriefProduct from '@Components/brief-product';
import Button from '@Components/button';
import { Delete, Icons } from '@Components/icons';
import Shapes, { ShapeTypes } from '@Components/shapes';
import { IUserComment } from '@Interfaces/common/user-comment';
import React, { useEffect } from 'react';
import styles from './user-panel.module.scss';

export enum Target {
  FORM_LOAD = 'form-load--user-comments',
  DELETE_COMMENT = 'delete-comment--user-comment',
}
interface Props {
  comments: Array<IUserComment>;
  getComments?: () => void;
  onDeleteComment?: (comment: IUserComment) => void;
}
export type UserCommentsProps = Props;
const UserComments: React.FC<UserCommentsProps> = (props) => {
  useEffect(() => {
    props.getComments!();
    return () => {};
  }, []);
  return (
    <div className={styles.commentTab}>
      {props.comments.length ? (
        props.comments.map((comment, i) => (
          <div className={styles.commentBX}>
            <div className={styles.commentHD}>
              <div>نام محصول</div>
              <div>
                <span>نظر ثبت شده</span>
                <Button.Basic onClick={() => props.onDeleteComment!(comment)}>
                  <Icons icon={Delete} size={24} color={'#d3d3d3'} />
                </Button.Basic>
              </div>
            </div>
            <div className={styles.commentBD}>
              <div className={styles.productBX}>
                <BriefProduct
                  product={{
                    id: comment.productId,
                    brand: comment.brandName ?? '',
                    color: comment.defaultProductColor?.color?.name,
                    image: comment.previewProductImage?.imageUrl,
                    title: comment.productName ?? '',
                    productColor: comment.defaultProductColor,
                    metaDescription: '',
                  }}
                />
              </div>
              <div className={styles.comment}>
                <div>{comment.text}</div>
                <span>{comment.updateAt}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.shape}>
          <Shapes type={ShapeTypes.NoListOpinions} />
          <span>لیست نظرات شما خالی است.</span>
        </div>
      )}
    </div>
  );
};

export default UserComments;
