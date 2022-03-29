import { IconConfig } from '@Utils/types/config';
import React from 'react';
import { IconGenerator } from './icons';

const RecentVisits: IconGenerator = (color) => ({
  svgViewBoxValue: {
    width: 18.016,
    height: 21.081,
  },
  iconPath: (
    <g>
      <path
        id="Path_1717"
        data-name="Path 1717"
        d="M44.44,15.97H38.6v-10h3.93a.681.681,0,0,0,.682-.682V1.363h6.452V10.2a.682.682,0,1,0,1.363,0V.682A.682.682,0,0,0,50.347,0H42.532a.681.681,0,0,0-.482.2L37.439,4.811a.681.681,0,0,0-.2.482V16.652a.681.681,0,0,0,.682.682h6.52a.682.682,0,0,0,0-1.363ZM39.566,4.612l2.285-2.285V4.612Z"
        transform="translate(-37.239)"
        fill={color || IconConfig.defaultColor}
      />
      <path
        id="Path_1718"
        data-name="Path 1718"
        d="M125.278,183.172h-5.7a.682.682,0,1,0,0,1.363h5.7a.682.682,0,0,0,0-1.363Z"
        transform="translate(-115.532 -175.63)"
        fill={color || IconConfig.defaultColor}
      />
      <path
        id="Path_1719"
        data-name="Path 1719"
        d="M125.278,249.379h-5.7a.682.682,0,1,0,0,1.363h5.7a.682.682,0,0,0,0-1.363Z"
        transform="translate(-115.532 -239.111)"
        fill={color || IconConfig.defaultColor}
      />
      <path
        id="Path_1720"
        data-name="Path 1720"
        d="M262.952,299.76l-1.853-1.834a3.866,3.866,0,1,0-.963.964l1.857,1.838a.681.681,0,0,0,.959-.968Zm-7.522-4.037a2.5,2.5,0,1,1,2.5,2.5A2.5,2.5,0,0,1,255.43,295.724Z"
        transform="translate(-245.139 -279.845)"
        fill={color || IconConfig.defaultColor}
      />
    </g>
  ),
});

export { RecentVisits };
