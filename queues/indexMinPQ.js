class IndexMinPQ {
    storage = [];
    length = 0;
    constructor(objs) {
      this.storage = objs.sort((a, b) => b.priority - a.priority);
      this.length = objs.length;
    }
    insert(newObj) {
      if (!this.storage.length) {
        this.storage.push(newObj);
        this.length++;
        return;
      }
      for (let [i, obj] of this.storage.entries()) {
        if (obj.priority < newObj.priority) {
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
    getMin() {
        this.length--;
        return this.storage.pop();
    }
    *[Symbol.iterator]() {
      yield* this.storage.entries();
    }
    delete(key) {
      for (let [i, obj] of this.storage.entries()) {
        if (obj.key === key) {
          this.storage = [
            ...this.storage.slice(0, i),
            ...this.storage.slice(i + 1, this.storage.length),
          ];
          this.length--;
          return;
        }
      }
    }
    set(key, val) {
      for (let obj of this.storage) {
        if (obj.key === key) {
          obj.val = val;
          return;
        }
      }
    }
    get(key) {
      for (let obj of this.storage) {
        if (obj.key === key) {
          return obj.val;
        }
      }
    }
  }

  module.exports = { IndexMinPQ };