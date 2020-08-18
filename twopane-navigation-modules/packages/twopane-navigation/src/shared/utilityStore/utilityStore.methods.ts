import { store } from "../../appStore";
import { isTwoPaneAction } from "./utilityStore.actions";

const isTwoPane = (isTwoPane: boolean) => {
    store.dispatch(isTwoPaneAction(isTwoPane));
};

const _UtilityFunctions = {
    isTwoPane,
};

type utilityFunctions = typeof _UtilityFunctions;

const utilityStore: utilityFunctions = _UtilityFunctions;

export default utilityStore;
