import { ITwoPaneElementState } from "../twoPaneElement.interface"
import { twoPaneElementObjectBuilder } from "./twoPaneElement.methods.helpers"
import React, { Fragment } from 'react';
import { pushElement, replacetwoPaneElement, removetwoPaneElementByKey } from "../twoPaneElement.action"
import { store, resetApp } from "../../../../appStore";
import { Text } from "react-native";

describe('twoPaneElementStore tests', () => {
    beforeEach(() => {
        store.dispatch(resetApp())
    });

    it('PUSH_TWOPANE_ELEMENT', () => {
        // Arrange
        const expectedState: ITwoPaneElementState =
        {
            twoPaneElements: twoPaneElementObjectBuilder('first', <Fragment />)
        }

        // Act
        store.dispatch(pushElement('first', <Fragment />))
        const data = store.getState().twoPaneElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('PUSH_TWOPANE_ELEMENT Multiple', () => {
        // Arrange
        const expectedState: ITwoPaneElementState =
        {
            twoPaneElements: {
                'first': <Fragment />,
                'second': <Fragment />,
                'third': <Fragment />,
            }
        }

        // Act
        store.dispatch(pushElement('first', <Fragment />))
        store.dispatch(pushElement('second', <Fragment />))
        store.dispatch(pushElement('third', <Fragment />))
        const data = store.getState().twoPaneElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REPLACE_TWOPANE_ELEMENT', () => {
        // Arrange
        const expectedState: ITwoPaneElementState = {
            twoPaneElements: twoPaneElementObjectBuilder('first', <Text>second</Text>)
        }

        // Act 
        store.dispatch(pushElement('first', <Text>first</Text>))
        store.dispatch(replacetwoPaneElement('first', <Text>second</Text>))
        const data = store.getState().twoPaneElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);

    })

    it('REPLACE_TWOPANE_ELEMENT Multiple', () => {
        // Arrange
        const expectedState: ITwoPaneElementState = {
            twoPaneElements: twoPaneElementObjectBuilder('first', <Text>fifth</Text>)
        }

        // Act 
        store.dispatch(pushElement('first', <Text>first</Text>))
        store.dispatch(replacetwoPaneElement('first', <Text>second</Text>))
        store.dispatch(replacetwoPaneElement('first', <Text>third</Text>))
        store.dispatch(replacetwoPaneElement('first', <Text>fourth</Text>))
        store.dispatch(replacetwoPaneElement('first', <Text>fifth</Text>))
        const data = store.getState().twoPaneElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REPLACE_TWOPANE_ELEMENT not found', () => {
        // Arrange
        const expectedState: ITwoPaneElementState = {
            twoPaneElements: twoPaneElementObjectBuilder('first', <Text>first</Text>)
        }

        // Act 
        store.dispatch(pushElement('first', <Text>first</Text>))
        store.dispatch(replacetwoPaneElement('does not exist', <Text>second</Text>))
        const data = store.getState().twoPaneElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REMOVE_KEY_TWOPANE_ELEMENT', () => {
        // Arrange
        const expectedState: ITwoPaneElementState =
        {
            twoPaneElements: {
                'first': <Text>first</Text>,
                'third': <Text>third</Text>,
            }
        }

        // Act
        store.dispatch(pushElement('first', <Text>first</Text>))
        store.dispatch(pushElement('second', <Text>second</Text>))
        store.dispatch(pushElement('third', <Text>third</Text>))
        store.dispatch(removetwoPaneElementByKey('second'))
        const data = store.getState().twoPaneElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REMOVE_KEY_TWOPANE_ELEMENT Multiple', () => {
        // Arrange
        const expectedState: ITwoPaneElementState =
        {
            twoPaneElements: {
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
        store.dispatch(removetwoPaneElementByKey('second'))
        store.dispatch(removetwoPaneElementByKey('fourth'))
        const data = store.getState().twoPaneElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REMOVE_KEY_TWOPANE_ELEMENT not found ', () => {
        // Arrange
        const expectedState: ITwoPaneElementState =
        {
            twoPaneElements: {
                'first': <Text>first</Text>,
                'second': <Text>second</Text>,
                'third': <Text>third</Text>,
            }
        }

        // Act
        store.dispatch(pushElement('first', <Text>first</Text>,))
        store.dispatch(pushElement('second', <Text>second</Text>,))
        store.dispatch(pushElement('third', <Text>third</Text>,))
        store.dispatch(removetwoPaneElementByKey('does not exist'))
        const data = store.getState().twoPaneElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })


})