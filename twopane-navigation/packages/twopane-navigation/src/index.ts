// components


export {default as DualApp} from './components/dualApp/DualApp'
export {default as ScreenOverlay} from './components/screenOverlay/ScreenOverlay'

// methods
export {default as singleScreen} from './singleScreen/singleScreenStore/singleScreen.methods'
export {default as dualScreen} from './dualScreen/dualScreenStore/dualScreen.methods'
export {default as autoScreen}from './utilities/auto.methods'
export {default as utility} from './utilities/utility.methods'

/// STORES ///
// header
export * from './Shared/screenStore/headerStore/header.actions'
export * from './Shared/screenStore/headerStore/header.interface'
export * from './Shared/screenStore/headerStore/header.reducer'
export * from './Shared/screenStore/headerStore/header.selector'
export * from './Shared/screenStore/headerStore/header.types'

// key
export * from './Shared/screenStore/keyStore/key.actions'
export * from './Shared/screenStore/keyStore/key.interface'
export * from './Shared/screenStore/keyStore/key.reducer'
export * from './Shared/screenStore/keyStore/key.selector'
export * from './Shared/screenStore/keyStore/key.types'

// element
export * from './Shared/screenStore/twoPaneElementStore/twoPaneElement.action'
export * from './Shared/screenStore/twoPaneElementStore/twoPaneElement.interface'
export * from './Shared/screenStore/twoPaneElementStore/twoPaneElement.reducer'
export * from './Shared/screenStore/twoPaneElementStore/twoPaneElement.selectors'
export * from './Shared/screenStore/twoPaneElementStore/twoPaneElement.types'

// Utility
export * from './Shared/utilityStore/utilityStore.actions'
export * from './Shared/utilityStore/utilityStore.interfaces'
export * from './Shared/utilityStore/utilityStore.methods'
export * from './Shared/utilityStore/utilityStore.reducer'
export * from './Shared/utilityStore/utilityStore.selectors'
export * from './Shared/utilityStore/utilityStore.types'


// misc
export * from './utilities/interfaces'




