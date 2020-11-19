import CartHome from "../components/Purchase/CartHome";
import SquarePurchase from "../components/Purchase/SquarePurchase";
import {VIEW_CART_PATH, BUY_CART_PATH} from "./_pathDict";


const PurchaseRoutes = [
    {
        'component': CartHome,
        'path': VIEW_CART_PATH,
        'exact': true
    },
    {
        'component': SquarePurchase,
        'path': BUY_CART_PATH,
        'exact': false
    }
];

export default PurchaseRoutes;


// https://developer.squareup.com/blog/online-payments-form-react/

// https://github.com/square/react-square-payment-form