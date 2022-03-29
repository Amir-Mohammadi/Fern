import { IconConfig } from '@Utils/types/config';
import { IconGenerator } from './icons';

const Add: IconGenerator = (color) => ({
  svgViewBoxValue: {
    width: 14,
    height: 14,
  },
  iconPath: (
    <g id="Group_768" data-name="Group 768" transform="translate(-1507 -675)">
      <line
        id="Line_95"
        y2="14"
        transform="translate(1514.333 675)"
        fill="none"
        stroke={color || IconConfig.defaultColor}
        strokeWidth="1"
      />
      <line
        id="Line_94"
        data-name="Line 94"
        x2="14"
        transform="translate(1507 682.333)"
        fill="none"
        stroke={color || IconConfig.defaultColor}
        strokeWidth="1"
      />
    </g>
  ),
});

export { Add };
