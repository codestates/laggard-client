import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface ModalState {
  isLogin: boolean;
}

const initialState: ModalState = {
  isLogin: false,
};

export const loginSlice = createSlice({
  name: 'isLogin',
  initialState,
  reducers: {
    isLogin: (state) => {
      state.isLogin = true;
    },
    isLogout: (state) => {
      state.isLogin = false;
    },
  },
});

export const { isLogin, isLogout } = loginSlice.actions;

export const selectLogin = (state: RootState) => state.isLogin.isLogin;

export default loginSlice.reducer;
