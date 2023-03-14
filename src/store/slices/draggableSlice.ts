import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Mode } from '../../constants/modeOptions';

interface InitialState {
  mode: Mode;
  draggable: { [key: string]: { available: boolean } };
}

const initialState: InitialState = {
  mode: Mode.constructor,
  draggable: {
    display: {
      available: true,
    },
    digits: {
      available: true,
    },
    operators: {
      available: true,
    },
    equal: {
      available: true,
    },
  },
};

const draggableSlice = createSlice({
  initialState,
  name: 'draggable',
  reducers: {
    setMode: (state, { payload }: PayloadAction<Mode>) => {
      state.mode = payload;
    },
    addItem: (state, { payload }: PayloadAction<string>) => {
      state.draggable[payload].available = false;
    },
    deleteItem: (state, { payload }: PayloadAction<string>) => {
      state.draggable[payload].available = true;
    },
  },
});

export const { addItem, deleteItem, setMode } = draggableSlice.actions;

export default draggableSlice.reducer;
