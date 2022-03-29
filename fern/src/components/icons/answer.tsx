import { IconGenerator } from './icons';

const Answer: IconGenerator = (color, secondColor) => ({
  svgViewBoxValue: {
    width: 51.638,
    height: 49.142,
  },
  iconPath: (
    <g id="Group_817" data-name="Group 817" transform="translate(-556 -168.5)">
      <path
        id="Path_1806"
        data-name="Path 1806"
        d="M558.34,168.5H605.3a2.339,2.339,0,0,1,2.34,2.34v39.781a2.339,2.339,0,0,1-2.34,2.34H563.02a2.343,2.343,0,0,0-2.34,2.34,2.366,2.366,0,0,1-.047.472,2.327,2.327,0,0,1-.352.837,2.356,2.356,0,0,1-.632.632,2.33,2.33,0,0,1-.837.352,2.363,2.363,0,0,1-.472.047,2.339,2.339,0,0,1-2.293-1.868A2.361,2.361,0,0,1,556,215.3V170.84A2.339,2.339,0,0,1,558.34,168.5Z"
        transform="translate(0 0)"
        fill={color ? color : '#80deea'}
      />
      <path
        id="Path_1807"
        data-name="Path 1807"
        d="M617.34,247h28.393a2.34,2.34,0,0,1,0,4.68H617.34a2.34,2.34,0,0,1,0-4.68Z"
        transform="translate(-49.796 -66.254)"
        fill={secondColor ? secondColor : '#fff'}
      />
      <path
        id="Path_1808"
        data-name="Path 1808"
        d="M617.34,299.5h28.393a2.34,2.34,0,0,1,0,4.68H617.34a2.34,2.34,0,0,1,0-4.68Z"
        transform="translate(-49.796 -110.563)"
        fill={secondColor ? secondColor : '#fff'}
      />
      <path
        id="Path_1809"
        data-name="Path 1809"
        d="M617.34,352h28.393a2.34,2.34,0,1,1,0,4.68H617.34a2.34,2.34,0,1,1,0-4.68Z"
        transform="translate(-49.796 -154.873)"
        fill={secondColor ? secondColor : '#fff'}
      />
    </g>
  ),
});

export { Answer };
