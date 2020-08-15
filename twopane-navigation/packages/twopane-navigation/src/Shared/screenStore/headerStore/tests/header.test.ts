import { IHeaderState } from "../header.interface"
import { headerObjectBuilder } from "./header.methods.helpers"
import { store, resetApp } from "../../../../appStore"
import { pushHeader, replaceHeader, removeHeaderByKey } from "../header.actions"

describe('headerStore tests', () => {
    beforeEach(() => {
        store.dispatch(resetApp())
    });

    it('PUSH_HEADER', () => {
        // Arrange
        const expectedState: IHeaderState =
        {
            headers: headerObjectBuilder('first', { title: 'first' })
        }

        // Act
        store.dispatch(pushHeader('first', { title: 'first' }))
        const data = store.getState().headerReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('PUSH_HEADER Multiple', () => {
        // Arrange
        const expectedState: IHeaderState =
        {
            headers: {
                'first': { title: 'first' },
                'second': { title: 'second' },
                'third': { title: 'third' },

            }
        }

        // Act
        store.dispatch(pushHeader('first', { title: 'first' }))
        store.dispatch(pushHeader('second', { title: 'second' }))
        store.dispatch(pushHeader('third', { title: 'third' }))
        const data = store.getState().headerReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REPLACE_HEADER', () => {
        // Arrange
        const expectedState: IHeaderState = {
            headers: headerObjectBuilder('first', { title: 'second' })
        }

        // Act 
        store.dispatch(pushHeader('first', { title: 'first' }))
        store.dispatch(replaceHeader('first', { title: 'second' }))
        const data = store.getState().headerReducer

        // Assert
        expect(data).toStrictEqual(expectedState);

    })

    it('REPLACE_HEADER Multiple', () => {
        // Arrange
        const expectedState: IHeaderState = {
            headers: headerObjectBuilder('first', { title: 'fifth' })
        }

        // Act 
        store.dispatch(pushHeader('first', { title: 'first' }))
        store.dispatch(replaceHeader('first', { title: 'second' }))
        store.dispatch(replaceHeader('first', { title: 'third' }))
        store.dispatch(replaceHeader('first', { title: 'fourth' }))
        store.dispatch(replaceHeader('first', { title: 'fifth' }))

        const data = store.getState().headerReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REPLACE_HEADER not found', () => {
        // Arrange
        const expectedState: IHeaderState = {
            headers: headerObjectBuilder('first', { title: 'first' })
        }

        // Act 
        store.dispatch(pushHeader('first', { title: 'first' }))
        store.dispatch(replaceHeader('does not exist', { title: 'second' }))
        const data = store.getState().headerReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REMOVE_KEY_HEADER', () => {
        // Arrange
        const expectedState: IHeaderState =
        {
            headers: {
                'first': { title: 'first' },
                'third': { title: 'third' },

            }
        }
        // Act
        store.dispatch(pushHeader('first', { title: 'first' }))
        store.dispatch(pushHeader('second', { title: 'second' }))
        store.dispatch(pushHeader('third', { title: 'third' }))
        store.dispatch(removeHeaderByKey('second'))
        const data = store.getState().headerReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REMOVE_KEY_HEADER Multiple', () => {
        // Arrange
        const expectedState: IHeaderState =
        {
            headers: {
                'first': { title: 'first' },
                'third': { title: 'third' },
                'fifth': { title: 'fifth' }

            }
        }
        // Act
        store.dispatch(pushHeader('first', { title: 'first' }))
        store.dispatch(pushHeader('second', { title: 'second' }))
        store.dispatch(pushHeader('third', { title: 'third' }))
        store.dispatch(pushHeader('fourth', { title: 'fourth' }))
        store.dispatch(pushHeader('fifth', { title: 'fifth' }))

        store.dispatch(removeHeaderByKey('second'))
        store.dispatch(removeHeaderByKey('fourth'))

        const data = store.getState().headerReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })

    it('REMOVE_KEY_HEADER not found ', () => {
        // Arrange
        const expectedState: IHeaderState =
        {
            headers: {
                'first': { title: 'first' },
                'second': { title: 'second' },
                'third': { title: 'third' },
            }
        }
        // Act
        store.dispatch(pushHeader('first', { title: 'first' }))
        store.dispatch(pushHeader('second', { title: 'second' }))
        store.dispatch(pushHeader('third', { title: 'third' }))
        store.dispatch(removeHeaderByKey('does not exist'))
        const data = store.getState().headerReducer

        // Assert
        expect(data).toStrictEqual(expectedState);
    })


})