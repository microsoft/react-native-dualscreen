import {
    screenType,
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
                screen: action.payload.screen
            }
            return {
                ...state, //state retains state for all variables
                keys: [...state.keys, newObject]
            };
        }
        case POP_TO_FRONT_KEY: {
            const singleScreenState = state.keys.filter(x => x.screen === screenType.SINGLE);
            const dualScreenState = state.keys.filter(x => x.screen === screenType.DUAL);

            if (action.payload.screen === screenType.SINGLE) {
                return {
                    ...state, //state retains state for all variables
                    keys: [singleScreenState[0], ...dualScreenState]
                };
            };

            return {
                ...state, //state retains state for all variables
                keys: [...singleScreenState, dualScreenState[0]]
            };
        }
        case POP_KEY: {
            const singleScreenState = state.keys.filter(x => x.screen === screenType.SINGLE);
            const dualScreenState = state.keys.filter(x => x.screen === screenType.DUAL);

            if (action.payload.screen === screenType.SINGLE) {
                singleScreenState.pop();
            } else {
                dualScreenState.pop();
            }

            return {
                ...state,
                keys: [...singleScreenState, ...dualScreenState]
            };
        }
        case MOVE_TO_FRONT_KEY: {
            //TODO: REMOVE LODASH AND CREATE OUR OWN
            const singleScreenState = state.keys.filter(x => x.screen === screenType.SINGLE);
            const dualScreenState = state.keys.filter(x => x.screen === screenType.DUAL);

            if (action.payload.screen === screenType.SINGLE) {
                const sorted = _.sortBy(singleScreenState, function (item) {
                    return item.key === `${action.payload.key}` ? 1 : 0;
                });

                return {
                    ...state, //retains state for all variables
                    keys: [...sorted, ...dualScreenState]
                };
            };

            const sorted = _.sortBy(dualScreenState, function (item) {
                return item.key === `${action.payload.key}` ? 1 : 0;
            });

            return {
                ...state, //retains state for all variables
                keys: [...singleScreenState, ...sorted]
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
            screen: action.payload.screen
        }

        // Otherwise, this is the one we want - return an updated value
        return {
            ...item,
            ...updatedItem
        }
    })
}

export default keyReducers;