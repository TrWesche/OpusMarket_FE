import GatheringManagementHome from "../components/Gathering/GatheringManagementHome";
import NewGatheringConfiguration from "../components/Gathering/NewGatheringConfiguration";
import ViewGatheringConfiguration from "../components/Gathering/ViewGatheringConfiguration";
import UpdateGatheringConfiguration from "../components/Gathering/UpdateGatheringConfiguration";

import { 
    GATHERING_MANAGEMENT_HOME_PATH, 
    GATHERING_MANAGEMENT_NEW_PATH, 
    GATHERING_MANAGEMENT_UPDATE_PATH, 
    GATHERING_MANAGEMENT_VIEW_PATH } from './_pathDict';

const GatheringManagementRoutes = [
    {
        'component': GatheringManagementHome,
        'path': GATHERING_MANAGEMENT_HOME_PATH,
        'exact': true
    },
    {
        'component': NewGatheringConfiguration,
        'path': GATHERING_MANAGEMENT_NEW_PATH,
        'exact': false
    },
    {
        'component': ViewGatheringConfiguration,
        'path': GATHERING_MANAGEMENT_VIEW_PATH,
        'exact': false
    },
    {
        'component': UpdateGatheringConfiguration,
        'path': GATHERING_MANAGEMENT_UPDATE_PATH,
        'exact': false
    }
];

export default GatheringManagementRoutes;