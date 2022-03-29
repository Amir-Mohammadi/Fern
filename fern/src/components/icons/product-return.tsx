import { IconConfig } from '@Utils/types/config';
import React from 'react';
import { IconGenerator } from './icons';

const ProductReturn: IconGenerator = (color, secondColor) => ({
  svgViewBoxValue: {
    width: 137.867,
    height: 116.422,
  },
  iconPath: (
    <g id="Group_124" data-name="Group 124" transform="translate(-511.526 -4982.375)">
      <path
        id="Path_75"
        data-name="Path 75"
        d="M415.106,100.274H381.371a4.121,4.121,0,0,0,0,8.243h33.734a4.121,4.121,0,1,0,0-8.243Z"
        transform="translate(134.276 4952.051)"
        fill={secondColor || IconConfig.defaultColor}
      />
      <path
        id="Path_76"
        data-name="Path 76"
        d="M410.349,95.632h-25.5a4.12,4.12,0,1,0,0,8.239h25.5a4.12,4.12,0,0,0,0-8.239Z"
        transform="translate(143.155 4940.215)"
        fill={secondColor || IconConfig.defaultColor}
      />
      <path
        id="Path_77"
        data-name="Path 77"
        d="M409.709,95.11a4.12,4.12,0,0,0-4.121-4.121H388.335a4.12,4.12,0,1,0,0,8.239h17.252A4.117,4.117,0,0,0,409.709,95.11Z"
        transform="translate(152.034 4928.375)"
        fill={secondColor || IconConfig.defaultColor}
      />
      <path
        id="Path_78"
        data-name="Path 78"
        d="M460.374,91.292a8.789,8.789,0,0,0-6.692-3.085H406.444a8.772,8.772,0,0,0-8.7,7.448L390.963,139a8.81,8.81,0,0,0,8.7,10.16h47.238a8.772,8.772,0,0,0,8.7-7.448l6.773-43.341A8.8,8.8,0,0,0,460.374,91.292Zm-12.907,49.145a.568.568,0,0,1-.561.483H399.667a.572.572,0,0,1-.43-.2.558.558,0,0,1-.128-.454l6.773-43.333a.568.568,0,0,1,.561-.483h15.225l-1.981,10.66a2.759,2.759,0,0,0,2.712,3.262h9.581a2.759,2.759,0,0,0,2.712-2.254l2.169-11.668h16.819a.561.561,0,0,1,.557.653Z"
        transform="translate(168.977 4921.282)"
        fill={color || IconConfig.defaultColor}
      />
      <path
        id="Path_79"
        data-name="Path 79"
        d="M429.77,80.569a3.23,3.23,0,1,0,0,6.461A51.752,51.752,0,1,1,399.9,181l2.226,0a3.246,3.246,0,0,0,2.3-5.538h0a3.53,3.53,0,0,0-2.5-1.04l-9.972-.007a4.062,4.062,0,0,0-4.061,4.058l0,10.316a2.694,2.694,0,0,0,.788,1.91h0a3.388,3.388,0,0,0,5.786-2.393v-3.273a58.2,58.2,0,1,0,35.3-104.462Z"
        transform="translate(161.412 4901.806)"
        fill={secondColor || IconConfig.defaultColor}
      />
    </g>
  ),
});

export { ProductReturn };
