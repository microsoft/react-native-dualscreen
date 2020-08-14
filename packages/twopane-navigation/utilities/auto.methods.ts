import utility from './utility.methods';
import dualScreen from '../dualScreen/dualScreenStore/dualScreen.methods';
import singleScreen from '../singleScreen/singleScreenStore/singleScreen.methods';
import { ReactElement } from 'react';
import { IHeader } from '../Shared/screenStore/headerStore/header.interface';


/**
 * Automatically pushes element to the top of the stack based on screen size.
 */
const Add = (key: string, element: ReactElement, header?: IHeader, isMergeSingle = false, isMergeDual = false) => {
  if (utility.isDualScreen()) {
    dualScreen.Add(key, element, header, isMergeDual);
  } else {
    singleScreen.Add(key, element, header, isMergeSingle);
  }
};

/**
 * Automatically pushes element to the top of stack or if the key is already in the stack,
    move that key to the top of the stack based on screen size
 */
const AddOrMoveToFront = (key: string, element: ReactElement, header?: IHeader, isMergeSingle = false, isMergeDual = false,) => {
  if (utility.isDualScreen()) {
    dualScreen.AddOrMoveToFront(key, element, header, isMergeDual);
  } else {
    singleScreen.AddOrMoveToFront(key, element, header, isMergeSingle);
  }
};

/**
 * Automatically pushes element to the top of stack or if the key is already in the  dual screen stack,
    move that key to the top of the dual screen stack based on screen size
 */
const AddOrMoveToFrontDual = (key: string, element: ReactElement, header?: IHeader, isMergeSingle = false, isMergeDual = false,) => {
  if (utility.isDualScreen()) {
    dualScreen.AddOrMoveToFront(key, element, header, isMergeDual);
  } else {
    singleScreen.Add(key, element, header, isMergeSingle);
  }
};

/**
 * Automatically pushes element to the top of stack or if the key is already in the single screen stack,
    move that key to the top of the single screen stack based on screen size
 */
const AddOrMoveToFrontSingle = (key: string, element: ReactElement, header?: IHeader, isMergeSingle = false, isMergeDual = false,) => {
  if (utility.isDualScreen()) {
    dualScreen.Add(key, element, header, isMergeDual);
  } else {
    singleScreen.AddOrMoveToFront(key, element, header, isMergeSingle);
  }
};

/**
 * Automatically Removes all elements of the stack and returns the base element of the screen stack based on screen size
 */
const BackToHome = () => {
  if (utility.isDualScreen()) {
    dualScreen.BackToHome();
  } else {
    singleScreen.BackToHome();
  }
};


/**
 * Automatically go back one element in the stack based on screen size
 */
const GoBack = () => {
  if (utility.isDualScreen()) {
    dualScreen.GoBack();
  } else {
    singleScreen.GoBack();
  }
};

/**
 * Automatically replace element in the stack based on screen size
 */
const ReplaceScreen = (key: string, duexElement: React.ReactElement) => {
  if (utility.isDualScreen()) {
    dualScreen.ReplaceScreen(key, duexElement);
  } else {
    singleScreen.ReplaceScreen(key, duexElement);
  }
};


/**
 * Automatically replace header in the stack based on screen size
 */
const ReplaceHeader = (key: string, header: IHeader) => {
  if (utility.isDualScreen()) {
    dualScreen.ReplaceHeader(key, header);
  } else {
    singleScreen.ReplaceHeader(key, header);
  }
};



const _autoScreenFunctions = {
  Add,
  AddOrMoveToFront,
  AddOrMoveToFrontDual,
  AddOrMoveToFrontSingle,
  BackToHome,
  GoBack,
  ReplaceScreen,
  ReplaceHeader
};

type autoScreenFunctions = typeof _autoScreenFunctions;

const autoScreen: autoScreenFunctions = _autoScreenFunctions;

export default autoScreen;
