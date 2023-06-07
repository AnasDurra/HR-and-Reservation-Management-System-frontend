import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import jobVacanciesReducer from "./jobVacancies/reducer";
import rolesReducer from "./roles/reducer";
import jobApplicationsReducer from "./Features/Employee Profile/Job application/slice";
import departmentsSlice from "./departments/slice";
export default {
  userReducer: userReducer,
  departmentsSlice: departmentsSlice,
  jobVacanciesReducer: jobVacanciesReducer,
  rolesReducer: rolesReducer,
  jobApplicationsSlice: jobApplicationsReducer,
};
