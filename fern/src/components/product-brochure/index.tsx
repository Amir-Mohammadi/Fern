import styles from './brochure.module.scss';

interface Props {
  brochureHtml: string;
}
//------
export type ProductBrochureProps = Props;
const ProductBrochure: React.FC<ProductBrochureProps> = (props) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.review}
        dangerouslySetInnerHTML={{
          __html: props.brochureHtml,
        }}></div>
      {/* <div style={{ flex: '1', justifyContent: 'center' }}>
        <Icons icon={Desc} size={200} color={'#D3D3D3'} />
      </div> */}
    </div>
  );
};

export default ProductBrochure;
