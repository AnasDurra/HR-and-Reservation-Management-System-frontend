import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import departmentsReducer from "./departments/reducer";
import jobVacanciesReducer from "./jobVacancies/reducer";
import rolesReducer from "./roles/reducer";

export default {
    userReducer: userReducer,
    departmentsReducer: departmentsReducer,
    jobVacanciesReducer: jobVacanciesReducer,
    rolesReducer: rolesReducer,
};