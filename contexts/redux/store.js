import { combineReducers, compose, legacy_createStore } from "redux";
import { userReducer } from "./ReduxRedusers";

const reducer = combineReducers({
    user_list: userReducer
    })

const store = legacy_createStore(reducer)

export default store