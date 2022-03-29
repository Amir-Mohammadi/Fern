import { Mode } from '@Constants/colors';
import styles from './step.module.scss';

interface Props {
  steps: { title: string; tooltip?: string; optional?: boolean }[];
  currentStep: number;
  titlePosition?: 'top' | 'bottom' | 'none';
  mode?: Mode;
  stepOnChange?: Function;
}

export type StepProps = Props;
const Step: React.FC<StepProps> = (props) => {
  const stepRate = 100 / (props.steps.length - 1);

  return (
    <div
      className={styles.stepContainer}
      style={{
        flexDirection: props.titlePosition == 'top' ? 'column-reverse' : 'column',
      }}>
      <div className={styles.main}>
        <div className={styles.line}></div>
        <div
          className={styles.progress}
          style={{
            width: `${stepRate * props.currentStep}%`,
            backgroundColor: props.mode ? props.mode : Mode.success,
          }}></div>
        <div className={styles.circles}>
          {props.steps.map((step, index) => (
            <div
              key={index + 'step'}
              className={styles.circle}
              style={{
                borderColor: props.mode ? props.mode : Mode.success,
              }}></div>
          ))}
        </div>
      </div>

      {props.titlePosition !== 'none' ? (
        <div className={styles.titleBar}>
          {props.steps.map((step, index) => (
            <span key={index + 'title-step'} style={{ color: props.mode ? props.mode : Mode.success }}>
              {step.title}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Step;
