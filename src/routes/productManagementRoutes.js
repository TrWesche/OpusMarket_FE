import ProductManagementHome from "../components/Product/ProductManagementHome";
import ViewProductConfiguration from "../components/Product/ViewProductConfiguration";
import UpdateProductConfiguration from "../components/Product/UpdateProductConfiguration";
import ProductConfigurationWizard from "../components/Product/ProductConfigurationWizard";

import {
    PRODUCT_MANAGEMENT_HOME_PATH, 
    PRODUCT_MANAGEMENT_NEW_PRODUCT_PATH, 
    PRODUCT_MANAGEMENT_VIEW_PRODUCT_PATH, 
    PRODUCT_MANAGEMENT_UPDATE_PRODUCT_PATH } from './_pathDict';

const ProductManagementRoutes = [
    {
        'component': ProductManagementHome,
        'path': PRODUCT_MANAGEMENT_HOME_PATH,
        'exact': true
    },
    {
        'component': ProductConfigurationWizard,
        'path': PRODUCT_MANAGEMENT_NEW_PRODUCT_PATH,
        'exact': true
    },
    {
        'component': ViewProductConfiguration,
        'path': PRODUCT_MANAGEMENT_VIEW_PRODUCT_PATH,
        'exact': true
    },
    {
        'component': UpdateProductConfiguration,
        'path': PRODUCT_MANAGEMENT_UPDATE_PRODUCT_PATH,
        'exact': true
    }
];

export default ProductManagementRoutes;