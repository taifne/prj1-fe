import { permissions } from './../../components/Shared/roles-permissions/utils';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  username: string;
  _id:string;
  email: string;
  permissions:String[];
}


interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: User;

}

const initialState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
  user: {
    _id:"string",
    username: "",
    email: "",
    permissions:[]
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ accessToken: string; user: User }>) => {
      const { accessToken, user } = action.payload;
      state.isLoggedIn = true;
      state.accessToken = accessToken;
      state.user = user;

    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.user = {
      _id:"",
        username: "",
        email: "",
        permissions:[]
      };
    },
    updateJWT: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { login, logout, updateJWT } = authSlice.actions;

export default authSlice.reducer;
