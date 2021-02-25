import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface ModalState {
  modalLogin: boolean;
}

const initialState: ModalState = {
  modalLogin: false,
};

export const loginSlice = createSlice({
  name: 'modalLogin',
  initialState,
  reducers: {
    open: (state) => {
      state.modalLogin = true;
    },
    close: (state) => {
      state.modalLogin = false;
    },
  },
});

export const { open, close } = loginSlice.actions;

export const selectModalLogin = (state: RootState) =>
  state.modalLogin.modalLogin;

export default loginSlice.reducer;
