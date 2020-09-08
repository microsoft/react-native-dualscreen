import { IUtilityStoreState } from "../utilityStore.interfaces"
import { store } from "../../../appStore"
import { isTwoPaneAction } from "../utilityStore.actions"

describe('utilityStore reducer tests', () => {

    it('is twoPane', () => {
        // Arrange
        const expectedState: IUtilityStoreState = {
            paneRects: [],
            isTwoPane: true,
            config: {}
        }

        // Act
        store.dispatch(isTwoPaneAction(true));
        const data = store.getState().utilityStoreReducer;

        // Assert
        expect(data).toStrictEqual(expectedState)
    })

    it('is twoPane false', () => {
        // Arrange
        const expectedState: IUtilityStoreState = {
            paneRects:[],
            isTwoPane: false,
            config: {}
        }

        // Act
        store.dispatch(isTwoPaneAction(false));
        const data = store.getState().utilityStoreReducer;

        // Assert
        expect(data).toStrictEqual(expectedState)
    })
})