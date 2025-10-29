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
  *[Symbol.iterator]() {
    yield* this.storage.entries();
  }
}

module.exports = { PriorityQueue };

// implement deck
