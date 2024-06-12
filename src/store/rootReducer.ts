import { combineReducers } from "redux";
import authReducer from "@/store/slices/auth";
import userReducer from "@/store/slices/user";
import studyReducer from "@/store/slices/studys";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  study:studyReducer

});

export default rootReducer;
