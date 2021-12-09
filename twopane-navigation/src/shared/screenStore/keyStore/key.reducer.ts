import {
    paneType,
} from '../../../utilities/interfaces';
import { IKeyState, IKeyAction, IKeyObject } from './key.interface';
import _ from 'lodash';
import { PUSH_KEY, POP_KEY, MOVE_TO_FRONT_KEY, REMOVE_KEY, CHANGE_SCREEN_KEY, POP_TO_FRONT_KEY } from './key.types';

const initialState: IKeyState = {
    keys: []
}

const keyReducers = (
    state: IKeyState = initialState,
    action: IKeyAction
): IKeyState => {
    switch (action.type) {
        case PUSH_KEY: {
            const newObject: IKeyObject = {
                key: `${action.payload.screen}_${action.payload.key}`,
                isMerge: action.payload.isMerge,
                screen: action.payload.screen,
                extensionOptions: action.payload.extensionOptions
            }
            return {
                ...state, //state retains state for all variables
                keys: [...state.keys, newObject]
            };
        }
        case POP_TO_FRONT_KEY: {
            const onePaneState = state.keys.filter(x => x.screen === paneType.ONE);
            const twoPaneState = state.keys.filter(x => x.screen === paneType.TWO);

            if (action.payload.screen === paneType.ONE) {
                return {
                    ...state, //state retains state for all variables
                    keys: [onePaneState[0], ...twoPaneState]
                };
            };

            return {
                ...state, //state retains state for all variables
                keys: [...onePaneState, twoPaneState[0]]
            };
        }
        case POP_KEY: {
            const newKeys = state.keys;
            const keyIndexToRemove = newKeys.findIndex(x => x.key === action.payload.key);
            newKeys.splice(keyIndexToRemove, 1);

            return {
                ...state,
                keys: newKeys
            };
        }
        case MOVE_TO_FRONT_KEY: {
            //TODO: REMOVE LODASH AND CREATE OUR OWN
            const onePaneState = state.keys.filter(x => x.screen === paneType.ONE);
            const twoPaneState = state.keys.filter(x => x.screen === paneType.TWO);

            if (action.payload.screen === paneType.ONE) {
                const sorted = _.sortBy(onePaneState, function (item) {
                    return item.key === `${action.payload.key}` ? 1 : 0;
                });

                return {
                    ...state, //retains state for all variables
                    keys: [...sorted, ...twoPaneState]
                };
            };

            const sorted = _.sortBy(twoPaneState, function (item) {
                return item.key === `${action.payload.key}` ? 1 : 0;
            });

            return {
                ...state, //retains state for all variables
                keys: [...onePaneState, ...sorted]
            };
        }
        case CHANGE_SCREEN_KEY: {
            return {
                ...state, //retains state for all variables
                keys: updateObjectInArray(state.keys, action)
            };
        }
        default:
            return state;
    }
};

function updateObjectInArray(keys: IKeyObject[], action: IKeyAction) {
    return keys.map((item) => {
        if (item.key !== action.payload.key) {
            // This isn't the item we care about - keep it as-is
            return item
        }
        const updatedItem: IKeyObject = {
            key: item.key,
            isMerge: item.isMerge,
            screen: action.payload.screen,
            extensionOptions: item.extensionOptions
        }

        // Otherwise, this is the one we want - return an updated value
        return {
            ...item,
            ...updatedItem
        }
    })
}

export default keyReducers;