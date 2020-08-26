import utility from './utility.methods';
import twoPane from '../twoPane/twoPaneStore/twoPane.methods';
import onePane from '../onePane/onePaneStore/onePane.methods';
import react, { ReactElement } from 'react';
import { IHeader } from '../shared/screenStore/headerStore/header.interface';


/**
 * Pushes element to the top of the stack or replaces the original with the new element
 */
const Add = (key: string, element: ReactElement, header?: IHeader, isMergeONE = false, isMergeTWO = false) => {
  if (utility.isTwoPane()) {
    twoPane.Add(key, element, header, isMergeTWO);
  } else {
    onePane.Add(key, element, header, isMergeONE);
  }
};

/**
 * Pushes element to the top of the stack or moves the original to the top of the stack
 */
const AddOrMoveToFront = (key: string, element: ReactElement, header?: IHeader, isMergeONE = false, isMergeTWO = false) => {
  if (utility.isTwoPane()) {
    twoPane.AddOrMoveToFront(key, element, header, isMergeTWO);
  } else {
    onePane.AddOrMoveToFront(key, element, header, isMergeONE);
  }
};

/**
 * Automatically pushes element to the top of stack or if the key is already in the twoPane stack,
    move that key to the top of the twoPane stack based on active panes
 */
const AddOrMoveToFrontTWO = (key: string, element: ReactElement, header?: IHeader, isMergeONE = false, isMergeTWO = false,) => {
  if (utility.isTwoPane()) {
    twoPane.AddOrMoveToFront(key, element, header, isMergeTWO);
  } else {
    onePane.Add(key, element, header, isMergeONE);
  }
};

/**
 * Automatically pushes element to the top of stack or if the key is already in the onePane stack,
    move that key to the top of the onePane stack based on active panes
 */
const AddOrMoveToFrontONE = (key: string, element: ReactElement, header?: IHeader, isMergeONE = false, isMergeTWO = false,) => {
  if (utility.isTwoPane()) {
    twoPane.Add(key, element, header, isMergeTWO);
  } else {
    onePane.AddOrMoveToFront(key, element, header, isMergeONE);
  }
};

/**
 * Automatically Removes all elements of the stack and returns the base element of the Pane stack based on active panes
 */
const BackToHome = () => {
  if (utility.isTwoPane()) {
    twoPane.BackToHome();
  } else {
    onePane.BackToHome();
  }
};

/**
 * Automatically go back one element in the stack based on pane
 */
const GoBack = () => {
  if (utility.isTwoPane()) {
    twoPane.GoBack();
  } else {
    onePane.GoBack();
  }
};

/**
 * Automatically replace element in the stack based on activeP panes
 */
const ReplacePane = (key: string, twoPaneElement: React.ReactElement) => {
  if (utility.isTwoPane()) {
    twoPane.ReplacePane(key, twoPaneElement);
  } else {
    onePane.ReplacePane(key, twoPaneElement);
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
  ReplacePane,
  ReplaceHeader
};

type autoPaneFunctions = typeof _autoPaneFunctions;

const autoPane: autoPaneFunctions = _autoPaneFunctions;

export default autoPane;

