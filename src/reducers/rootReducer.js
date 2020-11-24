import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import productCatalog from "./productCatalog";
import productDetail from "./productDetail";

const rootReducer = combineReducers({ cartReducer, productCatalog, productDetail });

export default rootReducer;