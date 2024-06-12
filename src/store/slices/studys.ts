import { createSlice } from "@reduxjs/toolkit";
import { StydyType } from "../../utils/types/study-post-type";

const studySlice = createSlice({
  name: "study",
  initialState: {
    listStudy: [] as StydyType[],
    isFetching: false
  },
  reducers: {
    addStudy: (state, action) => {
      state.listStudy.push(action.payload);
    },
    getList: (state, action) => {
      state.listStudy = action.payload;
    },
    deleteUser: (state, action) => {
      state.listStudy = state.listStudy.filter((user) => user._id !== action.payload._id);
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      state.listStudy = state.listStudy.map((user) => {
        if (user._id === updatedUser._id) {
          return { ...user, ...updatedUser };
        }
        return user;
      });
    },
  },
});

export const { getList, deleteUser, updateUser, addStudy } = studySlice.actions;

export default studySlice.reducer;
