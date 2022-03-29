import { IconConfig } from '@Utils/types/config';
import { IconGenerator } from '.';

const Filter: IconGenerator = (color) => ({
  svgViewBoxValue: {
    width: 16.15,
    height: 16.15,
  },
  iconPath: (
    <g id="Iconly_Light_Filter_2" data-name="Iconly Light Filter 2" transform="translate(-694.25 -1028.154)">
      <g id="Filter_2-4" data-name="Filter 2-4" transform="translate(694.25 1028.154)">
        <path
          id="Path_99"
          data-name="Path 99"
          d="M700.307,1044.3a.621.621,0,0,1-.621-.621v-5.826l-4.98-5.489a1.773,1.773,0,0,1-.456-1.192v-1.269a1.735,1.735,0,0,1,1.708-1.752h12.725a1.741,1.741,0,0,1,1.717,1.757v1.235a1.758,1.758,0,0,1-.511,1.246l-5.4,5.482v4.134a.622.622,0,0,1-.357.562l-3.561,1.675A.616.616,0,0,1,700.307,1044.3Zm8.365-14.907H695.967a.484.484,0,0,0-.336.15.492.492,0,0,0-.138.35v1.28a.53.53,0,0,0,.137.358l5.139,5.666a.622.622,0,0,1,.161.417v5.087l2.319-1.092v-4a.617.617,0,0,1,.179-.436l5.579-5.664a.526.526,0,0,0,.152-.372V1029.9A.5.5,0,0,0,708.673,1029.4Z"
          transform="translate(-694.25 -1028.154)"
          fill={color || IconConfig.defaultColor}
        />
      </g>
    </g>
  ),
});

export { Filter };
