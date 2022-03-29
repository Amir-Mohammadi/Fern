//#region imports
import BreadCrump from '@Components/bread-crumb';
import {
  Comments,
  DeliveryOnPlace,
  Desc,
  Mark,
  Params,
  PayOnPlace,
  ProductReturn,
  Questions,
  Support,
} from '@Components/icons';
import ProductAttribute from '@Components/product-attribute';
import ProductBrochure, { ProductBrochureProps } from '@Components/product-brochure';
import ProductComments, { ProductCommentsProps } from '@Components/product-comments';
import ProductFeature from '@Components/product-feature';
import ProductGallery from '@Components/product-gallery';
import ProductProperties, { ProductPropertiesProps } from '@Components/product-properties';
import ProductQuestionAndAnswer, { ProductQuestionAndAnswerProps } from '@Components/product-question-and-answer';
import { DeliveryType } from '@Components/product-summary';
import SupportTag from '@Components/support-tag';
import TabBar, { TabBarTypes } from '@Components/tab-bar';
import Toast, { ToastProps } from '@Components/toast';
import { IProductAttributes, IProductColor, IProductImage, IProductPrice } from '@Interfaces/common';
import React from 'react';
import styles from './product.module.scss';
//#endregion imports

//#region props
//--
interface Props {
  productId: number;
  productName: string;
  brand: { id: number; name: string };
  category: { id: number; name: string };
  description: string;
  productPrice: string;
  finalProductPrice: string;
  productPrices: Array<IProductPrice>;
  productDiscount: number;
  ProductColors: Array<IProductColor>;
  ProductMainProperties: IProductAttributes[];
  selectedColorIndex: number;
  setSelectedColor: (index: number) => any;
  addToFavorite: () => void;
  removeFromFavorite: () => void;
  productImages: Array<IProductImage>;
  tabBarSelectedTabIndex: number;
  setTabBarTabIndex: (index: number) => void;
  addProductToCart?: () => void;
  likedByMe: boolean;
  productCommentsProps: ProductCommentsProps;
  productBrochureProps: ProductBrochureProps;
  productPropertiesProps: ProductPropertiesProps;
  productQuestionAndAnswer: ProductQuestionAndAnswerProps;
  toasts: ToastProps;
}

export type ProductProps = Props;
//#endregion
export interface ProductAttributesPropertiesProp {
  label: string;
  value: string;
}
const Product: React.FC<ProductProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.bxBreadcrumb}>
          <BreadCrump text={''} url={''} />
        </div>
        <div className={styles.bxContent}>
          <div className={styles.bxGallery}>
            <ProductGallery images={props.productImages} />
          </div>
          <div className={styles.bxInfo}>
            <ProductAttribute
              id={props.productId}
              name={props.productName}
              prices={props.productPrices}
              productPrice={props.productPrice}
              brand={props.brand}
              category={props.category}
              colors={props.ProductColors}
              finalProductPrice={props.finalProductPrice}
              attributes={props.ProductMainProperties}
              description={props.description}
              likedByMe={props.likedByMe}
              selectedColorIndex={props.selectedColorIndex}
              setSelectedColor={props.setSelectedColor}
              addToFavorite={props.addToFavorite}
              removeFromFavorite={props.removeFromFavorite}
              productSummary={{
                realPrice: props.productPrice,
                AddToCart: () => (props.addProductToCart ? props.addProductToCart() : {}),
                guaranty: 'گارانتی اصالت و سلامت فیزیکی کالا',
                offer: props.productDiscount,
                deliveryType: DeliveryType.SendByOthers,
              }}
            />
            <div className={styles.featBX}>
              <ProductFeature
                features={[
                  { title: 'تحویل کالا در محل', icon: DeliveryOnPlace },
                  { title: 'پشتیبانی ۲۴ ساعته', icon: Support },
                  { title: 'پرداخت در محل', icon: PayOnPlace },
                  {
                    title: 'ارجاع کالا به مدت ۷ روز',
                    icon: ProductReturn,
                  },
                  { title: 'ضمانت اصالت کالا', icon: Mark },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.detail}>
        <TabBar
          items={[
            {
              title: 'نقد و بررسی',
              icon: Desc,
              content: renderReviewSection(props),
            },
            {
              title: 'مشخصات فنی',
              icon: Params,
              content: renderInfoSection(props),
            },
            {
              title: 'نظرات و پیشنهادات',
              icon: Comments,
              content: renderCommentSection(props),
            },
            {
              title: 'پرسش و پاسخ',
              icon: Questions,
              content: renderQuestionSection(props),
            },
          ]}
          selectedIndex={props.tabBarSelectedTabIndex}
          setSelectedIndex={(i) => props.setTabBarTabIndex(i)}
          styleType={TabBarTypes.ProductTabs}
        />
      </div>

      <div className={styles.footerContainer}>
        <div className={styles.support}>
          <SupportTag />
        </div>
      </div>
      {props.toasts.list.length && <Toast {...props.toasts} />}
    </div>
  );
};

export default Product;

const renderCommentSection = (props: ProductProps) => (
  <div className={styles.tabBX}>
    <div className={styles.titleBX}>
      <span className={styles.tabTitle}>نظرات و پیشنهادات</span>
      <span className={styles.productName}>{props.productName}</span>
    </div>
    <div className={styles.compcont}>
      <ProductComments {...props.productCommentsProps} />
    </div>
  </div>
);

const renderReviewSection = (props: ProductProps) => (
  <div className={styles.tabBX}>
    <div className={styles.titleBX}>
      <span className={styles.tabTitle}>نقد و برسی محصول</span>
      <span className={styles.productName}>{props.productName}</span>
    </div>
    <div className={styles.compcont}>
      <ProductBrochure {...props.productBrochureProps} />
    </div>
  </div>
);

const renderInfoSection = (props: ProductProps) => (
  <div className={styles.tabBX}>
    <div className={styles.titleBX}>
      <span className={styles.tabTitle}>مشخصات فنی محصول</span>
      <span className={styles.productName}>{props.productName}</span>
    </div>
    <div className={styles.compcont}>
      <ProductProperties {...props.productPropertiesProps} />
    </div>
  </div>
);

const renderQuestionSection = (props: ProductProps) => (
  <div className={styles.tabBX}>
    <div className={styles.titleBX}>
      <span className={styles.tabTitle}>پرسش و پاسخ</span>
      <span className={styles.productName}>{props.productName}</span>
    </div>
    <div className={styles.compcont}>
      <ProductQuestionAndAnswer {...props.productQuestionAndAnswer} />
    </div>
  </div>
);
