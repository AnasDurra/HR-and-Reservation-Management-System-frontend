import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import jobVacanciesReducer from "./jobVacancies/reducer";
import rolesReducer from "./roles/reducer";
import jobApplicationsReducer from "./Features/Employee Profile/Job application/slice";
import departmentsSlice from "./departments/slice";
import shiftsReducer from "./shifts/reducer";
import biometricDevicesReducer from "./biometricDevices/reducer";
import timeSheetReducer from "./timeSheet/reducer";
import holidaysReducer from "./holidays/reducer";
import vacationsReducer from "./vacations/reducer";

export default {
  userReducer: userReducer,
  departmentsSlice: departmentsSlice,
  jobVacanciesReducer: jobVacanciesReducer,
  rolesReducer: rolesReducer,
  jobApplicationsSlice: jobApplicationsReducer,
  shiftsReducer: shiftsReducer,
  biometricDevicesReducer: biometricDevicesReducer,
  timeSheetReducer: timeSheetReducer,
  holidaysReducer: holidaysReducer,
  vacationsReducer: vacationsReducer,
};
