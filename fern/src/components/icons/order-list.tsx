import { IconConfig } from '@Utils/types/config';
import React from 'react';
import { IconGenerator } from './icons';

const OrderList: IconGenerator = (color) => ({
  svgViewBoxValue: {
    width: 17.047,
    height: 21.995,
  },
  iconPath: (
    <g>
      <path
        id="Path_1708"
        data-name="Path 1708"
        d="M73.272,2.2h-3.3V.825A.825.825,0,0,0,69.148,0H63.1a.825.825,0,0,0-.825.825V2.2h-3.3A1.376,1.376,0,0,0,57.6,3.574V20.621A1.376,1.376,0,0,0,58.975,22h14.3a1.376,1.376,0,0,0,1.375-1.375V3.574A1.376,1.376,0,0,0,73.272,2.2Zm-9.348-.55h4.4v2.2h-4.4ZM73,20.346H59.25V3.849h3.024v.825A.825.825,0,0,0,63.1,5.5h6.049a.825.825,0,0,0,.825-.825V3.849H73Z"
        transform="translate(-57.6 0)"
        fill={color || IconConfig.defaultColor}
      />
      <path
        id="Path_1709"
        data-name="Path 1709"
        d="M145.465,185.6a.825.825,0,0,0,0,1.65h7.918a.825.825,0,0,0,0-1.65Z"
        transform="translate(-140.901 -177.627)"
        fill={color || IconConfig.defaultColor}
      />
      <path
        id="Path_1710"
        data-name="Path 1710"
        d="M147.884,377.6h-2.419a.825.825,0,0,0,0,1.65h2.419a.825.825,0,1,0,0-1.65Z"
        transform="translate(-140.901 -361.378)"
        fill={color || IconConfig.defaultColor}
      />
      <path
        id="Path_1711"
        data-name="Path 1711"
        d="M153.383,281.6h-7.918a.825.825,0,0,0,0,1.65h7.918a.825.825,0,0,0,0-1.65Z"
        transform="translate(-140.901 -269.503)"
        fill={color || IconConfig.defaultColor}
      />
    </g>
  ),
});

export { OrderList };
