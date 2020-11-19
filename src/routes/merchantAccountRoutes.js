import MerchantLoginForm from "../components/Merchant/MerchantLoginForm";
import NewMerchantForm from "../components/Merchant/NewMerchantForm";
import MerchantProfile from "../components/Merchant/MerchantProfile";
import UpdateMerchantForm from "../components/Merchant/UpdateMerchantForm";
import UpdateMerchantPasswordForm from "../components/Merchant/UpdateMerchantPasswordForm";

import {
    MERCHANT_ACCOUNT_LOGIN_PATH, 
    MERCHANT_ACCOUNT_NEW_PATH, 
    MERCHANT_ACCOUNT_PROFILE_PATH, 
    MERCHANT_ACCOUNT_UPDATE_PROFILE_PATH, 
    MERCHANT_ACCOUNT_UPDATE_PASSWORD_PATH  } from './_pathDict';

const MerchantAccountRoutes = [
    {
        'component': MerchantLoginForm,
        'path': MERCHANT_ACCOUNT_LOGIN_PATH,
        'exact': true
    },
    {
        'component': NewMerchantForm,
        'path': MERCHANT_ACCOUNT_NEW_PATH,
        'exact': false
    },
    {
        'component': MerchantProfile,
        'path': MERCHANT_ACCOUNT_PROFILE_PATH,
        'exact': false
    },
    {
        'component': UpdateMerchantForm,
        'path': MERCHANT_ACCOUNT_UPDATE_PROFILE_PATH,
        'exact': false
    },
    {
        'component': UpdateMerchantPasswordForm,
        'path': MERCHANT_ACCOUNT_UPDATE_PASSWORD_PATH,
        'exact': false
    }
];

export default MerchantAccountRoutes;