import { IconConfig } from '@Utils/types/config';
import React from 'react';
import { IconGenerator } from './icons';

const Statistics: IconGenerator = (color) => ({
  svgViewBoxValue: {
    width: 30.684,
    height: 30.684,
  },
  iconPath: (
    <g id="Iconly_Light_Chart" data-name="Iconly Light Chart" transform="translate(-632.25 -670.154)">
      <g id="Chart-4" transform="translate(632.25 670.154)">
        <path
          id="Path_104"
          data-name="Path 104"
          d="M459.691,951.287a1.071,1.071,0,0,1-1.07-1.07v-9.79a1.07,1.07,0,1,1,2.141,0v9.79A1.071,1.071,0,0,1,459.691,951.287Z"
          transform="translate(-450.956 -927.65)"
          fill={color || IconConfig.defaultColor}
        />
        <path
          id="Path_105"
          data-name="Path 105"
          d="M464.358,952.689a1.071,1.071,0,0,1-1.07-1.07V937.143a1.07,1.07,0,1,1,2.141,0v14.476A1.071,1.071,0,0,1,464.358,952.689Z"
          transform="translate(-448.962 -929.053)"
          fill={color || IconConfig.defaultColor}
        />
        <path
          id="Path_106"
          data-name="Path 106"
          d="M468.948,949.739a1.071,1.071,0,0,1-1.07-1.07v-4.617a1.07,1.07,0,1,1,2.141,0v4.617A1.071,1.071,0,0,1,468.948,949.739Z"
          transform="translate(-447.001 -926.102)"
          fill={color || IconConfig.defaultColor}
        />
        <path
          id="Path_107"
          data-name="Path 107"
          d="M475.278,961.838H461.9c-5.176,0-8.654-3.634-8.654-9.041V940.2c0-5.408,3.478-9.041,8.654-9.041H475.28c5.176,0,8.654,3.634,8.654,9.041v12.6C483.934,958.2,480.455,961.838,475.278,961.838ZM461.9,933.295c-3.956,0-6.514,2.709-6.514,6.9v12.6c0,4.193,2.557,6.9,6.514,6.9h13.374c3.958,0,6.515-2.707,6.515-6.9V940.2c0-4.192-2.557-6.9-6.514-6.9Z"
          transform="translate(-453.25 -931.154)"
          fill={color || IconConfig.defaultColor}
        />
      </g>
    </g>
  ),
});

export { Statistics };
