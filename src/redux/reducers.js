import { combineReducers } from "redux";
import userReducer from "./user/reducer";
import departmentsReducer from "./departments/reducer";

export default combineReducers({
    userReducer: userReducer,
    departmentsReducer: departmentsReducer,
});