import { useSelector } from "react-redux";
import { rootReducerType } from "../../../appStore";
import { IHeaderState } from "./header.interface";

export const getHeaderSelector = (): IHeaderState => {
    return useSelector((state: rootReducerType) => state.headerReducer);
};
