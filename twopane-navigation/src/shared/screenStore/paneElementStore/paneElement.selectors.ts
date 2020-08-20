import { useSelector } from "react-redux";
import { rootReducerType } from "../../../appStore";
import { IPaneElementState} from "./paneElement.interface";

export const getPaneElementSelector = (): IPaneElementState => {
    return useSelector((state: rootReducerType) => state.PaneElementReducer);
};
