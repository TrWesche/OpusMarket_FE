import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import productCatalog from "./productCatalog";
import productDetail from "./productDetail";
import orderReducer from "./orderReducer";
import merchantDetails from "./merchantDetails";

const rootReducer = combineReducers({ cartReducer, productCatalog, productDetail, orderReducer, merchantDetails });

export default rootReducer;