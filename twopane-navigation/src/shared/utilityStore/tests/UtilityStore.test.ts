import { IUtilityStoreState } from "../utilityStore.interfaces"
import { resetApp, store } from "../../../appStore"
import { isTwoPaneAction, pushConfigAction, pushOrientationActions, pushPaneRectsActions } from "../utilityStore.actions"
import { DeviceOrientation } from "react-native-dualscreeninfo";

describe('utilityStore reducer tests', () => {
    afterEach(() => {
        store.dispatch(resetApp())
    });

    it('is twoPane', () => {
        // Arrange
        const expectedState: IUtilityStoreState = {
            paneRects: [],
            orientation: DeviceOrientation.Portrait,
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
            orientation: DeviceOrientation.Portrait,
            isTwoPane: false,
            config: {}
        }

        // Act
        store.dispatch(isTwoPaneAction(false));
        const data = store.getState().utilityStoreReducer;

        // Assert
        expect(data).toStrictEqual(expectedState)
    })

    it('pushPaneRectsActions match', () => {
        // Arrange
        const expectedState: IUtilityStoreState = {
            paneRects: [{width: 100, height: 100, x:100, y:100}],
            orientation: DeviceOrientation.Portrait,
            isTwoPane: false,
            config: {}
        }

        // Act
        store.dispatch(pushPaneRectsActions([{width: 100, height: 100, x:100, y:100}]));
        const data = store.getState().utilityStoreReducer;

        // Assert
        expect(data).toStrictEqual(expectedState)
    })

    it('pushPaneRectsActions notMatch', () => {
        // Arrange
        const expectedState: IUtilityStoreState = {
            paneRects:[{width: 0, height: 0, x:0, y:0}],
            orientation: DeviceOrientation.Portrait,
            isTwoPane: false,
            config: {}
        }

        // Act
        store.dispatch(pushPaneRectsActions([{width: 100, height: 100, x:100, y:100}]));
        const data = store.getState().utilityStoreReducer;

        // Assert
        expect(data).not.toStrictEqual(expectedState)
    })

    it('config match', () => {
        // Arrange
        const expectedState: IUtilityStoreState = {
            paneRects: [],
            orientation: DeviceOrientation.Portrait,
            isTwoPane: false,
            config: {
                onePane: {
                    paneHeader: {backgroundColor: 'red'}
                },
                twoPane: {
                    paneHeader: {backgroundColor: 'blue'}
                }
            }
        }

        // Act
        store.dispatch(pushConfigAction({
                onePane: {
                    paneHeader: {backgroundColor: 'red'}
                },
                twoPane: {
                    paneHeader: {backgroundColor: 'blue'}
                }
            }));
        const data = store.getState().utilityStoreReducer;

        // Assert
        expect(data).toStrictEqual(expectedState)
    })

    it('config notMatch', () => {
         // Arrange
        const expectedState: IUtilityStoreState = {
            paneRects: [],
            orientation: DeviceOrientation.Portrait,
            isTwoPane: false,
            config: {
                onePane: {
                    paneHeader: {backgroundColor: 'red'}
                },
                twoPane: {
                    paneHeader: {backgroundColor: 'blue'}
                }
            }
        }

        // Act
        store.dispatch(pushConfigAction({
                onePane: {
                    paneHeader: {backgroundColor: 'blue'}
                },
                twoPane: {
                    paneHeader: {backgroundColor: 'red'}
                }
            }));        const data = store.getState().utilityStoreReducer;

        // Assert
        expect(data).not.toStrictEqual(expectedState)
    })

    it('orientation Match', () => {
         // Arrange
        const expectedState: IUtilityStoreState = {
            paneRects: [],
            orientation: DeviceOrientation.LandscapeFlipped,
            isTwoPane: false,
            config: {}
        }

        // Act
        store.dispatch(pushOrientationActions(DeviceOrientation.LandscapeFlipped))      
         const data = store.getState().utilityStoreReducer;

        // Assert
        expect(data).toStrictEqual(expectedState)
    })

    it('orientation notMatch', () => {
         // Arrange
        const expectedState: IUtilityStoreState = {
            paneRects: [],
            orientation: DeviceOrientation.Portrait,
            isTwoPane: false,
            config: {}
        }

        // Act
        store.dispatch(pushOrientationActions(DeviceOrientation.LandscapeFlipped))      
      
        const data = store.getState().utilityStoreReducer;

        // Assert
        expect(data).not.toStrictEqual(expectedState)
    })
})