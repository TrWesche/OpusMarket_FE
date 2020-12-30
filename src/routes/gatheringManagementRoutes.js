import GatheringManagementHome from "../components/Gathering/GatheringManagementHome";
import NewGatheringConfiguration from "../components/Gathering/NewGatheringConfiguration";

import { 
    GATHERING_MANAGEMENT_HOME_PATH, 
    GATHERING_MANAGEMENT_NEW_PATH
} from './_pathDict';

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
    }
];

export default GatheringManagementRoutes;