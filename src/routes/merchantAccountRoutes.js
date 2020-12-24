import MerchantLoginForm from "../components/Merchant/MerchantLoginForm";
import NewMerchantForm from "../components/Merchant/NewMerchantForm";
import MerchantProfile from "../components/Merchant/MerchantProfile";
import UpdateMerchantForm from "../components/Merchant/Forms/UpdateMerchantForm";
import UpdateMerchantPasswordForm from "../components/Merchant/Forms/UpdateMerchantPasswordForm";
import UpdateMerchantAboutForm from "../components/Merchant/Forms/UpdateMerchantAboutForm";

import {
    MERCHANT_ACCOUNT_LOGIN_PATH, 
    MERCHANT_ACCOUNT_NEW_PATH, 
    MERCHANT_ACCOUNT_PROFILE_PATH, 
    MERCHANT_ACCOUNT_UPDATE_PROFILE_PATH, 
    MERCHANT_ACCOUNT_UPDATE_PASSWORD_PATH,
    MERCHANT_ACCOUNT_UPDATE_ABOUT_PATH  
} from './_pathDict';

const MerchantAccountRoutes = [
    {
        'component': MerchantLoginForm,
        'path': MERCHANT_ACCOUNT_LOGIN_PATH,
        'exact': true
    },
    {
        'component': NewMerchantForm,
        'path': MERCHANT_ACCOUNT_NEW_PATH,
        'exact': true
    },
    {
        'component': MerchantProfile,
        'path': MERCHANT_ACCOUNT_PROFILE_PATH,
        'exact': true
    },
    {
        'component': UpdateMerchantForm,
        'path': MERCHANT_ACCOUNT_UPDATE_PROFILE_PATH,
        'exact': true
    },
    {
        'component': UpdateMerchantPasswordForm,
        'path': MERCHANT_ACCOUNT_UPDATE_PASSWORD_PATH,
        'exact': true
    },
    {
        'component': UpdateMerchantAboutForm,
        'path': MERCHANT_ACCOUNT_UPDATE_ABOUT_PATH,
        'exact': true
    }
];

export default MerchantAccountRoutes;