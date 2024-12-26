const {
  CircularDoublyLinkedList,
  Node,
} = require("../linkedList/circularDoublyLinkedList.js");

class PriorityQueue {
  #storage;
  constructor(vals) {
    const ll = new CircularDoublyLinkedList(vals.sort((a, b) => b - a));
    this.#storage = ll;
  }
  enqueue(val) {
    for (let [node, i] of this.#storage) {
      if (node < val) {
        this.#storage.insert(val, i - 1);
        break
      }
    }
  }
  dequeue() {
    return this.#storage.del(this.#storage.length); // -1 without knowing length
  }
  getAll() {
    return this.#storage.getAll();
  }
}

module.exports = { PriorityQueue };

// implement deck
