import { all } from "redux-saga/effects";
import UserSaga from "./user/saga";
import DepartmentsSaga from "./departments/saga";
import JobVacanciesSaga from "./jobVacancies/saga";
import RolesSaga from "./roles/saga";
import ShiftsSaga from "./shifts/saga";
import BiometricDevicesSaga from "./biometricDevices/saga";
import TimeSheetSaga from "./timeSheet/saga";
import HolidaysSaga from "./holidays/saga";
import jobApplicationsSaga from "./Features/Employee Profile/Job application/saga";
import employeesSaga from "./Features/Employee Profile/Employee/saga";
import VacationsSaga from "./vacations/saga";
import EmployeesAbsencesSaga from "./absences/saga";
import TimeShiftsSaga from "./timeShifts/saga";
import logSaga from "./Features/Log/saga";
import ConsultantsSaga from "./consultants/saga";
import ClinicsSaga from "./clinics/saga";
import CustomersSaga from "./customers/saga";
import CenterEventsSaga from "./centerEvents/saga";


export default function* rootSaga() {
  yield all([
    UserSaga(),
    DepartmentsSaga(),
    JobVacanciesSaga(),
    RolesSaga(),
    ShiftsSaga(),
    BiometricDevicesSaga(),
    TimeSheetSaga(),
    HolidaysSaga(),
    jobApplicationsSaga(),
    employeesSaga(),
    VacationsSaga(),
    EmployeesAbsencesSaga(),
    TimeShiftsSaga(),
    logSaga(),
    ConsultantsSaga(),
    ClinicsSaga(),
    CustomersSaga(),
    CenterEventsSaga(),
  ]);
}
