import { IconConfig } from '@Utils/types/config';
import { IconGenerator } from './icons';

const Exit: IconGenerator = (color) => ({
  svgViewBoxValue: {
    width: 19,
    height: 16.196,
  },
  iconPath: (
    <g id="Group_756" data-name="Group 756" transform="translate(19) rotate(90)">
      <path
        id="Path_1721"
        data-name="Path 1721"
        d="M.725,5.2A.722.722,0,0,0,1.22,5L4.013,2.394v9.837a.725.725,0,1,0,1.45,0V2.394L8.256,5a.725.725,0,0,0,.99-1.06L5.233.2,5.214.179,5.19.159,5.159.135,5.134.118,5.1.1,5.074.083,5.039.066,5.01.053,4.976.041,4.944.03,4.909.021,4.877.014,4.836.007,4.808,0c-.023,0-.046,0-.07,0h0Q4.7,0,4.668,0l-.031,0L4.6.014,4.565.022,4.533.03,4.5.042l-.03.011L4.434.068,4.4.082,4.373.1,4.344.117l-.03.021L4.288.157,4.259.182,4.243.2.23,3.942A.725.725,0,0,0,.725,5.2Z"
        transform="translate(3.481)"
        fill={color || IconConfig.defaultColor}
      />
      <path
        id="Path_1722"
        data-name="Path 1722"
        d="M15.471,0H11.6a.725.725,0,0,0,0,1.45h3.142v9.911H1.45V1.45H4.593a.725.725,0,0,0,0-1.45H.725A.725.725,0,0,0,0,.725V12.087a.725.725,0,0,0,.725.725H15.471a.725.725,0,0,0,.725-.725V.725A.725.725,0,0,0,15.471,0Z"
        transform="translate(0 6.188)"
        fill={color || IconConfig.defaultColor}
      />
    </g>
  ),
});

export { Exit };
