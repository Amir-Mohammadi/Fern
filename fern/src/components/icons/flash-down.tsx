import { IconConfig } from '@Utils/types/config';
import React from 'react';
import { IconGenerator } from './icons';

const FlashDown: IconGenerator = (color, secondColor) => ({
  svgViewBoxValue: {
    width: 14.219,
    height: 7.816,
  },
  iconPath: (
    <path
      id="Path_1800"
      data-name="Path 1800"
      d="M3767,294.317l-6.756,6.756-6.756-6.756"
      transform="translate(-3753.135 -293.963) "
      fill={color || IconConfig.defaultColor}
      stroke={secondColor || IconConfig.defaultColor}
      strokeWidth="1"
    />
  ),
});

export { FlashDown };
