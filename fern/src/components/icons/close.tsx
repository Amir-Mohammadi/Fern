import { IconConfig } from '@Utils/types/config';
import React from 'react';
import { IconGenerator } from './icons';

const Close: IconGenerator = (color) => ({
  svgViewBoxValue: {
    width: 17.678,
    height: 17.678,
  },
  iconPath: (
    <g id="Group_683" data-name="Group 683" transform="translate(-1372.141 616.951) rotate(-45)">
      <line
        id="Line_104"
        data-name="Line 104"
        y2="24"
        transform="translate(1406.5 534.5)"
        fill="none"
        stroke={color || IconConfig.defaultColor}
        stroke-width="1"
      />
      <line
        id="Line_105"
        data-name="Line 105"
        x2="24"
        transform="translate(1394.5 546.5)"
        fill="none"
        stroke={color || IconConfig.defaultColor}
        stroke-width="1"
      />
    </g>
  ),
});

export { Close };
