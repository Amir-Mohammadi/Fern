import { IconConfig } from '@Utils/types/config';
import React from 'react';
import { IconGenerator } from './icons';

const Scheduling: IconGenerator = (color, secondColor) => ({
  svgViewBoxValue: {
    width: 15.498,
    height: 15.498,
  },
  iconPath: (
    <g id="Iconly_Light_Time_Circle" data-name="Iconly Light Time Circle" transform="translate(-406 -979.905)">
      <g id="Time_Circle-4" data-name="Time Circle-4" transform="translate(406 979.905)">
        <path
          id="Path_97"
          data-name="Path 97"
          d="M413.749,995.4a7.749,7.749,0,1,1,7.749-7.749A7.758,7.758,0,0,1,413.749,995.4Zm0-14.336a6.587,6.587,0,1,0,6.587,6.587A6.595,6.595,0,0,0,413.749,981.067Z"
          transform="translate(-406 -979.905)"
          fill={secondColor || IconConfig.defaultColor}
        />
        <path
          id="Path_98"
          data-name="Path 98"
          d="M418.414,991.665a.581.581,0,0,1-.3-.083l-2.921-1.746a.582.582,0,0,1-.283-.5v-3.756a.581.581,0,0,1,1.162,0v3.426l2.639,1.577a.581.581,0,0,1-.3,1.08Z"
          transform="translate(-408.006 -981.052)"
          fill={color || IconConfig.defaultColor}
        />
      </g>
    </g>
  ),
});

export { Scheduling };
