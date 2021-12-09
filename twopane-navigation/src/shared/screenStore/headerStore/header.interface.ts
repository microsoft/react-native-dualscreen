import { StyleProp, ViewStyle } from "react-native";
import react, { ReactElement } from "react";

export interface IHeader {
    title?: string;
    IconPress?: () => void;
    style?: StyleProp<ViewStyle>; //expand this out
    leftIcon?: ReactElement;
    canGoBack?: boolean;
    buttonAccessibilityLabel?: string;
}

export interface IHeaderObject {
    [key: string]: IHeader;
}

export interface IHeaderState {
    headers: IHeaderObject;
}

export interface IHeaderAction {
    type: string;
    payload: {
        key: string
        header: IHeader;
    };
}
