import { IDuexElementState } from "../duexElement.interface"
import { duexElementObjectBuilder } from "./duexElement.methods.helpers"
import React, { Fragment } from 'react';
import { pushElement, replaceDuexElement, removeDuexElementByKey } from "../duexElement.action"
import { store, resetApp } from "../../../../appStore";
import { Text } from "react-native";

describe('duexElementStore tests', () => {
    beforeEach(() => {
        store.dispatch(resetApp())
    });

    it('PUSH_DUEXELEMENT', () => {
        // Arrange
        const expectedState: IDuexElementState =
        {
            duexElements: duexElementObjectBuilder('first', <Fragment />)
        }

        // Act
        store.dispatch(pushElement('first', <Fragment />))
        const data = store.getState().duexElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('PUSH_DUEXELEMENT Multiple', () => {
        // Arrange
        const expectedState: IDuexElementState =
        {
            duexElements: {
                'first': <Fragment />,
                'second': <Fragment />,
                'third': <Fragment />,
            }
        }

        // Act
        store.dispatch(pushElement('first', <Fragment />))
        store.dispatch(pushElement('second', <Fragment />))
        store.dispatch(pushElement('third', <Fragment />))
        const data = store.getState().duexElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REPLACE_DUEXELEMENT', () => {
        // Arrange
        const expectedState: IDuexElementState = {
            duexElements: duexElementObjectBuilder('first', <Text>second</Text>)
        }

        // Act 
        store.dispatch(pushElement('first', <Text>first</Text>))
        store.dispatch(replaceDuexElement('first', <Text>second</Text>))
        const data = store.getState().duexElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);

    })

    it('REPLACE_DUEXELEMENT Multiple', () => {
        // Arrange
        const expectedState: IDuexElementState = {
            duexElements: duexElementObjectBuilder('first', <Text>fifth</Text>)
        }

        // Act 
        store.dispatch(pushElement('first', <Text>first</Text>))
        store.dispatch(replaceDuexElement('first', <Text>second</Text>))
        store.dispatch(replaceDuexElement('first', <Text>third</Text>))
        store.dispatch(replaceDuexElement('first', <Text>fourth</Text>))
        store.dispatch(replaceDuexElement('first', <Text>fifth</Text>))
        const data = store.getState().duexElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REPLACE_DUEXELEMENT not found', () => {
        // Arrange
        const expectedState: IDuexElementState = {
            duexElements: duexElementObjectBuilder('first', <Text>first</Text>)
        }

        // Act 
        store.dispatch(pushElement('first', <Text>first</Text>))
        store.dispatch(replaceDuexElement('does not exist', <Text>second</Text>))
        const data = store.getState().duexElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REMOVE_KEY_DUEXELEMENT', () => {
        // Arrange
        const expectedState: IDuexElementState =
        {
            duexElements: {
                'first': <Text>first</Text>,
                'third': <Text>third</Text>,
            }
        }

        // Act
        store.dispatch(pushElement('first', <Text>first</Text>))
        store.dispatch(pushElement('second', <Text>second</Text>))
        store.dispatch(pushElement('third', <Text>third</Text>))
        store.dispatch(removeDuexElementByKey('second'))
        const data = store.getState().duexElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REMOVE_KEY_DUEXELEMENT Multiple', () => {
        // Arrange
        const expectedState: IDuexElementState =
        {
            duexElements: {
                'first': <Text>first</Text>,
                'third': <Text>third</Text>,
                'fifth': <Text>fifth</Text>,
            }
        }

        // Act
        store.dispatch(pushElement('first', <Text>first</Text>,))
        store.dispatch(pushElement('second', <Text>second</Text>,))
        store.dispatch(pushElement('third', <Text>third</Text>,))
        store.dispatch(pushElement('fourth', <Text>fourth</Text>,))
        store.dispatch(pushElement('fifth', <Text>fifth</Text>,))
        store.dispatch(removeDuexElementByKey('second'))
        store.dispatch(removeDuexElementByKey('fourth'))
        const data = store.getState().duexElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REMOVE_KEY_DUEXELEMENT not found ', () => {
        // Arrange
        const expectedState: IDuexElementState =
        {
            duexElements: {
                'first': <Text>first</Text>,
                'second': <Text>second</Text>,
                'third': <Text>third</Text>,
            }
        }

        // Act
        store.dispatch(pushElement('first', <Text>first</Text>,))
        store.dispatch(pushElement('second', <Text>second</Text>,))
        store.dispatch(pushElement('third', <Text>third</Text>,))
        store.dispatch(removeDuexElementByKey('does not exist'))
        const data = store.getState().duexElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })


})