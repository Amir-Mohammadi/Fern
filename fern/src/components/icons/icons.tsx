import SizeConverter from '@Utils/size-converter';

export type IconsProps = {
  color?: string;
  secondColor?: string;
  size?: number;
  icon: IconGenerator;
};

const Icons: React.FC<IconsProps> = (props) => {
  const iconDefinition = props.icon(props.color, props.secondColor);

  let [width, height] = SizeConverter(props.size, iconDefinition.svgViewBoxValue);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${iconDefinition.svgViewBoxValue.width} ${iconDefinition.svgViewBoxValue.height}`}>
      {iconDefinition.iconPath}
    </svg>
  );
};

export type IconGenerator = (color?: string, secondColor?: string) => IconDefinition;

interface IconDefinition {
  iconPath: JSX.Element;
  svgViewBoxValue: { width: number; height: number };
}

export { Icons };
