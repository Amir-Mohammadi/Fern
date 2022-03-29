import { IconConfig } from './types/config';

const SizeConverter = (
  size: number = IconConfig.defaultSize,
  svgViewBoxSize: { width: number; height: number },
): [number, number] => {
  let _size = { width: 0, height: 0 };
  _size.width = size;
  _size.height = size * (svgViewBoxSize.height / svgViewBoxSize.width);
  return [_size.width, _size.height];
};

export default SizeConverter;
