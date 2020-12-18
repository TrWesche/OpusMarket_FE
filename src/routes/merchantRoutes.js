import MerchantHome from "../components/Merchant/MerchantHome";
import MerchantEvents from "../components/Merchant/MerchantEvents";
import MerchantBrowse from "../components/Merchant/MerchantBrowse";

import {
    MERCHANT_HOMEPAGE_PATH,
    MERCHANT_EVENTS_PATH,
    MERCHANTS_BROWSE_PATH} from './_pathDict';

const MerchantRoutes = [
    {
        'component': MerchantHome,
        'path': MERCHANT_HOMEPAGE_PATH,
        'exact': true
    },
    {
        'component': MerchantBrowse,
        'path': MERCHANTS_BROWSE_PATH,
        'exact': false
    },
    {
        'component': MerchantEvents,
        'path': MERCHANT_EVENTS_PATH,
        'exact': false
    }
];

export default MerchantRoutes;