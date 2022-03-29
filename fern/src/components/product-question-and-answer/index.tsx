import { Answer, Ask, Comments, Icons } from '@Components/icons';
import { IMarketStuffQuestion } from '@Interfaces/common';
import { IAnswerProductQuestion } from '@Interfaces/common/answer-product-question';
import classnames from 'classnames';
import { useState } from 'react';
import styles from './product-question-and-answer.module.scss';

interface Props {
  onAnswerQuestion: (questionId: number, productQuestionAnswer: IAnswerProductQuestion) => void;
  newQuestion: {
    onClick: () => void;
    onChange: (value: string) => void;
    value: string;
  };
  questingList: Array<IMarketStuffQuestion>;
}

export type ProductQuestionAndAnswerProps = Props;
const ProductQuestionAndAnswer: React.FC<ProductQuestionAndAnswerProps> = (props) => {
  const [isShowingAnswers, setShowAnswers] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(-1);
  const [newAnswerValue, setNewAnswerValue] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.questionPart}>
        <div className={styles.comment}>
          <textarea
            className={styles.texts}
            value={props.newQuestion.value}
            placeholder="سوال خود را مطرح کنید..."
            onChange={(e) => props.newQuestion.onChange(e.target.value)}></textarea>
        </div>
      </div>
      <div className={styles.btnContainer} onClick={props.newQuestion.onClick}>
        <div className={styles.btn}>
          <Icons icon={Comments} color={'#FFFFFF'} size={23} />
          <label style={{ paddingRight: '10px' }}>ثبت پرسش</label>
        </div>
      </div>

      {props.questingList.map((question, index) => {
        const answersLength = question.answers?.length;
        const isHaveAnswer = question.answers?.length == 0;

        return (
          <div className={styles.content} key={index}>
            <div className={styles.sections}>
              <div className={styles.person}>
                <Icons icon={Ask} size={50} color={'#db0060'} secondColor={'#fff'} />
                <label>{question.firstName + ' ' + question.lastName}</label>
              </div>
              <div
                className={classnames({
                  [styles.textContainer]: true,
                  [styles.questionUpperRadius]: true,
                  [styles.questionRadius]: isHaveAnswer || (index == selectedQuestion && isShowingAnswers == false),
                })}>
                <textarea
                  className={styles.texts}
                  value={question.payload}
                  readOnly
                  rows={Math.ceil(question.payload.length / 90)}></textarea>
                <label
                  className={styles.addIdea}
                  onClick={() => {
                    setShowAnswers(false);
                    setSelectedQuestion(index);
                    setNewAnswerValue('');
                  }}>
                  {isShowingAnswers == true || index != selectedQuestion ? `ثبت پاسخ` : ''}
                </label>
                <div
                  className={classnames({
                    [styles.separator]: true,
                    [styles.notSeparator]: isHaveAnswer || (index == selectedQuestion && isShowingAnswers == false),
                  })}></div>
              </div>
            </div>
            {isShowingAnswers == true || index != selectedQuestion ? (
              question.answers ? (
                question.answers.map((answer, i) => {
                  const isLastAnswer = i + 1 == answersLength;

                  return (
                    <div className={styles.sections} key={i}>
                      <div className={styles.person}>
                        <Icons icon={Answer} size={50} />
                        <label>{answer.firstName + ' ' + answer.lastName}</label>
                      </div>
                      <div
                        className={classnames({
                          [styles.textContainer]: true,
                          [styles.answerButtonRadius]: isLastAnswer,
                        })}>
                        <textarea
                          className={styles.texts}
                          value={answer.payload ?? ''}
                          readOnly
                          rows={Math.ceil(answer.payload?.length / 90)}></textarea>
                        <div
                          className={classnames({
                            [styles.separator]: true,
                            [styles.notSeparator]: isLastAnswer,
                          })}></div>
                      </div>
                    </div>
                  );
                })
              ) : null
            ) : (
              <div className={styles.answerPart}>
                <div className={styles.answerComment}>
                  <textarea
                    className={styles.texts}
                    value={newAnswerValue}
                    placeholder="پاسخ خود را مطرح کنید..."
                    onChange={(e) => setNewAnswerValue(e.target.value)}></textarea>
                  <div className={styles.answerButtons}>
                    <label className={styles.addAnswer} onClick={() => setShowAnswers(true)}>
                      انصراف
                    </label>
                    <label
                      className={styles.addAnswer}
                      onClick={() => {
                        props.onAnswerQuestion(question.id, { answer: newAnswerValue });
                        setShowAnswers(true);
                      }}>
                      ثبت
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductQuestionAndAnswer;
