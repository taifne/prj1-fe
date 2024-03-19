import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: {
    name: string;
    email: string;
  };
};

const initialState:AuthState= {
  isLoggedIn: false,
  accessToken: null,
  user: {
    name: "",
    email: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.user.name = action.payload.userName;
      state.user.email = action.payload.email;
    },
    logout: (state) => {
      state.accessToken=null;
      state.isLoggedIn = false;
      state.accessToken = null;
    },
    updateJWT:(state, action: PayloadAction<any>)=>{
      state.accessToken=action.payload;
    }
  },
});

export const { login, logout,updateJWT } = authSlice.actions;

export default authSlice.reducer;
