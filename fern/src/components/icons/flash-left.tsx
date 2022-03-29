import { IconConfig } from '@Utils/types/config';
import React from 'react';
import { IconGenerator } from './icons';

const FlashLeft: IconGenerator = (color, secondColor) => ({
  svgViewBoxValue: {
    width: 20.573,
    height: 38.318,
  },
  iconPath: (
    <path
      id="Path_1809"
      data-name="Path 1809"
      d="M1831.539,494.364l18.452,18.452-18.452,18.452"
      transform="translate(1851.405 531.975) rotate(180)"
      fill={color || IconConfig.defaultColor}
      stroke={secondColor || IconConfig.defaultColor}
      strokeWidth="2"
    />
  ),
});

export { FlashLeft };
