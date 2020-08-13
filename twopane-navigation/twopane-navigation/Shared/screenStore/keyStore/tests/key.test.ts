import { store, resetApp } from "../../../../appStore"
import { IKeyState } from "../key.interface";
import { populateKeyStore3, mockKeyState, keyObjectBuilder } from "./key.methods.helpers";
import { screenType } from "../../../../utilities/interfaces";
import { pushKey, popToFront, popScreen, moveToFront, changeScreen } from "../key.actions";

describe('keyStore tests', () => {
    beforeEach(() => {
        store.dispatch(resetApp())
    });

    describe('singleScreen', () => {

        it('PUSH_KEY', () => {
            // Arrange
            const expectedState = mockKeyState(screenType.SINGLE, false, `${screenType.SINGLE}_`);

            // Act
            store.dispatch(pushKey(screenType.SINGLE, `first`, false));
            store.dispatch(pushKey(screenType.SINGLE, `second`, false));
            store.dispatch(pushKey(screenType.SINGLE, `third`, false));
            const data = store.getState().KeyReducers;
            // Assert
            expect(data).toStrictEqual(expectedState)
        })


        it('PUSH_KEY_EXPECT_DUPLICATION', () => {
            // Arrange
            const original = mockKeyState(screenType.SINGLE, false, `${screenType.SINGLE}_`);
            const duplicate = mockKeyState(screenType.SINGLE, false, `${screenType.SINGLE}_`);
            const expectedState: IKeyState = {
                keys: [...original.keys, ...duplicate.keys]
            }

            // Act
            store.dispatch(pushKey(screenType.SINGLE, `first`, false));
            store.dispatch(pushKey(screenType.SINGLE, `second`, false));
            store.dispatch(pushKey(screenType.SINGLE, `third`, false));
            store.dispatch(pushKey(screenType.SINGLE, `first`, false));
            store.dispatch(pushKey(screenType.SINGLE, `second`, false));
            store.dispatch(pushKey(screenType.SINGLE, `third`, false));
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toEqual(expectedState)
        })

        it('POP_TO_FRONT_KEY', () => {
            // Arrange
            const expectedState: IKeyState =
            {
                keys: [keyObjectBuilder(`${screenType.SINGLE}_first`, false, screenType.SINGLE)]
            }
            populateKeyStore3(screenType.SINGLE, false);

            // Act
            store.dispatch(popToFront(screenType.SINGLE))
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedState)
        })

        it('POP_TO_FRONT_KEY dualScreen untouched', () => {
            // Arrange
            const expectedSingleState: IKeyState =
            {
                keys: [keyObjectBuilder(`${screenType.SINGLE}_first`, false, screenType.SINGLE)]
            }
            const expectedDualState: IKeyState = mockKeyState(screenType.DUAL, false, `${screenType.DUAL}_`)
            populateKeyStore3(screenType.SINGLE, false);
            populateKeyStore3(screenType.DUAL, false);

            // Act
            store.dispatch(popToFront(screenType.SINGLE))
            const data = store.getState().KeyReducers;
            const singleScreenState = data.keys.filter(x => x.screen === screenType.SINGLE);
            const dualScreenState = data.keys.filter(x => x.screen === screenType.DUAL);

            // Assert
            expect(singleScreenState).toStrictEqual(expectedSingleState.keys)
            expect(dualScreenState).toStrictEqual(expectedDualState.keys)
        })

        it('POP_KEY', () => {
            // Arrange
            const expectedSingleState: IKeyState =
            {
                keys: [keyObjectBuilder(`${screenType.SINGLE}_first`, false, screenType.SINGLE),
                keyObjectBuilder(`${screenType.SINGLE}_second`, false, screenType.SINGLE)]
            }
            populateKeyStore3(screenType.SINGLE, false);

            // Act
            store.dispatch(popScreen(screenType.SINGLE))
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedSingleState)

        })

        it('POP_KEY Multiple', () => {
            // Arrange
            const expectedSingleState: IKeyState =
            {
                keys: [keyObjectBuilder(`${screenType.SINGLE}_first`, false, screenType.SINGLE)]
            }
            populateKeyStore3(screenType.SINGLE, false);
            populateKeyStore3(screenType.SINGLE, false);


            // Act
            store.dispatch(popScreen(screenType.SINGLE))
            store.dispatch(popScreen(screenType.SINGLE))
            store.dispatch(popScreen(screenType.SINGLE))
            store.dispatch(popScreen(screenType.SINGLE))
            store.dispatch(popScreen(screenType.SINGLE))
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedSingleState)
        })


        it('POP_KEY dualScreen untouched', () => {
            // Arrange
            const expectedSingleState: IKeyState =
            {
                keys: [keyObjectBuilder(`${screenType.SINGLE}_first`, false, screenType.SINGLE),
                keyObjectBuilder(`${screenType.SINGLE}_second`, false, screenType.SINGLE)]
            }
            const expectedDualState: IKeyState = mockKeyState(screenType.DUAL, false, `${screenType.DUAL}_`);

            populateKeyStore3(screenType.SINGLE, false);
            populateKeyStore3(screenType.DUAL, false);


            // Act
            store.dispatch(popScreen(screenType.SINGLE))
            const data = store.getState().KeyReducers;
            const singleScreenState = data.keys.filter(x => x.screen === screenType.SINGLE);
            const dualScreenState = data.keys.filter(x => x.screen === screenType.DUAL);



            // Assert
            expect(singleScreenState).toStrictEqual(expectedSingleState.keys)
            expect(dualScreenState).toStrictEqual(expectedDualState.keys)

        })

        it('MOVE_TO_FRONT_KEY', () => {
            // Arrange
            const expectedSingleState: IKeyState =
            {
                keys: [keyObjectBuilder(`${screenType.SINGLE}_second`, false, screenType.SINGLE),
                keyObjectBuilder(`${screenType.SINGLE}_third`, false, screenType.SINGLE),
                keyObjectBuilder(`${screenType.SINGLE}_first`, false, screenType.SINGLE)]
            }

            // Act
            populateKeyStore3(screenType.SINGLE, false);
            store.dispatch(moveToFront(screenType.SINGLE, `${screenType.SINGLE}_first`));
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedSingleState)
        })

        it('MOVE_TO_FRONT_KEY dualScreen untouched', () => {
            // Arrange
            const expectedSingleState: IKeyState =
            {
                keys: [keyObjectBuilder(`${screenType.SINGLE}_second`, false, screenType.SINGLE),
                keyObjectBuilder(`${screenType.SINGLE}_third`, false, screenType.SINGLE),
                keyObjectBuilder(`${screenType.SINGLE}_first`, false, screenType.SINGLE)]
            }
            const expectedDualState: IKeyState = mockKeyState(screenType.DUAL, false, `${screenType.DUAL}_`);
            populateKeyStore3(screenType.SINGLE, false);
            populateKeyStore3(screenType.DUAL, false);

            // Act
            store.dispatch(moveToFront(screenType.SINGLE, `${screenType.SINGLE}_first`));
            const data = store.getState().KeyReducers;
            const singleScreenState = data.keys.filter(x => x.screen === screenType.SINGLE);
            const dualScreenState = data.keys.filter(x => x.screen === screenType.DUAL);

            // Assert
            expect(singleScreenState).toStrictEqual(expectedSingleState.keys)
            expect(dualScreenState).toStrictEqual(expectedDualState.keys)

        })

        it('CHANGE_SCREEN_KEY', () => {
            // Arrange
            const expectedSingleState: IKeyState =
            {
                keys: [keyObjectBuilder(`${screenType.SINGLE}_first`, false, screenType.SINGLE),
                keyObjectBuilder(`${screenType.SINGLE}_second`, false, screenType.DUAL),
                keyObjectBuilder(`${screenType.SINGLE}_third`, false, screenType.SINGLE)]
            }

            // Act
            populateKeyStore3(screenType.SINGLE, false);
            store.dispatch(changeScreen(screenType.DUAL, `${screenType.SINGLE}_second`));
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedSingleState)
        })
    });

    describe('dualScreen', () => {

        it('PUSH_KEY', () => {
            // Arrange
            const expectedState = mockKeyState(screenType.DUAL, false, `${screenType.DUAL}_`);

            // Act
            store.dispatch(pushKey(screenType.DUAL, `first`, false));
            store.dispatch(pushKey(screenType.DUAL, `second`, false));
            store.dispatch(pushKey(screenType.DUAL, `third`, false));
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedState)
        })

        it('PUSH_KEY_EXPECT_DUPLICATION', () => {
            // Arrange
            const original = mockKeyState(screenType.DUAL, false, `${screenType.DUAL}_`);
            const duplicate = mockKeyState(screenType.DUAL, false, `${screenType.DUAL}_`);
            const expectedState: IKeyState = {
                keys: [...original.keys, ...duplicate.keys]
            }

            // Act
            store.dispatch(pushKey(screenType.DUAL, `first`, false));
            store.dispatch(pushKey(screenType.DUAL, `second`, false));
            store.dispatch(pushKey(screenType.DUAL, `third`, false));
            store.dispatch(pushKey(screenType.DUAL, `first`, false));
            store.dispatch(pushKey(screenType.DUAL, `second`, false));
            store.dispatch(pushKey(screenType.DUAL, `third`, false));
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedState)
        })

        it('POP_TO_FRONT_KEY', () => {
            // Arrange
            const expectedState: IKeyState =
            {
                keys: [keyObjectBuilder(`${screenType.DUAL}_first`, false, screenType.DUAL)]
            }
            populateKeyStore3(screenType.DUAL, false);

            // Act
            store.dispatch(popToFront(screenType.DUAL))
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedState)
        })

        it('POP_TO_FRONT_KEY singleScreen untouched', () => {
            // Arrange
            const expectedSingleState: IKeyState = mockKeyState(screenType.SINGLE, false, `${screenType.SINGLE}_`)
            const expectedDualState: IKeyState = {
                keys: [keyObjectBuilder(`${screenType.DUAL}_first`, false, screenType.DUAL)]
            }
            populateKeyStore3(screenType.SINGLE, false);
            populateKeyStore3(screenType.DUAL, false);

            // Act
            store.dispatch(popToFront(screenType.DUAL))
            const data = store.getState().KeyReducers;
            const singleScreenState = data.keys.filter(x => x.screen === screenType.SINGLE);
            const dualScreenState = data.keys.filter(x => x.screen === screenType.DUAL);


            // Assert
            expect(singleScreenState).toStrictEqual(expectedSingleState.keys)
            expect(dualScreenState).toStrictEqual(expectedDualState.keys)
        })

        it('POP_KEY', () => {
            // Arrange
            const expectedDualState: IKeyState =
            {
                keys: [keyObjectBuilder(`${screenType.DUAL}_first`, false, screenType.DUAL),
                keyObjectBuilder(`${screenType.DUAL}_second`, false, screenType.DUAL)]
            }
            populateKeyStore3(screenType.DUAL, false);

            // Act
            store.dispatch(popScreen(screenType.DUAL))
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedDualState)

        })

        it('POP_KEY Multiple', () => {
            // Arrange
            const expectedDualState: IKeyState =
            {
                keys: [keyObjectBuilder(`${screenType.DUAL}_first`, false, screenType.DUAL)]
            }
            populateKeyStore3(screenType.DUAL, false);
            populateKeyStore3(screenType.DUAL, false);


            // Act
            store.dispatch(popScreen(screenType.DUAL))
            store.dispatch(popScreen(screenType.DUAL))
            store.dispatch(popScreen(screenType.DUAL))
            store.dispatch(popScreen(screenType.DUAL))
            store.dispatch(popScreen(screenType.DUAL))
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedDualState)
        })


        it('POP_KEY singleScreen untouched', () => {
            // Arrange
            const expectedSingleState: IKeyState = mockKeyState(screenType.SINGLE, false, `${screenType.SINGLE}_`);
            const expectedDualState: IKeyState =
            {
                keys: [keyObjectBuilder(`${screenType.DUAL}_first`, false, screenType.DUAL),
                keyObjectBuilder(`${screenType.DUAL}_second`, false, screenType.DUAL)]
            }

            populateKeyStore3(screenType.SINGLE, false);
            populateKeyStore3(screenType.DUAL, false);


            // Act
            store.dispatch(popScreen(screenType.DUAL))
            const data = store.getState().KeyReducers;
            const singleScreenState = data.keys.filter(x => x.screen === screenType.SINGLE);
            const dualScreenState = data.keys.filter(x => x.screen === screenType.DUAL);



            // Assert
            expect(singleScreenState).toStrictEqual(expectedSingleState.keys)
            expect(dualScreenState).toStrictEqual(expectedDualState.keys)

        })

        it('MOVE_TO_FRONT_KEY', () => {
            // Arrange
            const expectedDualState: IKeyState =
            {
                keys: [keyObjectBuilder(`${screenType.DUAL}_second`, false, screenType.DUAL),
                keyObjectBuilder(`${screenType.DUAL}_third`, false, screenType.DUAL),
                keyObjectBuilder(`${screenType.DUAL}_first`, false, screenType.DUAL)]
            }

            // Act
            populateKeyStore3(screenType.DUAL, false);
            store.dispatch(moveToFront(screenType.DUAL, `${screenType.DUAL}_first`));
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedDualState)
        })

        it('MOVE_TO_FRONT_KEY singleScreen untouched', () => {
            // Arrange
            const expectedDualState: IKeyState =
            {
                keys: [keyObjectBuilder(`${screenType.DUAL}_second`, false, screenType.DUAL),
                keyObjectBuilder(`${screenType.DUAL}_third`, false, screenType.DUAL),
                keyObjectBuilder(`${screenType.DUAL}_first`, false, screenType.DUAL)]
            }
            const expectedSingleState: IKeyState = mockKeyState(screenType.SINGLE, false, `${screenType.SINGLE}_`);
            populateKeyStore3(screenType.SINGLE, false);
            populateKeyStore3(screenType.DUAL, false);

            // Act
            store.dispatch(moveToFront(screenType.DUAL, `${screenType.DUAL}_first`));
            const data = store.getState().KeyReducers;
            const singleScreenState = data.keys.filter(x => x.screen === screenType.SINGLE);
            const dualScreenState = data.keys.filter(x => x.screen === screenType.DUAL);

            // Assert
            expect(singleScreenState).toStrictEqual(expectedSingleState.keys)
            expect(dualScreenState).toStrictEqual(expectedDualState.keys)
        })


        it('CHANGE_SCREEN_KEY', () => {
            // Arrange
            const expectedSingleState: IKeyState =
            {
                keys: [keyObjectBuilder(`${screenType.DUAL}_first`, false, screenType.DUAL),
                keyObjectBuilder(`${screenType.DUAL}_second`, false, screenType.SINGLE),
                keyObjectBuilder(`${screenType.DUAL}_third`, false, screenType.DUAL)]
            }

            // Act
            populateKeyStore3(screenType.DUAL, false);
            store.dispatch(changeScreen(screenType.SINGLE, `${screenType.DUAL}_second`));
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedSingleState)
        })
    });

});
