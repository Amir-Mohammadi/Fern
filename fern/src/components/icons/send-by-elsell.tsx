import { IconConfig } from '@Utils/types/config';
import React from 'react';
import { IconGenerator } from './icons';

const SendByElsell: IconGenerator = (color, secondColor) => ({
  svgViewBoxValue: {
    width: 9,
    height: 25,
  },
  iconPath: (
    <g>
      <line
        id="Line_126"
        data-name="Line 126"
        y2="23"
        transform="translate(3.3)"
        fill="none"
        stroke={color || IconConfig.defaultColor}
        strokeWidth="2"
      />
      <circle
        id="Ellipse_67"
        data-name="Ellipse 67"
        cx="3.5"
        cy="3.5"
        r="3.5"
        transform="translate(0,18)"
        fill={secondColor || IconConfig.defaultColor}
      />
    </g>
  ),
});

export { SendByElsell };
