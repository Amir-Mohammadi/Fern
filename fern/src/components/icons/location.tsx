import { IconConfig } from '@Utils/types/config';
import React from 'react';
import { IconGenerator } from './icons';

const Location: IconGenerator = (color) => ({
  svgViewBoxValue: {
    width: 14.777,
    height: 17.153,
  },
  iconPath: (
    <g id="Group_764" data-name="Group 764" transform="translate(-45.13 -102.098)">
      <path
        id="Path_16"
        data-name="Path 16"
        d="M52.519,102.1a7.248,7.248,0,0,0-7.389,7.079,7.9,7.9,0,0,0,1.146,3.895,15.442,15.442,0,0,0,2.475,3.171,23.579,23.579,0,0,0,3.579,2.953.361.361,0,0,0,.19.056.344.344,0,0,0,.19-.056,22.951,22.951,0,0,0,3.578-2.953,15.442,15.442,0,0,0,2.475-3.171,7.9,7.9,0,0,0,1.146-3.895A7.248,7.248,0,0,0,52.519,102.1Zm5.638,10.623a14.774,14.774,0,0,1-2.359,3.02,23.537,23.537,0,0,1-3.28,2.738,23.352,23.352,0,0,1-3.269-2.728,14.841,14.841,0,0,1-2.366-3.023,7.189,7.189,0,0,1-1.055-3.547,6.7,6.7,0,0,1,13.375,0A7.2,7.2,0,0,1,58.157,112.721Z"
        transform="translate(0 0)"
        fill={color || IconConfig.defaultColor}
      />
      <path
        id="Path_17"
        data-name="Path 17"
        d="M56.265,107.376a5.491,5.491,0,1,0,5.491,5.491A5.5,5.5,0,0,0,56.265,107.376Zm0,10.278a4.788,4.788,0,1,1,4.788-4.788A4.793,4.793,0,0,1,56.265,117.654Z"
        transform="translate(-3.746 -3.503)"
        fill={color || IconConfig.defaultColor}
      />
    </g>
  ),
});

export { Location };
