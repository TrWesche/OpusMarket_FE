import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import productCatalog from "./productCatalog";
import productDetail from "./productDetail";
import orderReducer from "./orderReducer";
import merchantDetails from "./merchantDetails";
import merchantBrowse from "./merchantBrowse";
import currentUser from "./currentUser";
import gatheringReducer from "./gatheringReducer";

const rootReducer = combineReducers({ 
    cartReducer, 
    productCatalog, 
    productDetail, 
    orderReducer, 
    merchantBrowse,
    merchantDetails,
    currentUser,
    gatheringReducer });

export default rootReducer;