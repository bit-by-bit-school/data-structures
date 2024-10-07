const { CircularDoublyLinkedList, Node } = require("./circularDoublyLinkedList.js")

class Queue {
	#storage
	constructor(vals) {
		const ll = new CircularDoublyLinkedList(vals)
		this.#storage = ll
	}
	enqueue(val) {
		this.#storage.insert(val, this.#storage.length) // -1 without knowing length
	}
	dequeue() {
		return this.#storage.del(1)
	}
	getAll() {
		return this.#storage.getAll()
	}
}

module.exports = { Queue }

// implement deck

