import { store } from "../../appStore";
import { isTwoPaneAction, pushConfigAction, pushPaneRectsActions } from "./utilityStore.actions";
import { IConfigComponent } from "../../utilities/interfaces";
import { WindowRect } from "react-native-dualscreeninfo";

const pushPaneRects = (paneRects: WindowRect[]) => {
    const _paneRects = store.getState().utilityStoreReducer.paneRects
    if(_paneRects.length < 2)
    {
        store.dispatch(pushPaneRectsActions(paneRects));
    }
};

const isTwoPane = (isTwoPane: boolean) => {
    store.dispatch(isTwoPaneAction(isTwoPane));
};

const pushConfig = (config: IConfigComponent) => {
    store.dispatch(pushConfigAction(config));
};


const _UtilityFunctions = {
    pushPaneRects,
    isTwoPane,
    pushConfig
};

type utilityFunctions = typeof _UtilityFunctions;

const utilityStore: utilityFunctions = _UtilityFunctions;

export default utilityStore;
