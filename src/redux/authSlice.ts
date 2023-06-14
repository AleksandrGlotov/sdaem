import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isAuth: boolean;
}

let initialState: AuthState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: "authPage",
  initialState,
  reducers: {
    signIn: (state) => {
      state.isAuth = true;
    },
    signOut: (state) => {
      state.isAuth = false;
    }
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
