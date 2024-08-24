/* eslint-disable @typescript-eslint/no-empty-object-type */
import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

type LoginData = {
  authData: {};
};
type AuthData = {};

const initialState: LoginData = {
  authData: {},
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthData>) => {
      state.authData = action.payload;
    },
  },
});
export const { setAuthData } = authSlice.actions;
export default authSlice.reducer;
