import { store } from "../../appStore";
import { isDualScreenAction } from "./utilityStore.actions";

const isDualScreen = (isDualScreen: boolean) => {
    store.dispatch(isDualScreenAction(isDualScreen));
};

const _UtilityFunctions = {
    isDualScreen,
};

type utilityFunctions = typeof _UtilityFunctions;

const utilityStore: utilityFunctions = _UtilityFunctions;

export default utilityStore;
