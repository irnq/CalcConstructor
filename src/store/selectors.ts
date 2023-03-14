import { RootState } from './store';

export const getDraggable = (state: RootState) => state.draggable.draggable;
export const getMode = (state: RootState) => state.draggable.mode;

export const getCurrentOperand = (state: RootState) => state.calc.currentOperand;
export const getResult = (state: RootState) => state.calc.result;
