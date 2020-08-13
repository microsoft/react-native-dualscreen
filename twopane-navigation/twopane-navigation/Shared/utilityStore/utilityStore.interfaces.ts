export interface IUtilityStoreState {
    isDualScreen: boolean;
}

export interface IUtilityStoreAction {
    type: string;
    payload: {
        isDualScreen: boolean;
    };
}
