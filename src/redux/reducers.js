import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import jobVacanciesReducer from "./jobVacancies/reducer";
import rolesSlice from "./roles/slice";
import jobApplicationsReducer from "./Features/Employee Profile/Job application/slice";
import departmentsSlice from "./departments/slice";
import shiftsReducer from "./shifts/reducer";
import biometricDevicesReducer from "./biometricDevices/reducer";
import timeSheetReducer from "./timeSheet/reducer";
import holidaysReducer from "./holidays/reducer";

export default {
  userReducer: userReducer,
  departmentsSlice: departmentsSlice,
  jobVacanciesReducer: jobVacanciesReducer,
  rolesSlice: rolesSlice,
  jobApplicationsSlice: jobApplicationsReducer,
  shiftsReducer: shiftsReducer,
  biometricDevicesReducer: biometricDevicesReducer,
  timeSheetReducer: timeSheetReducer,
  holidaysReducer: holidaysReducer,
};
