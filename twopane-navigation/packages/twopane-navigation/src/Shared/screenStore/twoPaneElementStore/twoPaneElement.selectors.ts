import { useSelector } from "react-redux";
import { rootReducerType } from "../../../appStore";
import { ITwoPaneElementState } from "./twoPaneElement.interface";

export const getTwoPaneElementSelector = (): ITwoPaneElementState => {
    return useSelector((state: rootReducerType) => state.twoPaneElementReducer);
};
