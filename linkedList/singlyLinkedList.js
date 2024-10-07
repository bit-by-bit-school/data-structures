class Node {
	constructor(val, next) {
		this.val = val
		this.next = next || null
	}
}

class SinglyLinkedList {
	#invalidIndexError = new Error("Invalid index")
	#head
	#end
	constructor(vals) {
		if (!vals.length) {
			this.#head = null
			this.#end = null
			this.length = 0
			return
		}
		this.#end = new Node(vals[vals.length - 1], null)
		this.#head = vals.slice(0, vals.length - 1)
			.reduceRight((acc, curr) => {
				return new Node(curr, acc)
			}, this.#end)
		this.length = vals.length

	}
	#traverse(index) {
		let currNode = this.#head
		let count = 1
		while (true) {
			if (count === index) return currNode
			if (!currNode.next) break
			currNode = currNode.next
			count++
		}
		return null
	}
	insert(val, index) {
		if (index > this.length) throw this.#invalidIndexError
		if (index === 0) {
			this.#head = new Node(val, this.#head)
			this.length++
			return
		}
		if (index === this.length) {
			this.#end.next = new Node(val, null)
			this.#end = this.#end.next
			this.length++
			return
		}
		const node = this.#traverse(index)
		node.next = new Node(val, node.next)
		this.length++
	}
	del(index) {
		if (index > this.length) throw this.#invalidIndexError
		if (index - 1 === 0) {
			this.#head = this.#head.next
			this.length--
			return
		}
		const node = this.#traverse(index - 1)
		if (index === this.length) {
			this.#end = node
			node.next = null
			this.length--
			return
		}
		node.next = node.next.next
		this.length--
	}
	get(index) {
		const node = this.#traverse(index)
		if (node) return node.val
		throw this.#invalidIndexError
	}
	getAll() {
		let currNode = this.#head
		const vals = []
		while (true) {
			vals.push(currNode.val)
			currNode = currNode.next
			if (!currNode) break
		}
		return vals
	}
	reverse() {
		let prevHead = this.#head
		let prevEnd = this.#end
		this.#end = prevHead
		this.#head = prevEnd

		let currNode = prevHead
		let nextNode = currNode.next
		let prevNode = null

		while (nextNode) {
			currNode.next = prevNode
			prevNode = currNode
			currNode = nextNode
			nextNode = nextNode.next
		}
		currNode.next = prevNode
	}
}

module.exports = { SinglyLinkedList }
