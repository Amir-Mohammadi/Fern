import { ErrorProps } from '@Components/screens/error-screen';
import { initialMobxState } from '@Stores/core/stores';
import { VALIDATION_ROLES } from '@Utils/input-validator';

export interface PageProps {
  initialMobxState?: initialMobxState;
  error?: ErrorProps;
  seoData?: SeoData;
}

export type SeoData = {
  pageTitle?: string;
  metaDescription?: string;
};

export type Input = {
  roles?: Array<{ name: VALIDATION_ROLES; roleScope?: any }>;
  value: string;
  error?: string;
};
export interface Error {
  message: string;
}

export enum Colors {
  danger,
  primary,
  success,
  warning,
  light,
}
export enum Positions {
  Right,
  Left,
  Top,
  Bottom,
}
