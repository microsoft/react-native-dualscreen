import { IExtensionOptions, paneType } from "../../../utilities/interfaces";
import { IKeyAction, IScreenOnlyAction, IKeyScreenAction } from "./key.interface";
import { PUSH_KEY, POP_KEY, MOVE_TO_FRONT_KEY, REMOVE_KEY, CHANGE_SCREEN_KEY, POP_TO_FRONT_KEY } from "./key.types";

export const pushKey = (
    screen: paneType,
    key: string,
    isMerge: boolean,
    extensionOptions?: IExtensionOptions
): IKeyAction => ({
    type: PUSH_KEY,
    payload: {
        screen: screen,
        key: key,
        isMerge: isMerge,
        extensionOptions
    }
});

/**
 * Removes all elements of the stack and returns element in index 0
 */
export const popToFront = (screen: paneType): IScreenOnlyAction => ({
    type: POP_TO_FRONT_KEY,
    payload: {
        screen: screen
    }
});


/**
 * Go back one element in the stack
 */
export const popScreen = (screen: paneType): IScreenOnlyAction => ({
    type: POP_KEY,
    payload: {
        screen: screen
    }
});

export const moveToFront = (screen: paneType,
    key: string
): IKeyScreenAction => ({
    type: MOVE_TO_FRONT_KEY,
    payload: {
        screen: screen,
        key: key
    }
});

export const changeScreen = (screen: paneType,
    key: string
): IKeyScreenAction => ({
    type: CHANGE_SCREEN_KEY,
    payload: {
        screen: screen,
        key: key
    }
});


