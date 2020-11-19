import OrderDetails from "../components/Order/OrderDetails";
import OrderHome from "../components/Order/OrderHome";

import {
    ORDER_DETAILS_PATH, 
    ORDER_HISTORY_PATH } from './_pathDict';

const OrderRoutes = [
    {
        'component': OrderDetails,
        'path': ORDER_DETAILS_PATH,
        'exact': true
    },
    {
        'component': OrderHome,
        'path': ORDER_HISTORY_PATH,
        'exact': false
    }
];

export default OrderRoutes;