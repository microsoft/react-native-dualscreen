export interface IUtilityStoreState {
    isTwoPane: boolean;
}

export interface IUtilityStoreAction {
    type: string;
    payload: {
        isTwoPane: boolean;
    };
}
