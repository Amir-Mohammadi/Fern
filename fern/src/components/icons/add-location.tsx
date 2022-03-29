import { IconConfig } from '@Utils/types/config';
import { IconGenerator } from './icons';

const AddLocation: IconGenerator = (color) => ({
  svgViewBoxValue: {
    width: 23.303,
    height: 27.05,
  },

  iconPath: (
    <g id="Group_772" data-name="Group 772" transform="translate(-45.13 -102.098)">
      <path
        id="Path_16"
        data-name="Path 16"
        d="M56.781,102.1A11.43,11.43,0,0,0,45.13,113.261a12.45,12.45,0,0,0,1.807,6.142,24.351,24.351,0,0,0,3.9,5,37.184,37.184,0,0,0,5.643,4.656.569.569,0,0,0,.3.089.543.543,0,0,0,.3-.089,36.191,36.191,0,0,0,5.643-4.656,24.351,24.351,0,0,0,3.9-5,12.45,12.45,0,0,0,1.807-6.142A11.43,11.43,0,0,0,56.781,102.1Zm8.891,16.751a23.3,23.3,0,0,1-3.719,4.762,37.116,37.116,0,0,1-5.172,4.318,36.824,36.824,0,0,1-5.155-4.3,23.4,23.4,0,0,1-3.73-4.767,11.337,11.337,0,0,1-1.663-5.593,10.558,10.558,0,0,1,21.092-.006A11.353,11.353,0,0,1,65.672,118.849Z"
        transform="translate(0 0)"
        fill={color || IconConfig.defaultColor}
      />
      <path
        id="Path_17"
        data-name="Path 17"
        d="M59.432,107.376a8.658,8.658,0,1,0,8.658,8.658A8.67,8.67,0,0,0,59.432,107.376Zm0,16.208a7.55,7.55,0,1,1,7.55-7.55A7.559,7.559,0,0,1,59.432,123.584Z"
        transform="translate(-2.651 -2.479)"
        fill={color || IconConfig.defaultColor}
      />
      <path
        id="Path_18"
        data-name="Path 18"
        d="M67.115,117.712H63.329v-3.786a.509.509,0,1,0-1.018,0v3.786H58.525a.509.509,0,0,0,0,1.018h3.787v3.787a.509.509,0,0,0,1.018,0V118.73h3.786a.509.509,0,1,0,0-1.018Z"
        transform="translate(-6.052 -5.316)"
        fill={color || IconConfig.defaultColor}
      />
    </g>
  ),
});

export { AddLocation };
