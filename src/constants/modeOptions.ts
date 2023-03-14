import { ICON } from './icons';
import { IOption } from '../interfaces/IOption';

export enum Mode {
  runtime,
  constructor,
}

export const OPTIONS: IOption[] = [
  {
    icon: ICON.eye,
    title: 'Runtime',
  },
  {
    icon: ICON.selector,
    title: 'Constructor',
  },
];
