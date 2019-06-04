/**
 * Diff two list in O(N).
 * @param {Array} oldList - Original List
 * @param {Array} newList - List After certain insertions, removes, or moves
 * @return {Object} - {moves: <Array>}
 *                  - moves is a list of actions that telling how to remove and insert
 */
function diff (oldList, newList, key) {
  var oldMap = makeKeyIndexAndFree(oldList, key)
  var newMap = makeKeyIndexAndFree(newList, key)

  var newFree = newMap.free
  var oldFree = oldMap.free

  var oldKeyIndex = oldMap.keyIndex
  var newKeyIndex = newMap.keyIndex

  var moves = []  // 最终改动

  // a simulate list to manipulate
  var i = 0
  var item
  var itemKey
  // 先删除已经没有的节点 oldList中留下的都是newList中key有的
  while(i < oldList.length) {
    item = oldList[i];
    itemKey = getItemKey(item, key);
    if(itemKey) {
      if (!newKeyIndex.hasOwnProperty(itemKey)) {
        oldList.splice(i, 1);
        patchDelete(i);
      }
    } else { //没有key的留在list中
      i++
    }
  } 

  var j =0;
  //新节点操作
  while(j < newList.length) {
    item = newList[j];
    itemKey = getItemKey(item, key);
    var oldItemKey = getItemKey(oldList[j], key);

    if(itemKey) { // 新节点有key key值不相同
      if(itemKey !== oldItemKey) {
        //没有直接插
        if (!oldKeyIndex.hasOwnProperty(itemKey)) {
          //插入
          oldList.splice(i, 0, item);
          patchInsert(i, item);
        } else {
          // 目标项index 替换
          var targetIndex = oldKeyIndex[itemKey];
          var temp = oldList[targetIndex];
          oldList[i] = temp;
          oldList[targetIndex] = temp;
          // patch move
          patchMove(targetIndex, i);
        }
      }
    } else {
      // 新节点没有key
      var oldItemKey = getItemKey(oldList[j], key);
      // 旧节点有key 则插入无key项
      if(oldItemKey) {
        patchInsert(i, item);
      } 
    }

    j++;
  } 

  // 可能插入没有key的节点导致oldlist长度变大 所以截取一下
  oldList = oldList.slice(0, newList.length);

  patchDelete(index) {
    moves.push({
      type: "delete",
      index: index,
      number: number,
    })
  }

  patchInsert(index, item) {
    moves.push({
      type: "insert",
      index: index,
      item: item
    })
  }

  patchMove(startIndex, endIndex) {
    moves.push({
      type: "move",
      startIndex: startIndex,
      endIndex: endIndex
    })
  }
  
  return {
    moves: moves,
    children: children
  }
}

/**
 * Convert list to key-item keyIndex object.
 * @param {Array} list
 * @param {String|Function} key
 */
function makeKeyIndexAndFree (list, key) {
  /**
   * keyIndex
   * {
   * key1: 1,
   * key2: 2
   * }
   * 
   * free
   * [item3,item4]
   */
  var keyIndex = {}
  var free = []
  for (var i = 0, len = list.length; i < len; i++) {
    var item = list[i]
    var itemKey = getItemKey(item, key)
    if (itemKey) {
      keyIndex[itemKey] = i
    } else {
      free.push(item)
    }
  }
  return {
    keyIndex: keyIndex,
    free: free
  }
}

function getItemKey (item, key) {
  if (!item || !key) return void 666
  return typeof key === 'string'
    ? item[key]
    : key(item)
}

exports.makeKeyIndexAndFree = makeKeyIndexAndFree // exports for test
exports.diff = diff
