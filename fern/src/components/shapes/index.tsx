import React from 'react';
import LoginBackground from './login-background';
import NoFavoriteList from './no-favorite-list';
import NoGiftCard from './no-gift-card';
import NoListOpinions from './no-list-opinions';
import NoMassaging from './no-massaging';
import NoPaymentOrder from './no-payment-order';
import NoVisiting from './no-visiting';
import WaveShape from './wave-shape';

export enum ShapeTypes {
  NoGiftCard,
  NoListOpinions,
  NoFavoriteList,
  NoPaymentOrder,
  NoVisiting,
  NoMassaging,
  WaveShape,
  LoginBackground,
}

interface props {
  type?: ShapeTypes;
}

type ShapeProps = props;
const Shapes: React.FC<ShapeProps> = (props) => {
  switch (props.type) {
    case ShapeTypes.NoGiftCard:
      return <NoGiftCard {...props} />;
    case ShapeTypes.NoListOpinions:
      return <NoListOpinions {...props} />;
    case ShapeTypes.NoFavoriteList:
      return <NoFavoriteList {...props} />;
    case ShapeTypes.NoPaymentOrder:
      return <NoPaymentOrder {...props} />;
    case ShapeTypes.NoVisiting:
      return <NoVisiting {...props} />;
    case ShapeTypes.NoMassaging:
      return <NoMassaging {...props} />;
    case ShapeTypes.WaveShape:
      return <WaveShape {...props} />;
    case ShapeTypes.LoginBackground:
      return <LoginBackground {...props} />;
    default:
      return null;
  }
};

export default Shapes;
