import { all } from 'redux-saga/effects';
import UserSaga from './user/saga';
import DepartmentsSaga from './departments/saga';
import JobVacanciesSaga from './jobVacancies/saga';
import RolesSaga from './roles/saga';
import ShiftsSaga from './shifts/saga';
import BiometricDevicesSaga from './biometricDevices/saga';
import TimeSheetSaga from './timeSheet/saga';
import HolidaysSaga from './holidays/saga';
import jobApplicationsSaga from './Features/Employee Profile/Job application/saga';
import VacationsSaga from './vacations/saga';
import EmployeesAbsencesSaga from './absences/saga';
import TimeShiftsSaga from './timeShifts/saga';

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
        VacationsSaga(),
        EmployeesAbsencesSaga(),
        TimeShiftsSaga(),
    ]);
}