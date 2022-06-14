
import { combineReducers } from "redux";
import profileReducer from "../store/Profile";
import authReducer from "../store/Auth";

const rootReducer = combineReducers ({
    profile: profileReducer,
    auth: authReducer
});

export default rootReducer;