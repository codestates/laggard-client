import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

type UserInfo = {
  nickname: string;
  email: string;
  sex: boolean;
  birth_year: number;
};

interface UserState {
  user: UserInfo | null;
  guest: { sex: boolean; birth_year: number } | null;
}

const initialState: UserState = {
  user: null,
  guest: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    guestTrue: (
      state,
      action: PayloadAction<{ sex: boolean; birth_year: number }>,
    ) => {
      state.guest = action.payload;
    },
    guestFalse: (state) => {
      state.guest = null;
    },
  },
});

export const { login, logout, guestTrue, guestFalse } = userSlice.actions;

export const selectUser = (state: RootState): UserInfo | null =>
  state.user.user;
export const selectGuest = (
  state: RootState,
): { sex: boolean; birth_year: number } | null => state.user.guest;
export default userSlice.reducer;
