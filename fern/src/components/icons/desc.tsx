import { IconConfig } from '@Utils/types/config';
import { IconGenerator } from './icons';

const Desc: IconGenerator = (color) => ({
  svgViewBoxValue: {
    width: 22.507,
    height: 22.503,
  },
  iconPath: (
    <g
      id="Iconly_Light-outline_Edit_Square"
      data-name="Iconly Light-outline Edit Square"
      transform="translate(-357.996 -1339.904)">
      <g id="Edit_Square-5" data-name="Edit Square-5" transform="translate(357.996 1339.904)">
        <path
          id="Edit_Square-6"
          data-name="Edit Square-6"
          d="M364.364,1362.4a6.148,6.148,0,0,1-6.364-5.924c-.006-.148-.006-.3,0-.448v-9.449c0-3.819,2.433-6.511,6.106-6.633h4.4a.828.828,0,0,1,.113,1.649l-.113.007h-4.138a4.5,4.5,0,0,0-4.7,4.291c-.007.141-.007.28,0,.42v9.45c0,2.934,1.719,4.864,4.454,4.976h10.013a4.494,4.494,0,0,0,4.7-4.273c.007-.147.007-.3,0-.443v-4.708a.829.829,0,0,1,1.651-.113l.008.113v4.448c0,3.825-2.425,6.512-6.107,6.637H364.364Zm.386-6.009a.83.83,0,0,1-.832-.828v-.026l.1-4.176a3.211,3.211,0,0,1,.946-2.2l8.266-8.249a3.474,3.474,0,0,1,4.9,0l1.35,1.35a3.456,3.456,0,0,1,.007,4.889l-.007.007-8.308,8.293a3.214,3.214,0,0,1-2.285.946Zm1.393-6.052a1.561,1.561,0,0,0-.46,1.069l-.084,3.325h3.293a1.576,1.576,0,0,0,1-.355l.113-.1,6.456-6.442-3.9-3.9Zm11.487-3.68.675-.675a1.8,1.8,0,0,0,.006-2.546l-.006-.006-1.35-1.343a1.81,1.81,0,0,0-2.557,0l-.675.675Z"
          transform="translate(-357.996 -1339.904)"
          fill={color || IconConfig.defaultColor}
        />
      </g>
    </g>
  ),
});

export { Desc };
