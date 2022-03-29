import styles from './variant-component.module.scss';

interface Props {
  title: string;
  color: string;
  selectedIndex?: boolean;
  onSelect: () => void;
}

export type VariantComponentProps = Props;
const VariantComponent: React.FC<VariantComponentProps> = (props) => {
  return (
    <div
      onClick={props.onSelect}
      className={styles.variantBX}
      style={props.selectedIndex == true ? { border: '1px solid #009289' } : { border: '1px solid #FFFFFF00' }}>
      <div className={styles.circle} style={{ backgroundColor: props.color }}></div>
      <label>{props.title} </label>
    </div>
  );
};

export default VariantComponent;
