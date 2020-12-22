import MerchantHome from "../components/Merchant/MerchantHome";
import MerchantBrowse from "../components/Merchant/MerchantBrowse";

import {
    MERCHANT_HOMEPAGE_PATH,
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
    }
];

export default MerchantRoutes;