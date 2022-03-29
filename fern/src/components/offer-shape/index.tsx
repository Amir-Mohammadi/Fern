import { Gradient } from '@Constants/colors';
import React from 'react';
interface Props {
  text: string;
  mode: Gradient;
}

type OfferShapeProps = Props;

const OfferShape: React.FC<OfferShapeProps> = (props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 183.745 34.627">
      <g>
        <defs>
          <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor={props.mode.secondColor} />
            <stop offset="1" stopColor={props.mode.baseColor} />
          </linearGradient>
        </defs>
        <path
          d="M668.4-155.459c-14.179-.735-27.378-5.762-35.66-14.034-12.479-12.46-33-20.593-56.214-20.593s-43.732,8.133-56.212,20.593c-8.284,8.272-21.481,13.3-35.66,14.034Z"
          transform="translate(668.399 -155.459) rotate(-180)"
          fill="url(#linear-gradient)"
        />
        <text
          id="offer"
          transform="translate(64 15)"
          fill="#fff"
          fontSize="14"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily="SegoeUI, Segoe UI">
          <tspan x="25" y="0" fontFamily="IRANSans">
            {props.text}
          </tspan>
        </text>
      </g>
    </svg>
  );
};
export default OfferShape;
