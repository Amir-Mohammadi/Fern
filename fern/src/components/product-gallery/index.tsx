import { IconGenerator, Icons, Logo as LogoIcon } from '@Components/icons';
import { Mode } from '@Constants/colors';
import { IProductImage } from '@Interfaces/common';
import React, { useRef, useState } from 'react';
import { SideBySideMagnifier } from 'react-image-magnifiers';
import ScrollContainer from 'react-indiana-drag-scroll';
import styles from './product-gallery.module.scss';

interface Props {
  images: IProductImage[];
  icon?: { icon: IconGenerator; action?: Function; size?: number }[];
}

export type GalleryProps = Props;

const ProductGallery: React.FC<GalleryProps> = (props) => {
  const [selectedImageId, setImage] = useState(0);
  const [hover, setHover] = useState(false);
  const container = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.container}>
      <div className={styles.imageBox} onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
        <SideBySideMagnifier
          imageSrc={props.images[selectedImageId]?.imageUrl ?? ''}
          imageAlt={props.images[selectedImageId]?.imageAlt ?? ''}
          alwaysInPlace={true}
        />

        {!hover && (
          <div className={styles.iconBox}>
            <div className={styles.logo}>
              <Icons icon={LogoIcon} color={Mode.danger} size={48} />
            </div>

            <div className={styles.actionIcons}>
              {props.icon?.map((icon, index) => (
                <div key={index + 'icon'} style={{ paddingBottom: '25px' }}>
                  <Icons icon={icon.icon} size={icon.size || 37} color={Mode.light} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.imageItems}>
        <ScrollContainer vertical={false} innerRef={container}>
          {props.images?.map((image, index) => {
            return (
              <div
                key={index + 'images'}
                className={styles.image}
                onClick={() => {
                  setImage(index);
                }}>
                <img src={image.imageUrl} alt={image.imageAlt} title={image.imageTitle} />
              </div>
            );
          })}
        </ScrollContainer>
      </div>
    </div>
  );
};

export default ProductGallery;
