import { all, fork, takeEvery, call, put } from "redux-saga/effects";
import AxiosInstance from "../utils/axiosInstance";
import { getEventsSuccess, getEventsFailed } from "./reducer";
import { addEventSuccess, addEventFailed } from "./reducer";
import { deleteEventSuccess, deleteEventFailed } from "./reducer";
import { updateEventSuccess, updateEventFailed } from "./reducer";
import { getEventSuccess, getEventFailed } from "./reducer";
import { handleError } from '../utils/helpers';


const getEvents = (payload) => {
    const params = new URLSearchParams();

    if (payload?.name) {
        params.append('name', payload.name);
    }

    return AxiosInstance().get(`events?${params.toString()}`);
}

const getEvent = (payload) => {
    return AxiosInstance().get(`events/${payload.id}`);
}

const deleteEvent = (payload) => {
    return AxiosInstance().delete(`events/${payload.id}`, payload);
}

const updateEvent = (payload) => {
    return AxiosInstance().post(`events/${payload.id}`, payload.data);
}

const createEvent = (payload) => {
    return AxiosInstance().post('events', payload);
}


function* getEventsSaga({ payload }) {
    try {
        const response = yield call(getEvents, payload);
        yield put(getEventsSuccess(response.data));
    }
    catch (error) {
        yield put(getEventsFailed(error));
    }
}

function* getEventSaga({ payload }) {
    try {
        const response = yield call(getEvent, payload);
        yield put(getEventSuccess(response.data.data));
    }
    catch (error) {
        yield put(getEventFailed(error));
    }
}

function* deleteEventSaga({ payload }) {
    try {
        const response = yield call(deleteEvent, payload);
        yield put(deleteEventSuccess(response.data.data));
    }
    catch (error) {
        yield put(deleteEventFailed(error));
    }
}

function* updateEventSaga({ payload }) {
    try {
        const response = yield call(updateEvent, payload);
        payload.succeed();
        yield put(updateEventSuccess(response.data.data));
    }
    catch (error) {
        yield put(updateEventFailed(error));
    }
}

function* addEventSaga({ payload }) {
    try {
        const response = yield call(createEvent, payload.data);
        payload.succeed();
        yield put(addEventSuccess(response.data.data));
    }
    catch (error) {
        yield put(addEventFailed(error));
    }
}

function* watchGetEvents() {
    yield takeEvery('eventsReducer/getEvents', getEventsSaga);
}

function* watchGetEvent() {
    yield takeEvery('eventsReducer/getEvent', getEventSaga);
}

function* watchDeleteEvent() {
    yield takeEvery('eventsReducer/deleteEvent', deleteEventSaga);
}

function* watchUpdateEvent() {
    yield takeEvery('eventsReducer/updateEvent', updateEventSaga);
}

function* watchAddEvent() {
    yield takeEvery('eventsReducer/addEvent', addEventSaga);
}



function* CenterEventsSaga() {
    yield all([
        fork(watchGetEvents),
        fork(watchGetEvent),
        fork(watchDeleteEvent),
        fork(watchUpdateEvent),
        fork(watchAddEvent),
    ]);
}

export default CenterEventsSaga;