import React from 'react';
import { IconGenerator } from './icons';

const LeftSwipe: IconGenerator = (color) => ({
  svgViewBoxValue: {
    width: 14.2,
    height: 14.2,
  },
  iconPath: <path d="M10.7 13.9L3.9 7.1l2.3-2.3L10.7.3" fill="none" stroke={color ? color : '#707070'} />,
});

export { LeftSwipe };
