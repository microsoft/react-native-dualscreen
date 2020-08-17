import utility from './utility.methods';
import twoPane from '../twoPane/twoPaneStore/twoPane.methods';
import onePane from '../onePane/onePaneStore/onePane.methods';
import react, { ReactElement } from 'react';
import { IHeader } from '../Shared/screenStore/headerStore/header.interface';


/**
 * Automatically pushes element to the top of the stack based on screen size.
 */
const Add = (key: string, element: ReactElement, header?: IHeader, isMergeONE = false, isMergeTWO = false) => {
  if (utility.isTwoPane()) {
    twoPane.Add(key, element, header, isMergeTWO);
  } else {
    onePane.Add(key, element, header, isMergeONE);
  }
};

/**
 * Automatically pushes element to the top of stack or if the key is already in the stack,
    move that key to the top of the stack based on screen size
 */
const AddOrMoveToFront = (key: string, element: ReactElement, header?: IHeader, isMergeONE = false, isMergeTWO = false,) => {
  if (utility.isTwoPane()) {
    twoPane.AddOrMoveToFront(key, element, header, isMergeTWO);
  } else {
    onePane.AddOrMoveToFront(key, element, header, isMergeONE);
  }
};

/**
 * Automatically pushes element to the top of stack or if the key is already in the  TWO screen stack,
    move that key to the top of the TWO screen stack based on screen size
 */
const AddOrMoveToFrontTWO = (key: string, element: ReactElement, header?: IHeader, isMergeONE = false, isMergeTWO = false,) => {
  if (utility.isTwoPane()) {
    twoPane.AddOrMoveToFront(key, element, header, isMergeTWO);
  } else {
    onePane.Add(key, element, header, isMergeONE);
  }
};

/**
 * Automatically pushes element to the top of stack or if the key is already in the ONE screen stack,
    move that key to the top of the ONE screen stack based on screen size
 */
const AddOrMoveToFrontONE = (key: string, element: ReactElement, header?: IHeader, isMergeONE = false, isMergeTWO = false,) => {
  if (utility.isTwoPane()) {
    twoPane.Add(key, element, header, isMergeTWO);
  } else {
    onePane.AddOrMoveToFront(key, element, header, isMergeONE);
  }
};

/**
 * Automatically Removes all elements of the stack and returns the base element of the screen stack based on screen size
 */
const BackToHome = () => {
  if (utility.isTwoPane()) {
    twoPane.BackToHome();
  } else {
    onePane.BackToHome();
  }
};


/**
 * Automatically go back one element in the stack based on screen size
 */
const GoBack = () => {
  if (utility.isTwoPane()) {
    twoPane.GoBack();
  } else {
    onePane.GoBack();
  }
};

/**
 * Automatically replace element in the stack based on screen size
 */
const ReplaceScreen = (key: string, twoPaneElement: React.ReactElement) => {
  if (utility.isTwoPane()) {
    twoPane.ReplaceScreen(key, twoPaneElement);
  } else {
    onePane.ReplaceScreen(key, twoPaneElement);
  }
};


/**
 * Automatically replace header in the stack based on screen size
 */
const ReplaceHeader = (key: string, header: IHeader) => {
  if (utility.isTwoPane()) {
    twoPane.ReplaceHeader(key, header);
  } else {
    onePane.ReplaceHeader(key, header);
  }
};



const _autoPaneFunctions = {
  Add,
  AddOrMoveToFront,
  AddOrMoveToFrontTWO,
  AddOrMoveToFrontONE,
  BackToHome,
  GoBack,
  ReplaceScreen,
  ReplaceHeader
};

type autoPaneFunctions = typeof _autoPaneFunctions;

const autoPane: autoPaneFunctions = _autoPaneFunctions;

export default autoPane;
