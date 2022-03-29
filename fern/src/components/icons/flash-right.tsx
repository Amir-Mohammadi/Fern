import { IconConfig } from '@Utils/types/config';
import React from 'react';
import { IconGenerator } from './icons';

const FlashRight: IconGenerator = (color, secondColor) => ({
  svgViewBoxValue: {
    width: 20,
    height: 37.25,
  },
  iconPath: (
    <path
      id="Path_1808"
      data-name="Path 1808"
      d="M1831.539,494.364l18.452,18.452-18.452,18.452"
      transform="translate(-1830.832 -493.657)"
      fill={color || IconConfig.defaultColor}
      stroke={secondColor || IconConfig.defaultColor}
      strokeWidth="2"
    />
  ),
});

export { FlashRight };
