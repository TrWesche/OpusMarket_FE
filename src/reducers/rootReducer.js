import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import productCatalog from "./productCatalog";
import productDetail from "./productDetail";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({ cartReducer, productCatalog, productDetail, orderReducer });

export default rootReducer;