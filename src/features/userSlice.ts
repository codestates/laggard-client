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
}

const initialState: UserState = {
  user: null,
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
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState): UserInfo | null =>
  state.user.user;
export default userSlice.reducer;
