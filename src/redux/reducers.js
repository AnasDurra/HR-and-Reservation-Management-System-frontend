import userReducer from './user/reducer';
import consultantsReducer from './consultants/reducer';
import clinicsReducer from './clinics/reducer';
import customersReducer from './customers/reducer';
import eventsReducer from './centerEvents/reducer';
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
import consultantTimeScheduleSlice from './Features/Appointments Management/Consultant Time Schedules/slice';
import consultingAppointmentsSlice from './Features/Appointments Management/Consulting Appointements/slice';
import dashboardSlice from './Dashboard/slice';

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
  consultantsReducer: consultantsReducer,
  clinicsReducer: clinicsReducer,
  customersReducer: customersReducer,
  eventsReducer: eventsReducer,
  consultantTimeScheduleSlice: consultantTimeScheduleSlice,
  consultingAppointmentsSlice: consultingAppointmentsSlice,
  dashboardSlice: dashboardSlice,
};
