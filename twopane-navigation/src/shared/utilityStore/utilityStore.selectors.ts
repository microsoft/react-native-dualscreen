import { rootReducerType } from "../../appStore";
import { useSelector } from "react-redux";
import { IUtilityStoreState } from "./utilityStore.interfaces";

export const getUtilityStore = (): IUtilityStoreState => {
    return useSelector((state: rootReducerType) => state.utilityStoreReducer);
};