class Node {
	constructor(val, next) {
		this.val = val
		this.next = next || null
	}
}

class SinglyLinkedList {
	#invalidIndexError = new Error("Invalid index")
	#invalidValError = new Error("Invalid val")
	#head
	#end
	constructor(vals) {
		this.#createNodes(vals)
	}
	#createNodes(vals) {
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
	#getByVal(val) {
		let currNode = this.#head
		while (true) {
			if (currNode.val === val) return currNode
			if (currNode.next) currNode = currNode.next
			else return null
		}
	}
	#traverse(index) {
		if (index > this.length) return null
		let currNode = this.#head
		let count = 1
		while (true) {
			if (count === index) return currNode
			if (currNode.next) currNode = currNode.next
			else return null
			count++
		}
	}
	#create(val, prev, next) {
		const newNode = new Node(val, next)
		if (prev) prev.next = newNode
		return newNode
	}
	insert(val, index) {
		if (index > this.length) throw this.#invalidIndexError
		if (index === 0) return this.#insertStart(val)
		if (index === this.length) return this.#insertEnd(val, index)
		this.#insertMiddle(val, index)
	}
	#insertStart(val) {
		const newNode = this.#create(val, null, this.#head)
		this.#head = newNode
		this.length++
	}
	#insertMiddle(val, index) {
		const prev = this.#traverse(index)
		this.#create(val, prev, prev.next)
		this.length++
	}
	#insertEnd(val) {
		const newNode = this.#create(val, this.#end, null)
		this.#end = newNode
		this.length++
	}
	#remove(prev, next) {
		if (prev) prev.next = next
	}
	del(index) {
		if (index > this.length) throw this.#invalidIndexError
		if (index === 1) return this.#delStart()
		if (index === this.length) return this.#delEnd()
		this.#delMiddle(index)
		this.length--
	}
	#delStart() {
		this.#remove(null, this.#head.next)
		const deletedVal = this.#head.val
		this.#head = this.#head.next
		this.length--
		return deletedVal
	}
	#delMiddle(index) {
		const node = this.#traverse(index - 1)
		this.#remove(node, node.next.next)
		this.length--
		return node.val
	}
	#delEnd() {
		const deletedVal = this.#end.val
		this.#remove(this.#end.prev, null)
		this.#end = this.#end.prev
		this.length--
		return deletedVal
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
	} // use generator to implement an iterator for getAll
	get(index) {
		const node = this.#traverse(index)
		if (!node) throw this.#invalidIndexError
		return node.val
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
