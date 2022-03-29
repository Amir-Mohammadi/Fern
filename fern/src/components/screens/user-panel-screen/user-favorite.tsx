import ProductItem, { ProductItemProps } from '@Components/product-item';
import Shapes, { ShapeTypes } from '@Components/shapes';
import React, { useEffect } from 'react';
import styles from './user-panel.module.scss';

interface Props {
  favorites: Array<ProductItemProps>;
  getFavorites: () => void;
}

export type UserFavoritesProps = Props;

const UserFavorites: React.FC<UserFavoritesProps> = (props) => {
  useEffect(() => {
    props.getFavorites();
    return () => {};
  }, []);

  return (
    <div className={styles.favoriteBX}>
      {props.favorites?.length ? (
        props.favorites.map(renderFavoritesList)
      ) : (
        <div className={styles.shape}>
          <Shapes type={ShapeTypes.NoFavoriteList} />
          <span>لیست کالاهای مورد علاقه شما خالی ست.</span>
        </div>
      )}
    </div>
  );
};
export default UserFavorites;
const renderFavoritesList = (favorite: ProductItemProps, i: number) => (
  <div key={i + '_ProductItemSlider'} className={styles.productBX}>
    <ProductItem {...favorite} />
  </div>
);
