import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import modalReducer from '../features/modalSlice';
import messageReducer from '../features/messageSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    message: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
