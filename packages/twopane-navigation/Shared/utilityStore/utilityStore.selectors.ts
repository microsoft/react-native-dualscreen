import { rootReducerType } from "../../appStore";
import { useSelector } from "react-redux";
import { IUtilityStoreState } from "./utilityStore.interfaces";

export const getIsDualScreen = (): IUtilityStoreState => {
    return useSelector((state: rootReducerType) => state.utilityStoreReducer);
};