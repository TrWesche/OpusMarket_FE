import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import catalogReducer from "./catalogReducer";

const rootReducer = combineReducers({ cartReducer, catalogReducer });

export default rootReducer;