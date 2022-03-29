import { IconConfig } from '@Utils/types/config';
import { IconGenerator } from './icons';

const Email: IconGenerator = (color) => ({
  svgViewBoxValue: {
    width: 14,
    height: 10.664,
  },
  iconPath: (
    <g id="Group_765" data-name="Group 765" transform="translate(0 -61)">
      <g id="Group_678" data-name="Group 678" transform="translate(0 61)">
        <path
          id="Path_1697"
          data-name="Path 1697"
          d="M12.77,61H1.23A1.233,1.233,0,0,0,0,62.23v8.2a1.232,1.232,0,0,0,1.23,1.23H12.77A1.232,1.232,0,0,0,14,70.434v-8.2A1.232,1.232,0,0,0,12.77,61Zm-.17.82L7.026,67.394,1.4,61.82ZM.82,70.264V62.4l3.951,3.917Zm.58.58,3.953-3.953,1.385,1.373a.41.41,0,0,0,.579,0l1.351-1.351L12.6,70.844Zm11.779-.58L9.248,66.332,13.18,62.4Z"
          transform="translate(0 -61)"
          fill={color || IconConfig.defaultColor}
        />
      </g>
    </g>
  ),
});

export { Email };
