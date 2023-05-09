import { all } from 'redux-saga/effects';
import UserSaga from './user/saga';
import DepartmentsSaga from './departments/saga';

export default function* rootSaga() {
    yield all([
        UserSaga(),
        DepartmentsSaga(),
    ]);
}