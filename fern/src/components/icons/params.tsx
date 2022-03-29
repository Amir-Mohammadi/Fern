import { IconConfig } from '@Utils/types/config';
import React from 'react';
import { IconGenerator } from './icons';

const Params: IconGenerator = (color) => ({
  svgViewBoxValue: {
    width: 23.706,
    height: 22.5,
  },
  iconPath: (
    <g id="Iconly_Light-outline_Filter" data-name="Iconly Light-outline Filter" transform="translate(-646 -1340.404)">
      <g id="Filter-5" transform="translate(646 1340.404)">
        <path
          id="Filter-6"
          d="M660.773,1358.506a4.456,4.456,0,1,1,4.514,4.4h-.059A4.43,4.43,0,0,1,660.773,1358.506Zm2.09,0a2.369,2.369,0,1,0,2.4-2.335h-.033A2.352,2.352,0,0,0,662.863,1358.506Zm-15.818,1.031a1.031,1.031,0,1,1,0-2.063h8.568a1.031,1.031,0,1,1,0,2.063h-8.568ZM646,1344.8a4.456,4.456,0,1,1,4.455,4.4A4.432,4.432,0,0,1,646,1344.8Zm2.09,0a2.369,2.369,0,1,0,2.4-2.335h-.033A2.352,2.352,0,0,0,648.09,1344.8Zm11.982,1.032a1.032,1.032,0,0,1-.07-2.062c.024,0,.046,0,.07,0h8.568a1.032,1.032,0,0,1,.07,2.062c-.024,0-.046,0-.07,0Z"
          transform="translate(-646 -1340.404)"
          fill={color || IconConfig.defaultColor}
        />
      </g>
    </g>
  ),
});

export { Params };
