import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import jobVacanciesReducer from './jobVacancies/reducer';
import rolesSlice from './roles/slice';
import jobApplicationsReducer from './Features/Employee Profile/Job application/slice';
import departmentsSlice from './departments/slice';
import shiftsReducer from './shifts/reducer';
import biometricDevicesReducer from './biometricDevices/reducer';
import timeSheetReducer from './timeSheet/reducer';
import holidaysReducer from './holidays/reducer';
import employeesSlice from './Features/Employee Profile/Employee/slice';
import vacationsReducer from './vacations/reducer';
import employeesAbsencesReducer from './absences/reducer';
import timeShiftsReducer from './timeShifts/reducer';
import logSlice from './Features/Log/slice';
import { consultantTimeScheduleSlice } from './Features/Appointments Management/Consultant Time Schedules/slice';

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
  employeesSlice: employeesSlice,
  vacationsReducer: vacationsReducer,
  employeesAbsencesReducer: employeesAbsencesReducer,
  timeShiftsReducer: timeShiftsReducer,
  logSlice: logSlice,
  consultantTimeScheduleSlice: consultantTimeScheduleSlice,
};
