import Button from '@Components/button';
import { Icons } from '@Components/icons';
import { Comments } from '@Components/icons/comments';
import ShowRate from '@Components/show-rate';
import { IProductComment } from '@Interfaces/common';
import classNames from 'classnames';
import React from 'react';
import styles from './product-comments.module.scss';

interface Props {
  comments: Array<IProductComment>;
  isAddingNewComment: boolean;
  toggleAddingNewComment: () => void;
  newComment: {
    onAdd: () => any;
    onChange: (value: string) => any;
    value: string;
  };
  isLoadingProductComments: boolean;
}

export type ProductCommentsProps = Props;
const ProductComments: React.FC<ProductCommentsProps> = (props) => {
  const renderAddComment = () => {
    return (
      <div className={styles.addCommentContainer}>
        <div className={styles.questionPart}>
          <div className={styles.comment}>
            <textarea
              className={styles.texts}
              value={props.newComment.value}
              placeholder="نظر خود را بنویسید..."
              onChange={(e) => props.newComment.onChange(e.target.value)}></textarea>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <div
            onClick={() => {
              props.newComment.onAdd();
            }}
            className={styles.btn}>
            <Icons icon={Comments} color={'#FFFFFF'} size={23} />
            <label style={{ paddingRight: '10px' }}>ثبت نظر</label>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.compcont}>
        <div className={styles.rateBX}>
          <ShowRate
            attributes={[
              { title: 'صدا', value: 3 },
              { title: 'میزان سرد کردن', value: 1 },
              { title: 'یخسازی', value: 5 },
              { title: 'بوگیری', value: 5 },
            ]}
          />
        </div>
        <div className={styles.commentHelperBX}>
          <span className={styles.title}>شما هم می توانید نظر خود را درباره این محصول بنویسید</span>
          <span className={styles.text}>برای ثبت نظر به حساب کاربری خود وارد شوید و دکمه زیر را بزنید</span>

          <div>
            <Button.Rounded
              text={'ثبت نظر جدید'}
              onClick={() => {
                props.toggleAddingNewComment();
              }}
              icon={Comments}
            />
          </div>
        </div>
      </div>

      {props.isAddingNewComment ? renderAddComment() : null}

      <div className={styles.commentsContainer}>
        {props.isLoadingProductComments == true ? (
          <div>is Loading...</div>
        ) : (
          props.comments.map((comment) => {
            return (
              <div className={styles.content} key={comment.id}>
                <div className={styles.person}>
                  <Icons icon={Comments} size={50} />
                  <label>{comment.author.fullName}</label>
                </div>
                <div
                  className={classNames({
                    [styles.textContainer]: true,
                    [styles.questionUpperRadius]: true,
                    [styles.questionRadius]: true,
                  })}>
                  <span className={styles.questionInfo}>{comment.author.fullName}</span>
                  <div className={styles.texts}>{comment.payload}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProductComments;
