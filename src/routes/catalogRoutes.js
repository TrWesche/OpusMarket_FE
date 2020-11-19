import CatalogHome from "../components/Catalog/CatalogHome";
import ProductDetail from "../components/Product/ProductDetail";

import {
    CATALOG_BROWSE_PATH, 
    CATALOG_PRODUCT_PATH } from './_pathDict';

const CatalogRoutes = [
    {
        'component': CatalogHome,
        'path': CATALOG_BROWSE_PATH,
        'exact': true
    },
    {
        'component': ProductDetail,
        'path': CATALOG_PRODUCT_PATH,
        'exact': false
    }
];

export default CatalogRoutes;