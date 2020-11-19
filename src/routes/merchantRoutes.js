import MerchantHome from "../components/Merchant/MerchantHome";
import MerchantAbout from "../components/Merchant/MerchantAbout";
import MerchantStore from "../components/Merchant/MerchantStore";
import MerchantEvents from "../components/Merchant/MerchantEvents";


import {
    MERCHANT_HOMEPAGE_PATH,
    MERCHANT_ABOUT_PATH,
    MERCHANT_STORE_PATH,
    MERCHANT_EVENTS_PATH} from './_pathDict';

const MerchantRoutes = [
    {
        'component': MerchantHome,
        'path': MERCHANT_HOMEPAGE_PATH,
        'exact': true
    },
    {
        'component': MerchantAbout,
        'path': MERCHANT_ABOUT_PATH,
        'exact': false
    },
    {
        'component': MerchantStore,
        'path': MERCHANT_STORE_PATH,
        'exact': false
    },
    {
        'component': MerchantEvents,
        'path': MERCHANT_EVENTS_PATH,
        'exact': false
    }
];

export default MerchantRoutes;