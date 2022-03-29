export enum Mode {
  primary = '#24AFFF',
  danger = '#DB0060',
  warning = '#FF9124',
  success = '#009289',
  light = '#AAAAAA',
}

export const Gradients = {
  danger: { baseColor: '#ce0045', secondColor: '#ff5252' },
  primary: { baseColor: '#24AFFF', secondColor: '#99daff' },
  success: { baseColor: '#009289', secondColor: '#ccfffc' },
  warning: { baseColor: '#FF9124', secondColor: '#ffe6cc' },
  light: { baseColor: '#AAAAAA', secondColor: '#e6e6e6' },
};

type Gradients = {
  danger: Gradient;
  primary: Gradient;
  success: Gradient;
  warning: Gradient;
  light: Gradient;
};

export type Gradient = {
  baseColor: string;
  secondColor: string;
};
