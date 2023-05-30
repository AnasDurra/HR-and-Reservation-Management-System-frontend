import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import departmentsReducer from "./departments/reducer";
import jobVacanciesReducer from "./jobVacancies/reducer";
import rolesReducer from "./roles/reducer";
import jobApplicationsReducer from "./Features/Employee Profile/Job application/slice"
export default {
  userReducer: userReducer,
  departmentsReducer: departmentsReducer,
  jobVacanciesReducer: jobVacanciesReducer,
  rolesReducer: rolesReducer,
  jobApplicationsSlice:jobApplicationsReducer,
};
