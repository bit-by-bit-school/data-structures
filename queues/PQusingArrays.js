class PriorityQueue {
  storage = [];
  length = 0;
  constructor(objs) {
    this.storage = objs.sort((a, b) => b.val - a.val);
    this.length = objs.length;
  }
  enqueue(newObj) {
    if (!this.storage.length) {
      this.storage.push(newObj);
      this.length++;
      return;
    }
    for (let [i, obj] of this.storage.entries()) {
      if (obj.val < newObj.val) {
        this.storage = [
          ...this.storage.slice(0, i),
          newObj,
          ...this.storage.slice(i, this.storage.length),
        ];
        this.length++;
        return;
      }
    }
    this.storage.push(newObj);
    this.length++;
  }
  dequeue() {
      this.length--;
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
        this.length--;
        return;
      }
    }
  }
  set(v, val) {
    for (let obj of this.storage) {
      if (obj.v === v) {
        obj.val = val;
        return;
      }
    }
  }
  get(v) {
    for (let obj of this.storage) {
      if (obj.v === v) {
        return obj.val;
      }
    }
  }
}

module.exports = { PriorityQueue };

// implement deck
