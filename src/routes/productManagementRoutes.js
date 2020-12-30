import ProductManagementHome from "../components/Product/ProductManagementHome";
import ProductConfigurationWizard from "../components/Product/ProductConfigurationWizard";

import {
    PRODUCT_MANAGEMENT_HOME_PATH, 
    PRODUCT_MANAGEMENT_NEW_PRODUCT_PATH
} from './_pathDict';

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
    }
];

export default ProductManagementRoutes;