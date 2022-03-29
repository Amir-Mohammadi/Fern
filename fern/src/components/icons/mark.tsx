import { IconConfig } from '@Utils/types/config';
import React from 'react';
import { IconGenerator } from './icons';

const Mark: IconGenerator = (color, secondColor) => ({
  svgViewBoxValue: {
    width: 78.15,
    height: 102.6,
  },
  iconPath: (
    <g id="Group_123" data-name="Group 123" transform="translate(-429.929 -82.967)">
      <g id="Group_120" data-name="Group 120" transform="translate(429.929 82.967)">
        <g id="Group_119" data-name="Group 119">
          <path
            id="Path_80"
            data-name="Path 80"
            d="M469,82.967a39.068,39.068,0,0,0-21.038,71.991v27.6a3,3,0,0,0,4.671,2.5L469,174.151l16.371,10.912a3,3,0,0,0,4.671-2.5v-27.6A39.068,39.068,0,0,0,469,82.967Zm15.03,93.976-13.362-8.908a3.007,3.007,0,0,0-3.333,0l-13.362,8.908V158.111a39.032,39.032,0,0,0,30.056,0ZM469,155.108a33.065,33.065,0,1,1,33.065-33.065A33.1,33.1,0,0,1,469,155.108Z"
            transform="translate(-429.929 -82.967)"
            fill={color || IconConfig.defaultColor}
          />
        </g>
      </g>
      <g id="Group_122" data-name="Group 122" transform="translate(444.956 97.996)">
        <g id="Group_121" data-name="Group 121">
          <path
            id="Path_81"
            data-name="Path 81"
            d="M482.8,104.9a3.013,3.013,0,0,0-2.441-2.059L467.375,101,461.58,89.537a3.008,3.008,0,0,0-5.367,0L450.418,101l-12.986,1.842a3.005,3.005,0,0,0-1.65,5.153l9.354,8.9L442.93,129.45a3.007,3.007,0,0,0,4.335,3.192l11.629-5.969,11.633,5.969a3.007,3.007,0,0,0,4.335-3.192L472.656,116.9l9.354-8.9A3.008,3.008,0,0,0,482.8,104.9Zm-15.457,8.752a3,3,0,0,0-.889,2.7l1.439,8.184-7.624-3.913a3,3,0,0,0-2.746,0l-7.625,3.913,1.439-8.184a3,3,0,0,0-.889-2.7l-6.024-5.731,8.391-1.191a3,3,0,0,0,2.261-1.619l3.818-7.557,3.822,7.557a3,3,0,0,0,2.261,1.619l8.388,1.191Z"
            transform="translate(-434.848 -87.887)"
            fill={secondColor || IconConfig.defaultColor}
          />
        </g>
      </g>
    </g>
  ),
});

export { Mark };
