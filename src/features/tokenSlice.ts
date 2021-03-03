import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface TokenState {
  token: string;
}

const initialState: TokenState = {
  token: '',
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
    },
    deleteToken: (state) => {
      state.token = '';
    },
  },
});

export const { saveToken, deleteToken } = tokenSlice.actions;

export const selectToken = (state: RootState) => state.token.token;

export default tokenSlice.reducer;
