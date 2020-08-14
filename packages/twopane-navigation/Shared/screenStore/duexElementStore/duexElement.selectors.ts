import { useSelector } from "react-redux";
import { rootReducerType } from "../../../appStore";
import { IDuexElementState } from "./duexElement.interface";

export const getDuexElementSelector = (): IDuexElementState => {
    return useSelector((state: rootReducerType) => state.duexElementReducer);
};
