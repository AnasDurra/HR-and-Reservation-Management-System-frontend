import { all } from 'redux-saga/effects';
import UserSaga from './user/saga';
import DepartmentsSaga from './departments/saga';
import JobVacanciesSaga from './jobVacancies/saga';
import RolesSaga from './roles/saga';
import jobApplicationsSaga from './Features/Employee Profile/Job application/saga';

export default function* rootSaga() {
    yield all([
        UserSaga(),
        DepartmentsSaga(),
        JobVacanciesSaga(),
        RolesSaga(),
        jobApplicationsSaga()
    ]);
}