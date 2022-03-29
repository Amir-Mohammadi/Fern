import { IconConfig } from '@Utils/types/config';
import React from 'react';
import { IconGenerator } from './icons';

const UpSwipe: IconGenerator = (color) => ({
  svgViewBoxValue: {
    width: 20.608,
    height: 11.2,
  },
  iconPath: (
    <path
      id="Path_1810"
      data-name="Path 1810"
      d="M9485.844-5276.7c-1.758.829-10.021,10.021-10.021,10.021L9465.8-5276.7"
      transform="translate(9486.057 -5265.951) rotate(180)"
      fill="none"
      stroke={color || IconConfig.defaultColor}
      strokeWidth="1"
    />
  ),
});

export { UpSwipe };
