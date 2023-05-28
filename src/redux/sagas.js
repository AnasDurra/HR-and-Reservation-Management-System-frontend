import { all } from 'redux-saga/effects';
import UserSaga from './user/saga';
import DepartmentsSaga from './departments/saga';
import JobVacanciesSaga from './jobVacancies/saga';
import RolesSaga from './roles/saga';
import ShiftsSaga from './shifts/saga';
import BiometricDevicesSaga from './biometricDevices/saga';

export default function* rootSaga() {
    yield all([
        UserSaga(),
        DepartmentsSaga(),
        JobVacanciesSaga(),
        RolesSaga(),
        ShiftsSaga(),
        BiometricDevicesSaga(),
    ]);
}