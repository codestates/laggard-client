import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import modalReducer from '../features/modalSlice';
import messageReducer from '../features/messageSlice';
import songReducer from '../features/testInfoSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    message: messageReducer,
    song: songReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
