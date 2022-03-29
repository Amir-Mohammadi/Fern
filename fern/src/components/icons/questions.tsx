import { IconConfig } from '@Utils/types/config';
import React from 'react';
import { IconGenerator } from './icons';

const Questions: IconGenerator = (color) => ({
  svgViewBoxValue: {
    width: 21.065,
    height: 23.399,
  },
  iconPath: (
    <g
      id="Iconly_Light-outline_Document"
      data-name="Iconly Light-outline Document"
      transform="translate(-262.995 -1291.904)">
      <g id="Document-6" transform="translate(262.995 1291.904)">
        <path
          id="Document-7"
          d="M269.012,1315.3a8.153,8.153,0,0,1-1.37-.11l-.255-.048a5.205,5.205,0,0,1-3.233-1.973,6.486,6.486,0,0,1-1.154-3.964V1298a8.581,8.581,0,0,1,.07-1.123c.409-3.159,2.576-4.971,5.941-4.971h9.038c3.729,0,5.975,2.245,6.01,6v11.3c0,3.815-2.247,6.094-6.01,6.094Zm-4.33-17.3v11.209c0,2.912,1.457,4.39,4.329,4.39h9.027c2.866,0,4.32-1.478,4.32-4.39V1298c0-2.912-1.453-4.39-4.32-4.39h-9.026C266.139,1293.609,264.682,1295.086,264.682,1298ZM269.3,1309.4a.847.847,0,0,1,0-1.694h8.437a.847.847,0,0,1,0,1.694Zm8.437-4.948H269.3a.86.86,0,0,1,0-1.706h8.437a.845.845,0,0,1,.808.4.869.869,0,0,1,0,.911.843.843,0,0,1-.808.4Zm-8.426-4.948a.859.859,0,0,1,0-1.7h3.209a.859.859,0,0,1,0,1.7Z"
          transform="translate(-262.995 -1291.904)"
          fill={color || IconConfig.defaultColor}
        />
      </g>
    </g>
  ),
});

export { Questions };
