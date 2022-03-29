import { IconConfig } from '@Utils/types/config';
import { IconGenerator } from './icons';

const DeliveryOnPlace: IconGenerator = (color, secondColor) => ({
  svgViewBoxValue: {
    width: 122.318,
    height: 62.161,
  },
  iconPath: (
    <g id="Group_116" data-name="Group 116" transform="translate(-1508 -4979.955)">
      <path
        id="Path_65"
        data-name="Path 65"
        d="M393.406,61.444H359a4.2,4.2,0,1,0,0,8.4h34.4a4.2,4.2,0,1,0,0-8.4Z"
        transform="translate(1153.201 4962.197)"
        fill={secondColor || IconConfig.defaultColor}
      />
      <path
        id="Path_66"
        data-name="Path 66"
        d="M388.485,56.8h-26a4.2,4.2,0,0,0,0,8.406h26a4.2,4.2,0,0,0,0-8.406Z"
        transform="translate(1162.325 4950.031)"
        fill={secondColor || IconConfig.defaultColor}
      />
      <path
        id="Path_67"
        data-name="Path 67"
        d="M387.764,56.359a4.2,4.2,0,0,0-4.2-4.2h-17.6a4.2,4.2,0,1,0,0,8.4h17.6A4.2,4.2,0,0,0,387.764,56.359Z"
        transform="translate(1171.449 4937.867)"
        fill={secondColor || IconConfig.defaultColor}
      />
      <path
        id="Path_68"
        data-name="Path 68"
        d="M439.3,52.519a8.96,8.96,0,0,0-6.824-3.142H384.3a8.946,8.946,0,0,0-8.877,7.6l-6.911,44.2a8.985,8.985,0,0,0,8.877,10.361h48.176a8.946,8.946,0,0,0,8.877-7.6l6.908-44.2A8.981,8.981,0,0,0,439.3,52.519Zm-13.163,50.123a.583.583,0,0,1-.572.492H377.391a.577.577,0,0,1-.568-.67l6.908-44.193a.583.583,0,0,1,.572-.492H399.83l-2.02,10.875a2.814,2.814,0,0,0,2.766,3.323h9.771a2.814,2.814,0,0,0,2.766-2.3l2.212-11.9h17.153a.593.593,0,0,1,.438.2.581.581,0,0,1,.13.467Z"
        transform="translate(1188.86 4930.578)"
        fill={color || IconConfig.defaultColor}
      />
    </g>
  ),
});

export { DeliveryOnPlace };
