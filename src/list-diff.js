export default diff;

function diff(oldList, newList, key) {
  const oldListKeys = getKeys(oldList, key);
  const newListKeys = getKeys(newList, key);
  const oldListLength = oldList.length;
  const newListLength = newList.length;
  const moves = [];

  // record the move of the last element.
  let indexDeltas = new Array(oldListLength).fill(0);
  let _physicalIndex;

  newListKeys.forEach((key, newIndex) => {
    let _physicalIndex = oldListKeys.indexOf(key);

    if (_physicalIndex === -1) {
      // Element doesn't exist in `newList` yet. Tell it to
      // insert it.
      moves.push({
        type: 'INSERT',
        index: newIndex,
        item: newList[newIndex]
      });

      // positions of all unprocessed elements should take this delta.
      indexDeltas[oldListLength - 1]++;
    } else {
      let oldIndex = _physicalIndex + indexDeltas.reduce((prev, delta, i) => {
        if (i >= _physicalIndex) {
          return prev + delta;
        } else {
          return prev;
        }
      });

      // If it is already in place, don't do anything.
      if (newIndex === oldIndex)  return;

      moves.push({
        type: 'MOVE',
        from: oldIndex, 
        to: newIndex
      });

      // It is impossible to move element from front to back.
      indexDeltas[_physicalIndex]++;
    }
  });

  // positions of elements to be removed should take all deltas.
  let indexDelta = indexDeltas.reduce((prev, delta) => prev + delta);
  oldListKeys.forEach((key, i) => {
    
    if (newListKeys.indexOf(key) === -1)
      moves.push({
        type: 'REMOVE',
        index: i + indexDelta
      });
  });

  return moves;
}

// Elements with no `key` field is to be removed.
function getKeys(list, key) {
  return list.map((item, i) => {
    if (key && item) {
      return typeof key === 'function'
        ? key(item)
        : item[key];
    } else  return void 0;
  });
}

