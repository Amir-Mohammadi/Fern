import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faExchangeAlt, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IProductAttributes, IProductColor, IProductPrice } from '@Interfaces/common';
import classNames from 'classnames';
import Router from 'next/router';
import { Fragment, useState } from 'react';
import ProductSummary, { DeliveryType } from '../product-summary';
import VariantComponent from '../variant-component';
import styles from './product-attribute.module.scss';

interface Props {
  id: number;
  name: string;
  brand: { id: number; name: string };
  category: { id: number; name: string };
  prices: Array<IProductPrice>;
  productPrice: string;
  finalProductPrice: string;
  colors: Array<IProductColor>;
  selectedColorIndex: number;
  attributes: Array<IProductAttributes>;
  description: string;
  productSummary: {
    guaranty: string;
    deliveryType: DeliveryType;
    offer: number;
    realPrice: string;
    AddToCart: () => void;
  };
  likedByMe: boolean;
  setSelectedColor: (index: number) => void;
  addToFavorite: () => void;
  removeFromFavorite: () => void;
}

const MAX_ATTRIBUTES_TO_SHOW = 4;
const MAX_DESCRIPTION_LENGTH_TO_SHOW = 240;

export type ProductAttributeProps = Props;
const ProductAttribute: React.FC<ProductAttributeProps> = (props) => {
  const [attributeFolded, setAttributeFolded] = useState(true);
  const [descriptionFolded, setDescriptionFolded] = useState(true);
  const renderAttributeNode = (attribute: IProductAttributes) => {
    return (
      <div key={attribute.label} className={styles.attributes}>
        <label>
          {attribute.label + ' : '}
          <label style={{ paddingRight: '5px', fontWeight: 200 }}>
            {attribute.values.map((value, i) => {
              if (i === 0) {
                return value;
              }
              return ', ' + value;
            })}
          </label>
        </label>
      </div>
    );
  };

  const renderAttributesInLessMode = () => {
    return (
      <Fragment>
        {props.attributes?.slice(0, MAX_ATTRIBUTES_TO_SHOW).map((attribute) => renderAttributeNode(attribute))}
        {props.attributes?.length > MAX_ATTRIBUTES_TO_SHOW ? (
          <div
            className={styles.moreAttributes}
            onClick={() => {
              setAttributeFolded(!attributeFolded);
            }}>
            + بیشتر
          </div>
        ) : null}
      </Fragment>
    );
  };

  const renderAttributesInMoreMode = () => {
    return (
      <Fragment>
        {props.attributes.map((attribute) => renderAttributeNode(attribute))}
        <div
          className={styles.moreAttributes}
          onClick={() => {
            setAttributeFolded(!attributeFolded);
          }}>
          - کمتر
        </div>
      </Fragment>
    );
  };

  const renderAttributes = () => {
    if (attributeFolded) {
      return renderAttributesInLessMode();
    } else {
      return renderAttributesInMoreMode();
    }
  };

  const renderDescriptionInLessMode = () => {
    return (
      <Fragment>
        <div className={styles.attributes}>
          <div className={styles.description}>
            {props.description.slice(0, MAX_DESCRIPTION_LENGTH_TO_SHOW) +
              (props.description.length > MAX_DESCRIPTION_LENGTH_TO_SHOW ? '...' : '')}
          </div>
        </div>
        {props.description.length > MAX_DESCRIPTION_LENGTH_TO_SHOW ? (
          <div
            className={styles.moreAttributes}
            onClick={() => {
              setDescriptionFolded(!descriptionFolded);
            }}>
            + بیشتر{' '}
          </div>
        ) : null}
      </Fragment>
    );
  };

  const renderDescriptionInMoreMode = () => {
    return (
      <Fragment>
        <div className={styles.attributes}>
          <div className={classNames(styles.description)}>{props.description}</div>
        </div>
        <div
          className={styles.moreAttributes}
          onClick={() => {
            setDescriptionFolded(!descriptionFolded);
          }}>
          - کمتر{' '}
        </div>
      </Fragment>
    );
  };

  const renderDescription = () => {
    if (descriptionFolded) {
      return renderDescriptionInLessMode();
    } else {
      return renderDescriptionInMoreMode();
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.productDetailContainer}>
        <div className={styles.header}>
          <label>{props.name}</label>
        </div>
        <div className={styles.category}>
          <div>
            <label>برند:</label>
            <a className={styles.categoryLabel} href={`/brand/${props.brand.id}`}>
              {props.brand.name}
            </a>
          </div>
          <div className={styles.categoryBx}>
            <label>دسته بندی:</label>

            <a className={styles.categoryLabel} href={`/search/${props.category.id}`}>
              {props.category.name}
            </a>
          </div>
        </div>
        <div className={styles.variantsContainer}>
          <label>رنگ:</label>

          <div
            style={{
              flex: 'none',
              height: '34px',
            }}>
            {props.colors?.map((variant, index) => {
              return (
                <div key={index}>
                  <VariantComponent
                    selectedIndex={props.selectedColorIndex == index}
                    title={variant.color?.name || ''}
                    color={variant.color?.HexCode || ''}
                    onSelect={() => props.setSelectedColor(index)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {props.attributes && props.attributes.length > 0 && (
          <div className={styles.attributesContainer}>
            <label>ویژگی های محصول:</label>
            <div className={styles.attributesContentContainer}>{renderAttributes()}</div>
          </div>
        )}
        {props.description && props.description.length > 0 && (
          <div className={styles.attributesContainer}>
            <label>توضیحات:</label>
            {renderDescription()}
          </div>
        )}
      </div>
      <div className={styles.productSummaryContainer}>
        <ProductSummary
          guaranty={props.productSummary?.guaranty}
          deliveryType={props.productSummary?.deliveryType}
          offer={props.productSummary?.offer}
          realPrice={props.productPrice}
          finalPrice={props.finalProductPrice}
          AddToCart={props.productSummary.AddToCart}
        />
        <div className={styles.actions}>
          {props.likedByMe ? (
            <button
              onClick={() => {
                props.removeFromFavorite();
              }}
              title={'پاک کردن از علاقه مندی ها'}>
              <FontAwesomeIcon icon={faHeartSolid} color={'#db0060'} />
            </button>
          ) : (
            <button
              onClick={() => {
                props.addToFavorite();
              }}
              title={'افزادن به علاقه مندی ها'}>
              <FontAwesomeIcon icon={faHeart} color={'#d3d3d3'} />
            </button>
          )}

          <button onClick={() => Router.push(`/compare?product=elp-${props.id}`)} title={'مقایسه محصول'}>
            <FontAwesomeIcon icon={faExchangeAlt} color={'#d3d3d3'} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductAttribute;
