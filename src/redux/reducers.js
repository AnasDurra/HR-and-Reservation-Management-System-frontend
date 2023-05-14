import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import departmentsReducer from "./departments/reducer";
import jobVacanciesReducer from "./jobVacancies/reducer";

export default combineReducers({
    userReducer: userReducer,
    departmentsReducer: departmentsReducer,
    jobVacanciesReducer: jobVacanciesReducer,
});