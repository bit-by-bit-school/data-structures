const { CircularDoublyLinkedList, Node } = require("./circularDoublyLinkedList.js")

class Queue {
	#storage
	constructor(vals) {
		const ll = new CircularDoublyLinkedList(vals)
		this.#storage = ll
	}
	enqueue(val) {
		console.log("storage head", this.#storage.head)
		this.#storage.insert(val, this.#storage.length)
	}
	dequeue() {
		return this.#storage.del(1)
	}
	getAll() {
		return this.#storage.getAll()
	}
}

module.exports = { Queue }

