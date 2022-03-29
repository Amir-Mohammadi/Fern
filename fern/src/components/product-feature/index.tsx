import { IconGenerator, Icons } from '@Components/icons';
import React from 'react';
import styles from './product-feature.module.scss';

interface Props {
  features?: {
    title: string;
    icon: IconGenerator;
    tooltip?: number;
  }[];

  AddToCart?: () => void;
}

export type ProductFeatureProps = Props;
const ProductFeature: React.FC<ProductFeatureProps> = (props) => {
  return (
    <div className={styles.container}>
      {props.features?.map((feature, index) => {
        return (
          <div className={styles.featureContainer} key={index}>
            <Icons icon={feature.icon} size={40} color="#D3D3D3" secondColor="#D3D3D3" />

            <label>{feature.title}</label>
          </div>
        );
      })}
    </div>
  );
};

export default ProductFeature;
