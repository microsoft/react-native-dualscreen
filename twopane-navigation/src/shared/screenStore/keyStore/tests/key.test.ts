import { store, resetApp } from "../../../../appStore"
import { IKeyState } from "../key.interface";
import { populateKeyStore3, mockKeyState, keyObjectBuilder } from "./key.methods.helpers";
import { paneType } from "../../../../utilities/interfaces";
import { pushKey, popToFront, popScreen, moveToFront, changeScreen } from "../key.actions";

describe('keyStore tests', () => {
    beforeEach(() => {
        store.dispatch(resetApp())
    });

    describe('onePane', () => {

        it('PUSH_KEY', () => {
            // Arrange
            const expectedState = mockKeyState(paneType.ONE, false, `${paneType.ONE}_`);

            // Act
            store.dispatch(pushKey(paneType.ONE, `first`, false));
            store.dispatch(pushKey(paneType.ONE, `second`, false));
            store.dispatch(pushKey(paneType.ONE, `third`, false));
            const data = store.getState().KeyReducers;
            // Assert
            expect(data).toStrictEqual(expectedState)
        })


        it('PUSH_KEY_EXPECT_DUPLICATION', () => {
            // Arrange
            const original = mockKeyState(paneType.ONE, false, `${paneType.ONE}_`);
            const duplicate = mockKeyState(paneType.ONE, false, `${paneType.ONE}_`);
            const expectedState: IKeyState = {
                keys: [...original.keys, ...duplicate.keys]
            }

            // Act
            store.dispatch(pushKey(paneType.ONE, `first`, false));
            store.dispatch(pushKey(paneType.ONE, `second`, false));
            store.dispatch(pushKey(paneType.ONE, `third`, false));
            store.dispatch(pushKey(paneType.ONE, `first`, false));
            store.dispatch(pushKey(paneType.ONE, `second`, false));
            store.dispatch(pushKey(paneType.ONE, `third`, false));
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toEqual(expectedState)
        })

        it('POP_TO_FRONT_KEY', () => {
            // Arrange
            const expectedState: IKeyState =
            {
                keys: [keyObjectBuilder(`${paneType.ONE}_first`, false, paneType.ONE)]
            }
            populateKeyStore3(paneType.ONE, false);

            // Act
            store.dispatch(popToFront(paneType.ONE))
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedState)
        })

        it('POP_TO_FRONT_KEY twoPane untouched', () => {
            // Arrange
            const expectedONEState: IKeyState =
            {
                keys: [keyObjectBuilder(`${paneType.ONE}_first`, false, paneType.ONE)]
            }
            const expectedTWOState: IKeyState = mockKeyState(paneType.TWO, false, `${paneType.TWO}_`)
            populateKeyStore3(paneType.ONE, false);
            populateKeyStore3(paneType.TWO, false);

            // Act
            store.dispatch(popToFront(paneType.ONE))
            const data = store.getState().KeyReducers;
            const onePaneState = data.keys.filter(x => x.screen === paneType.ONE);
            const twoPaneState = data.keys.filter(x => x.screen === paneType.TWO);

            // Assert
            expect(onePaneState).toStrictEqual(expectedONEState.keys)
            expect(twoPaneState).toStrictEqual(expectedTWOState.keys)
        })

        it('POP_KEY', () => {
            // Arrange
            const expectedONEState: IKeyState =
            {
                keys: [keyObjectBuilder(`${paneType.ONE}_first`, false, paneType.ONE),
                keyObjectBuilder(`${paneType.ONE}_second`, false, paneType.ONE)]
            }
            populateKeyStore3(paneType.ONE, false);

            // Act
            store.dispatch(popScreen(paneType.ONE))
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedONEState)

        })

        it('POP_KEY Multiple', () => {
            // Arrange
            const expectedONEState: IKeyState =
            {
                keys: [keyObjectBuilder(`${paneType.ONE}_first`, false, paneType.ONE)]
            }
            populateKeyStore3(paneType.ONE, false);
            populateKeyStore3(paneType.ONE, false);


            // Act
            store.dispatch(popScreen(paneType.ONE))
            store.dispatch(popScreen(paneType.ONE))
            store.dispatch(popScreen(paneType.ONE))
            store.dispatch(popScreen(paneType.ONE))
            store.dispatch(popScreen(paneType.ONE))
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedONEState)
        })


        it('POP_KEY twoPane untouched', () => {
            // Arrange
            const expectedONEState: IKeyState =
            {
                keys: [keyObjectBuilder(`${paneType.ONE}_first`, false, paneType.ONE),
                keyObjectBuilder(`${paneType.ONE}_second`, false, paneType.ONE)]
            }
            const expectedTWOState: IKeyState = mockKeyState(paneType.TWO, false, `${paneType.TWO}_`);

            populateKeyStore3(paneType.ONE, false);
            populateKeyStore3(paneType.TWO, false);


            // Act
            store.dispatch(popScreen(paneType.ONE))
            const data = store.getState().KeyReducers;
            const onePaneState = data.keys.filter(x => x.screen === paneType.ONE);
            const twoPaneState = data.keys.filter(x => x.screen === paneType.TWO);



            // Assert
            expect(onePaneState).toStrictEqual(expectedONEState.keys)
            expect(twoPaneState).toStrictEqual(expectedTWOState.keys)

        })

        it('MOVE_TO_FRONT_KEY', () => {
            // Arrange
            const expectedONEState: IKeyState =
            {
                keys: [keyObjectBuilder(`${paneType.ONE}_second`, false, paneType.ONE),
                keyObjectBuilder(`${paneType.ONE}_third`, false, paneType.ONE),
                keyObjectBuilder(`${paneType.ONE}_first`, false, paneType.ONE)]
            }

            // Act
            populateKeyStore3(paneType.ONE, false);
            store.dispatch(moveToFront(paneType.ONE, `${paneType.ONE}_first`));
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedONEState)
        })

        it('MOVE_TO_FRONT_KEY twoPane untouched', () => {
            // Arrange
            const expectedONEState: IKeyState =
            {
                keys: [keyObjectBuilder(`${paneType.ONE}_second`, false, paneType.ONE),
                keyObjectBuilder(`${paneType.ONE}_third`, false, paneType.ONE),
                keyObjectBuilder(`${paneType.ONE}_first`, false, paneType.ONE)]
            }
            const expectedTWOState: IKeyState = mockKeyState(paneType.TWO, false, `${paneType.TWO}_`);
            populateKeyStore3(paneType.ONE, false);
            populateKeyStore3(paneType.TWO, false);

            // Act
            store.dispatch(moveToFront(paneType.ONE, `${paneType.ONE}_first`));
            const data = store.getState().KeyReducers;
            const onePaneState = data.keys.filter(x => x.screen === paneType.ONE);
            const twoPaneState = data.keys.filter(x => x.screen === paneType.TWO);

            // Assert
            expect(onePaneState).toStrictEqual(expectedONEState.keys)
            expect(twoPaneState).toStrictEqual(expectedTWOState.keys)

        })

        it('CHANGE_SCREEN_KEY', () => {
            // Arrange
            const expectedONEState: IKeyState =
            {
                keys: [keyObjectBuilder(`${paneType.ONE}_first`, false, paneType.ONE),
                keyObjectBuilder(`${paneType.ONE}_second`, false, paneType.TWO),
                keyObjectBuilder(`${paneType.ONE}_third`, false, paneType.ONE)]
            }

            // Act
            populateKeyStore3(paneType.ONE, false);
            store.dispatch(changeScreen(paneType.TWO, `${paneType.ONE}_second`));
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedONEState)
        })
    });

    describe('twoPane', () => {

        it('PUSH_KEY', () => {
            // Arrange
            const expectedState = mockKeyState(paneType.TWO, false, `${paneType.TWO}_`);

            // Act
            store.dispatch(pushKey(paneType.TWO, `first`, false));
            store.dispatch(pushKey(paneType.TWO, `second`, false));
            store.dispatch(pushKey(paneType.TWO, `third`, false));
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedState)
        })

        it('PUSH_KEY_EXPECT_DUPLICATION', () => {
            // Arrange
            const original = mockKeyState(paneType.TWO, false, `${paneType.TWO}_`);
            const duplicate = mockKeyState(paneType.TWO, false, `${paneType.TWO}_`);
            const expectedState: IKeyState = {
                keys: [...original.keys, ...duplicate.keys]
            }

            // Act
            store.dispatch(pushKey(paneType.TWO, `first`, false));
            store.dispatch(pushKey(paneType.TWO, `second`, false));
            store.dispatch(pushKey(paneType.TWO, `third`, false));
            store.dispatch(pushKey(paneType.TWO, `first`, false));
            store.dispatch(pushKey(paneType.TWO, `second`, false));
            store.dispatch(pushKey(paneType.TWO, `third`, false));
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedState)
        })

        it('POP_TO_FRONT_KEY', () => {
            // Arrange
            const expectedState: IKeyState =
            {
                keys: [keyObjectBuilder(`${paneType.TWO}_first`, false, paneType.TWO)]
            }
            populateKeyStore3(paneType.TWO, false);

            // Act
            store.dispatch(popToFront(paneType.TWO))
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedState)
        })

        it('POP_TO_FRONT_KEY onePane untouched', () => {
            // Arrange
            const expectedONEState: IKeyState = mockKeyState(paneType.ONE, false, `${paneType.ONE}_`)
            const expectedTWOState: IKeyState = {
                keys: [keyObjectBuilder(`${paneType.TWO}_first`, false, paneType.TWO)]
            }
            populateKeyStore3(paneType.ONE, false);
            populateKeyStore3(paneType.TWO, false);

            // Act
            store.dispatch(popToFront(paneType.TWO))
            const data = store.getState().KeyReducers;
            const onePaneState = data.keys.filter(x => x.screen === paneType.ONE);
            const twoPaneState = data.keys.filter(x => x.screen === paneType.TWO);


            // Assert
            expect(onePaneState).toStrictEqual(expectedONEState.keys)
            expect(twoPaneState).toStrictEqual(expectedTWOState.keys)
        })

        it('POP_KEY', () => {
            // Arrange
            const expectedTWOState: IKeyState =
            {
                keys: [keyObjectBuilder(`${paneType.TWO}_first`, false, paneType.TWO),
                keyObjectBuilder(`${paneType.TWO}_second`, false, paneType.TWO)]
            }
            populateKeyStore3(paneType.TWO, false);

            // Act
            store.dispatch(popScreen(paneType.TWO))
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedTWOState)

        })

        it('POP_KEY Multiple', () => {
            // Arrange
            const expectedTWOState: IKeyState =
            {
                keys: [keyObjectBuilder(`${paneType.TWO}_first`, false, paneType.TWO)]
            }
            populateKeyStore3(paneType.TWO, false);
            populateKeyStore3(paneType.TWO, false);


            // Act
            store.dispatch(popScreen(paneType.TWO))
            store.dispatch(popScreen(paneType.TWO))
            store.dispatch(popScreen(paneType.TWO))
            store.dispatch(popScreen(paneType.TWO))
            store.dispatch(popScreen(paneType.TWO))
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedTWOState)
        })


        it('POP_KEY onePane untouched', () => {
            // Arrange
            const expectedONEState: IKeyState = mockKeyState(paneType.ONE, false, `${paneType.ONE}_`);
            const expectedTWOState: IKeyState =
            {
                keys: [keyObjectBuilder(`${paneType.TWO}_first`, false, paneType.TWO),
                keyObjectBuilder(`${paneType.TWO}_second`, false, paneType.TWO)]
            }

            populateKeyStore3(paneType.ONE, false);
            populateKeyStore3(paneType.TWO, false);


            // Act
            store.dispatch(popScreen(paneType.TWO))
            const data = store.getState().KeyReducers;
            const onePaneState = data.keys.filter(x => x.screen === paneType.ONE);
            const twoPaneState = data.keys.filter(x => x.screen === paneType.TWO);



            // Assert
            expect(onePaneState).toStrictEqual(expectedONEState.keys)
            expect(twoPaneState).toStrictEqual(expectedTWOState.keys)

        })

        it('MOVE_TO_FRONT_KEY', () => {
            // Arrange
            const expectedTWOState: IKeyState =
            {
                keys: [keyObjectBuilder(`${paneType.TWO}_second`, false, paneType.TWO),
                keyObjectBuilder(`${paneType.TWO}_third`, false, paneType.TWO),
                keyObjectBuilder(`${paneType.TWO}_first`, false, paneType.TWO)]
            }

            // Act
            populateKeyStore3(paneType.TWO, false);
            store.dispatch(moveToFront(paneType.TWO, `${paneType.TWO}_first`));
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedTWOState)
        })

        it('MOVE_TO_FRONT_KEY onePane untouched', () => {
            // Arrange
            const expectedTWOState: IKeyState =
            {
                keys: [keyObjectBuilder(`${paneType.TWO}_second`, false, paneType.TWO),
                keyObjectBuilder(`${paneType.TWO}_third`, false, paneType.TWO),
                keyObjectBuilder(`${paneType.TWO}_first`, false, paneType.TWO)]
            }
            const expectedONEState: IKeyState = mockKeyState(paneType.ONE, false, `${paneType.ONE}_`);
            populateKeyStore3(paneType.ONE, false);
            populateKeyStore3(paneType.TWO, false);

            // Act
            store.dispatch(moveToFront(paneType.TWO, `${paneType.TWO}_first`));
            const data = store.getState().KeyReducers;
            const onePaneState = data.keys.filter(x => x.screen === paneType.ONE);
            const twoPaneState = data.keys.filter(x => x.screen === paneType.TWO);

            // Assert
            expect(onePaneState).toStrictEqual(expectedONEState.keys)
            expect(twoPaneState).toStrictEqual(expectedTWOState.keys)
        })


        it('CHANGE_SCREEN_KEY', () => {
            // Arrange
            const expectedONEState: IKeyState =
            {
                keys: [keyObjectBuilder(`${paneType.TWO}_first`, false, paneType.TWO),
                keyObjectBuilder(`${paneType.TWO}_second`, false, paneType.ONE),
                keyObjectBuilder(`${paneType.TWO}_third`, false, paneType.TWO)]
            }

            // Act
            populateKeyStore3(paneType.TWO, false);
            store.dispatch(changeScreen(paneType.ONE, `${paneType.TWO}_second`));
            const data = store.getState().KeyReducers;

            // Assert
            expect(data).toStrictEqual(expectedONEState)
        })
    });

});
