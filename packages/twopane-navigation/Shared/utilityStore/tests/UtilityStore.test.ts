import { IUtilityStoreState } from "../utilityStore.interfaces"
import { store } from "../../../appStore"
import { isDualScreenAction } from "../utilityStore.actions"

describe('utilityStore reducer tests', () => {

    it('is DualScreen', () => {
        // Arrange
        const expectedState: IUtilityStoreState = {
            isDualScreen: true
        }

        // Act
        store.dispatch(isDualScreenAction(true));
        const data = store.getState().utilityStoreReducer;

        // Assert
        expect(data).toStrictEqual(expectedState)
    })

    it('is DualScreen false', () => {
        // Arrange
        const expectedState: IUtilityStoreState = {
            isDualScreen: false
        }

        // Act
        store.dispatch(isDualScreenAction(false));
        const data = store.getState().utilityStoreReducer;

        // Assert
        expect(data).toStrictEqual(expectedState)
    })
})