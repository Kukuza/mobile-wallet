
import { combineReducers } from "redux";
import profileReducer from "../store/Profile";
import authReducer from "../store/Auth";
import walletReducer from "../store/Wallet"

const rootReducer = combineReducers ({
    profile: profileReducer,
    auth: authReducer,
    wallet: walletReducer
});

export default rootReducer;