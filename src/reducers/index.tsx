
import { combineReducers } from "redux";
import profileReducer from "../store/Profile";
import authReducer from "../store/Auth";
import currencyReducer  from "../store/Currency";


const rootReducer = combineReducers ({
    profile: profileReducer,
    auth: authReducer,
    currency:currencyReducer
});

export default rootReducer;