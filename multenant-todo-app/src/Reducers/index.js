import {combineReducers} from "redux"
import AuthReducer from "./AuthReducer"
import userReducer from "./UserReducer"

const rootReducer=combineReducers({
    auth:AuthReducer,
    user: userReducer
})

export default rootReducer