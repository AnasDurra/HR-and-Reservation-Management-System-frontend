import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import departmentsReducer from "./departments/reducer";
import jobVacanciesReducer from "./jobVacancies/reducer";
import rolesReducer from "./roles/reducer";
import shiftsReducer from "./shifts/reducer";
import biometricDevicesReducer from "./biometricDevices/reducer";
import timeSheetReducer from "./timeSheet/reducer";

export default {
    userReducer: userReducer,
    departmentsReducer: departmentsReducer,
    jobVacanciesReducer: jobVacanciesReducer,
    rolesReducer: rolesReducer,
    shiftsReducer: shiftsReducer,
    biometricDevicesReducer: biometricDevicesReducer,
    timeSheetReducer: timeSheetReducer,
};