

interface Array<T> {
    /**
  * Returns the last element from an array.
  */
    peek(): T;
}

Array.prototype.peek = function () {
    if (this.length > 0) {
        return this[this.length - 1];
    }
    // empty array...
    return undefined;    // or another default value...
};

