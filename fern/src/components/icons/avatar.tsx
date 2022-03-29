import { IconConfig } from '@Utils/types/config';
import { IconGenerator } from './icons';

const Avatar: IconGenerator = (color) => ({
  svgViewBoxValue: {
    width: 19.336,
    height: 23.517,
  },
  iconPath: (
    <path
      id="Path_1807"
      data-name="Path 1807"
      d="M337.7,62.508a5.6,5.6,0,1,0-2.122,0,9.681,9.681,0,0,0-8.6,9.611v2.8h19.336v-2.8a9.675,9.675,0,0,0-8.611-9.611Zm-5.13-5.5a4.076,4.076,0,1,1,4.076,4.076A4.077,4.077,0,0,1,332.574,57Zm12.214,16.388H328.506V72.118a8.145,8.145,0,1,1,16.29,0v1.274Zm0,0"
      transform="translate(-326.979 -51.403)"
      fill={color || IconConfig.defaultColor}
    />
  ),
});

export { Avatar };
