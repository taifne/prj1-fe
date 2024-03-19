import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../utils/types/user";

const userSlice = createSlice({
  name: "user",
  initialState: {
    listUser: [] as UserType[],
  },
  reducers: {
    addUser: (state, action) => {
      state.listUser.push(action.payload);
    },
    getList: (state, action) => {
      state.listUser = action.payload;
    },
    deleteUser: (state, action) => {
      state.listUser = state.listUser.filter((user) => user._id !== action.payload._id);
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      state.listUser = state.listUser.map((user) => {
        if (user._id === updatedUser._id) {
          return { ...user, ...updatedUser };
        }
        return user;
      });
    },
  },
});

export const { getList, deleteUser, updateUser, addUser } = userSlice.actions;

export default userSlice.reducer;
