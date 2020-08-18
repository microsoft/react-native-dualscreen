import { IPaneElementState } from "../paneElement.interface"
import { paneElementObjectBuilder } from "./paneElement.methods.helpers"
import React, { Fragment } from 'react';
import { pushElement, replacePaneElement, removePaneElementByKey } from "../PaneElement.action"
import { store, resetApp } from "../../../../appStore";
import { Text } from "react-native";

describe('PaneElementStore tests', () => {
    beforeEach(() => {
        store.dispatch(resetApp())
    });

    it('PUSH_PANE_ELEMENT', () => {
        // Arrange
        const expectedState: IPaneElementState =
        {
            PaneElements: paneElementObjectBuilder('first', <Fragment />)
        }

        // Act
        store.dispatch(pushElement('first', <Fragment />))
        const data = store.getState().PaneElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('PUSH_PANE_ELEMENT Multiple', () => {
        // Arrange
        const expectedState: IPaneElementState =
        {
            PaneElements: {
                'first': <Fragment />,
                'second': <Fragment />,
                'third': <Fragment />,
            }
        }

        // Act
        store.dispatch(pushElement('first', <Fragment />))
        store.dispatch(pushElement('second', <Fragment />))
        store.dispatch(pushElement('third', <Fragment />))
        const data = store.getState().PaneElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REPLACE_PANE_ELEMENT', () => {
        // Arrange
        const expectedState: IPaneElementState = {
            PaneElements: paneElementObjectBuilder('first', <Text>second</Text>)
        }

        // Act 
        store.dispatch(pushElement('first', <Text>first</Text>))
        store.dispatch(replacePaneElement('first', <Text>second</Text>))
        const data = store.getState().PaneElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);

    })

    it('REPLACE_PANE_ELEMENT Multiple', () => {
        // Arrange
        const expectedState: IPaneElementState = {
            PaneElements: paneElementObjectBuilder('first', <Text>fifth</Text>)
        }

        // Act 
        store.dispatch(pushElement('first', <Text>first</Text>))
        store.dispatch(replacePaneElement('first', <Text>second</Text>))
        store.dispatch(replacePaneElement('first', <Text>third</Text>))
        store.dispatch(replacePaneElement('first', <Text>fourth</Text>))
        store.dispatch(replacePaneElement('first', <Text>fifth</Text>))
        const data = store.getState().PaneElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REPLACE_PANE_ELEMENT not found', () => {
        // Arrange
        const expectedState: IPaneElementState = {
            PaneElements: paneElementObjectBuilder('first', <Text>first</Text>)
        }

        // Act 
        store.dispatch(pushElement('first', <Text>first</Text>))
        store.dispatch(replacePaneElement('does not exist', <Text>second</Text>))
        const data = store.getState().PaneElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REMOVE_KEY_PANE_ELEMENT', () => {
        // Arrange
        const expectedState: IPaneElementState =
        {
            PaneElements: {
                'first': <Text>first</Text>,
                'third': <Text>third</Text>,
            }
        }

        // Act
        store.dispatch(pushElement('first', <Text>first</Text>))
        store.dispatch(pushElement('second', <Text>second</Text>))
        store.dispatch(pushElement('third', <Text>third</Text>))
        store.dispatch(removePaneElementByKey('second'))
        const data = store.getState().PaneElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REMOVE_KEY_PANE_ELEMENT Multiple', () => {
        // Arrange
        const expectedState: IPaneElementState =
        {
            PaneElements: {
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
        store.dispatch(removePaneElementByKey('second'))
        store.dispatch(removePaneElementByKey('fourth'))
        const data = store.getState().PaneElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REMOVE_KEY_PANE_ELEMENT not found ', () => {
        // Arrange
        const expectedState: IPaneElementState =
        {
            PaneElements: {
                'first': <Text>first</Text>,
                'second': <Text>second</Text>,
                'third': <Text>third</Text>,
            }
        }

        // Act
        store.dispatch(pushElement('first', <Text>first</Text>,))
        store.dispatch(pushElement('second', <Text>second</Text>,))
        store.dispatch(pushElement('third', <Text>third</Text>,))
        store.dispatch(removePaneElementByKey('does not exist'))
        const data = store.getState().PaneElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })


})