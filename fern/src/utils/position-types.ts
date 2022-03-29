export enum Position {
  topLeft,
  topCenter,
  topRight,
  middleLeft,
  middleCenter,
  middleRight,
  bottomLeft,
  bottomCenter,
  bottomRight,
  none,
}

export function castPosition(position: Position) {
  switch (position) {
    case 0:
      return { justifyContent: 'flex-end', alignItems: 'flex-start' };
    case 1:
      return { justifyContent: 'center', alignItems: 'flex-start' };
    case 2:
      return { justifyContent: 'flex-start', alignItems: 'flex-start' };
    case 3:
      return { justifyContent: 'flex-end', alignItems: 'center' };
    case 4:
      return { justifyContent: 'center', alignItems: 'center' };
    case 5:
      return { justifyContent: 'flex-start', alignItems: 'center' };
    case 6:
      return { justifyContent: 'flex-end', alignItems: 'flex-end' };
    case 7:
      return { justifyContent: 'center', alignItems: 'flex-end' };
    case 8:
      return { justifyContent: 'flex-start', alignItems: 'flex-end' };
    case 9:
      return { display: 'none' };
    default:
      return {};
  }
}
