import { store } from "../../appStore";
import { isTwoPaneAction, pushConfigAction } from "./utilityStore.actions";
import { IConfigComponent } from "../../utilities/interfaces";

const isTwoPane = (isTwoPane: boolean) => {
    store.dispatch(isTwoPaneAction(isTwoPane));
};

const pushConfig = (config: IConfigComponent) => {
    store.dispatch(pushConfigAction(config));
};


const _UtilityFunctions = {
    isTwoPane,
    pushConfig
};

type utilityFunctions = typeof _UtilityFunctions;

const utilityStore: utilityFunctions = _UtilityFunctions;

export default utilityStore;
