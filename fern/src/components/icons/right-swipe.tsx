import { IconConfig } from '@Utils/types/config';
import React from 'react';
import { IconGenerator } from './icons';

const RightSwipe: IconGenerator = (color) => ({
  svgViewBoxValue: {
    width: 11.199,
    height: 20.608,
  },
  iconPath: (
    <path
      id="Path_1810"
      data-name="Path 1810"
      d="M9485.844-5276.7c-1.758.829-10.021,10.021-10.021,10.021L9465.8-5276.7"
      transform="translate(5277.15 9486.057) rotate(-90)"
      fill="none"
      stroke={color || IconConfig.defaultColor}
      strokeWidth="1"
    />
  ),
});

export { RightSwipe };
