import { IProductPropertyItemType, IProductPropertyNode, IProductPropertyTree } from '@Interfaces/common';
import React from 'react';
import styles from './product-properties.module.scss';

interface Props {
  properties: Array<IProductPropertyTree>;
  isLoadingProductProperties: boolean;
}

export type ProductPropertiesProps = Props;
const ProductProperties: React.FC<ProductPropertiesProps> = (props) => {
  const renderPropertyNode = (propertyNode: IProductPropertyNode) => {
    if (propertyNode.type == IProductPropertyItemType.List) {
      return (
        <div className={styles.description}>
          <div className={styles.label}>
            <span>{propertyNode.title}</span>
          </div>
          <div className={styles.values}>
            {propertyNode.value.map((element) => {
              return <div className={styles.value}>{element}</div>;
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.description}>
          <div className={styles.label}>
            <span>{propertyNode.title}</span>
          </div>
          <div className={styles.value}>{propertyNode.value}</div>
        </div>
      );
    }
  };
  return (
    <div className={styles.productInfo}>
      {props.isLoadingProductProperties == true ? (
        <div>isLoading...</div>
      ) : (
        props.properties.map((property) => {
          return (
            <div className={styles.info}>
              <div className={styles.body}>
                <div className={styles.title}>{property.title}</div>
                {property.properties.map((propertyNode) => {
                  return renderPropertyNode(propertyNode);
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ProductProperties;
