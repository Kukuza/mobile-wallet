
import { combineReducers } from "redux";
import profileReducer from "../store/Profile";
import authReducer from "../store/Auth";
import currencyReducer  from "../store/Currency";
import walletReducer from "../store/Wallet"
const rootReducer = combineReducers ({
    profile: profileReducer,
    auth: authReducer,
    currency:currencyReducer,
    wallet: walletReducer
});

export default rootReducer;