import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const Message = {
  error: 'Ошибка',
};

const DISPLAY_LENGTH = 9;

interface InitialState {
  currentOperand: string | null;
  previousOperand: string | null;
  operator: string | null;
  result: string | null;
}

const initialState: InitialState = {
  currentOperand: null,
  previousOperand: null,
  operator: null,
  result: null,
};

const calcSlice = createSlice({
  initialState,
  name: 'calc',
  reducers: {
    resetCalcState: (state) => {
      state.currentOperand = null;
      state.previousOperand = null;
      state.result = null;
      state.operator = null;
    },
    updateCurrentOperand: (state, { payload }: PayloadAction<string>) => {
      if (state.result && !state.operator) {
        state.result = null;
      }
      if (state.operator && state.previousOperand === null) {
        state.previousOperand = state.currentOperand;
        state.currentOperand = null;
      }
      if (
        !state.currentOperand ||
        (!state.currentOperand.includes('.') && !Number(state.currentOperand))
      ) {
        if (payload === ',') {
          state.currentOperand = '0.';
          return;
        }

        state.currentOperand = payload;
      } else {
        if (payload === ',') {
          if (state.currentOperand.includes('.')) {
            return;
          } else {
            state.currentOperand += '.';
            return;
          }
        }
        state.currentOperand += payload;
      }
    },
    setOperator: (state, { payload }: PayloadAction<string>) => {
      if (state.result) {
        state.currentOperand = state.result;
        state.result = null;
      }
      if (state.previousOperand === null) {
        state.operator = payload === '=' ? null : payload;
        return;
      }
      const { currentOperand, previousOperand, operator } = state;
      const result = doMathAndFormat(currentOperand, previousOperand, operator, DISPLAY_LENGTH);
      if (payload === '=') {
        state.result = result;
        state.operator = null;
        state.currentOperand = null;
      } else {
        state.currentOperand = result;
        state.operator = payload;
      }
      state.previousOperand = null;
    },
  },
});

export const { updateCurrentOperand, resetCalcState, setOperator } = calcSlice.actions;

export default calcSlice.reducer;

function doMathAndFormat(
  operand1: string | null,
  operand2: string | null,
  operator: string | null,
  displayLength: number,
): string {
  const num1 = Number(operand1);
  const num2 = Number(operand2);
  let result = 0;
  if (isNaN(num1) || isNaN(num2)) {
    return Message.error;
  }
  switch (operator) {
    case 'x':
      result = num1 * num2;
      break;
    case '/':
      if (num1 === 0) {
        return Message.error;
      }
      result = num2 / num1;
      break;
    case '-':
      result = num2 - num1;
      break;
    case '+':
      result = num2 + num1;
      break;
    default:
      result = num1 || num2;
  }

  let resultStr = result.toString();
  const intPart = parseInt(resultStr).toString();
  const mut = 10 ** (displayLength - intPart.length);

  return (Math.round(result * mut) / mut).toString();
}
