import { Desc, Icons } from '@Components/icons';
import styles from './edit-form.module.scss';

interface Props {
  inputs: { value: string; label: string; onChange: Function }[];
  onClick: (i: number) => void;
}

export type EditFormProps = Props;

const renderInput = (
  input: { value: string; label: string; onChange: Function },
  i: number,
  onClick: (i: number) => void,
) => (
  <div className={styles.inputBX}>
    <div className={styles.lable}>{input.label}</div>
    <div className={styles.valueBX}>
      <div className={styles.value}>{input.value}</div>
      <div className={styles.icon} onClick={() => onClick(i)}>
        <Icons icon={Desc} size={24} color="#D3D3D3" />
      </div>
    </div>
  </div>
);

const EditForm: React.FC<EditFormProps> = (props) => {
  return <div className={styles.container}>{props.inputs.map((input, i) => renderInput(input, i, props.onClick))}</div>;
};

export default EditForm;
