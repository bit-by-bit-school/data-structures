class PriorityQueue {
  storage = [];
  constructor(objs) {
    this.storage = objs.sort((a, b) => b.val - a.val);
  }
  enqueue(newObj) {
    if (!this.storage.length) {
        this.storage.push(newObj)
        return
    }
    for (let [i, obj] of this.storage.entries()) {
      if (obj.val < newObj.val) {
        this.storage = [
          ...this.storage.slice(0, i),
          newObj,
          ...this.storage.slice(i, this.storage.length),
        ];
        break;
      }
    }
    this.storage.push(newObj)
  }
  dequeue() {
    return this.storage.pop();
  }
  getAll() {
    return this.storage;
  }
  *[Symbol.iterator]() {
    yield* this.storage.entries();
  }
  delete(obj) {
    for (let [i, n] of this.storage.entries()) {
      if (obj === n) {
        this.storage = [
          ...this.storage.slice(0, i),
          ...this.storage.slice(i + 1, this.storage.length),
        ];
        break;
      }
    }
  }
}

module.exports = { PriorityQueue };

// implement deck
