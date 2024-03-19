import { combineReducers } from "redux";
import authReducer from "@/store/slices/auth";
import userReducer from "@/store/slices/user";
import networkchartReducer from "@/store/slices/networkchart";

import tenantReducer from "@/store/slices/tenant";
import statisticReducer from "@/store/slices/statistic";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  networkchart: networkchartReducer,
  tenant: tenantReducer,
  statistic: statisticReducer,
});

export default rootReducer;
