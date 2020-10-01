import { IPaneElementState } from "../paneElement.interface"
import { paneElementObjectBuilder } from "./paneElement.methods.helpers"
import React, { Fragment } from 'react';
import { pushElement, replacePaneElement, removePaneElementByKey } from "../PaneElement.action"
import { store, resetApp } from "../../../../appStore";
import { Text } from "react-native";

describe('PaneElementStore tests', () => {
    afterEach(() => {
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
            PaneElements: paneElementObjectBuilder('first', <Fragment key='second' />)
        }

        // Act 
        store.dispatch(pushElement('first', <Fragment key='first' />))
        store.dispatch(replacePaneElement('first', <Fragment key='second' />))
        const data = store.getState().PaneElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);

    })

    it('REPLACE_PANE_ELEMENT Multiple', () => {
        // Arrange
        const expectedState: IPaneElementState = {
            PaneElements: paneElementObjectBuilder('first',<Fragment key='fifth' />)
        }

        // Act 
        store.dispatch(pushElement('first', <Fragment key='first' />))
        store.dispatch(replacePaneElement('first', <Fragment key='second' />))
        store.dispatch(replacePaneElement('first', <Fragment key='third' />))
        store.dispatch(replacePaneElement('first', <Fragment key='fourth' />))
        store.dispatch(replacePaneElement('first', <Fragment key='fifth' />))
        const data = store.getState().PaneElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REPLACE_PANE_ELEMENT not found', () => {
        // Arrange
        const expectedState: IPaneElementState = {
            PaneElements: paneElementObjectBuilder('first',<Fragment key='first' />)
        }

        // Act 
        store.dispatch(pushElement('first', <Fragment key='first' />))
        store.dispatch(replacePaneElement('does not exist', <Fragment key='second' />))
        const data = store.getState().PaneElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REMOVE_KEY_PANE_ELEMENT', () => {
        // Arrange
        const expectedState: IPaneElementState =
        {
            PaneElements: {
                'first': <Fragment key='first' />,
                'third': <Fragment key='third' />,
            }
        }

        // Act
        store.dispatch(pushElement('first',<Fragment key='first' />))
        store.dispatch(pushElement('second',<Fragment key='second' />))
        store.dispatch(pushElement('third', <Fragment key='third' />))
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
                'first': <Fragment key='first' />,
                'third': <Fragment key='third' />,
                'fifth': <Fragment key='fifth' />,
            }
        }

        // Act
        store.dispatch(pushElement('first', <Fragment key='first' />,))
        store.dispatch(pushElement('second', <Fragment key='second' />,))
        store.dispatch(pushElement('third', <Fragment key='third' />,))
        store.dispatch(pushElement('fourth', <Fragment key='fourth' />,))
        store.dispatch(pushElement('fifth', <Fragment key='fifth' />,))
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
                'first': <Fragment key='first' />,
                'second': <Fragment key='second' />,
                'third': <Fragment key='third' />,
            }
        }

        // Act
        store.dispatch(pushElement('first', <Fragment key='first' />,))
        store.dispatch(pushElement('second', <Fragment key='second' />,))
        store.dispatch(pushElement('third', <Fragment key='third' />,))
        store.dispatch(removePaneElementByKey('does not exist'))
        const data = store.getState().PaneElementReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })


})