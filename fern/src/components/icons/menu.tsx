import { IconConfig } from '@Utils/types/config';
import React from 'react';
import { IconGenerator } from './icons';

const Menu: IconGenerator = (color) => ({
  svgViewBoxValue: {
    width: 18.29,
    height: 11.215,
  },
  iconPath: (
    <g id="Group_773" data-name="Group 773" transform="translate(-1788 -186)">
      <rect
        id="Rectangle_8"
        data-name="Rectangle 8"
        width="2.945"
        height="2.945"
        transform="translate(1803.345 186)"
        fill={color || IconConfig.defaultColor}
      />
      <rect
        id="Rectangle_9"
        data-name="Rectangle 9"
        width="14.653"
        height="2.945"
        transform="translate(1788 186)"
        fill={color || IconConfig.defaultColor}
      />
      <rect
        id="Rectangle_10"
        data-name="Rectangle 10"
        width="2.945"
        height="2.945"
        transform="translate(1803.345 190.135)"
        fill={color || IconConfig.defaultColor}
      />
      <rect
        id="Rectangle_11"
        data-name="Rectangle 11"
        width="14.653"
        height="2.945"
        transform="translate(1788 190.135)"
        fill={color || IconConfig.defaultColor}
      />
      <rect
        id="Rectangle_12"
        data-name="Rectangle 12"
        width="2.945"
        height="2.945"
        transform="translate(1803.345 194.27)"
        fill={color || IconConfig.defaultColor}
      />
      <rect
        id="Rectangle_13"
        data-name="Rectangle 13"
        width="14.653"
        height="2.945"
        transform="translate(1788 194.27)"
        fill={color || IconConfig.defaultColor}
      />
    </g>
  ),
});

export { Menu };
