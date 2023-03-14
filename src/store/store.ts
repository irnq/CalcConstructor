import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import calcSlices from './slices/calcSlices';
import draggableSlice from './slices/draggableSlice';

export const store = configureStore({
  reducer: {
    draggable: draggableSlice,
    calc: calcSlices,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
