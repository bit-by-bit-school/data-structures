class Node {
	constructor(val, prev, next) {
		this.val = val
		this.next = next || null
		this.prev = prev || null
	}
}

class CircularDoublyLinkedList {
	constructor(vals) {
		if (!vals.length) {
			this.head = null
			this.length = 0
		}
		let refs = this._createNodes(vals)
		this.head = refs[0]
		this.head.prev = refs[1]
		refs[1].next = this.head
		this.length = vals.length
	}
	_createNodes(vals) {
		vals = vals.map(val => new Node(val))
		vals.forEach((n, i) => {
			n.prev = vals[i - 1] || null
			n.next = vals[i + 1] || null
		})
		return [vals[0], vals[vals.length - 1]]
	}
	#traverse(startNode, direction, index) {
		let currNode = startNode
		let count = 1
		while (true) {
			if (count === index) return currNode
			if (currNode[direction] === startNode) break
			currNode = currNode[direction]
			count++
		}
		return null
	}
	#getEnd() {
		return this.head.prev
	}
	insert(val, index) {
		if (index > this.length) throw this._invalidIndexError
		if (index === 0) return this._insertStart(val)
		if (index === this.length) return this._insertEnd(val)
		else return this._insertMiddle(val, index)
	}
	_insertStart(val) {
		const end = this.#getEnd()
		const oldHead = this.head
		this.head = new Node(val, null, oldHead)
		oldHead.prev = this.head
		this.length++
		end.next = this.head
		this.head.prev = end
	}
	_insertEnd(val) {
		const node = new Node(val, this.#getEnd(), this.head)
		this.#getEnd().next = node
		this.head.prev = node
		this.length++
	}
	_insertMiddle(val, index) {
		const node = (index <= Math.floor(this.length / 2)) ?
			this.#traverse(this.head, "next", index) :
			this.#traverse(this.#getEnd(), "prev", this.length - index + 1)
		const newNode = new Node(val, node, node.next)
		node.next = newNode
		newNode.next.prev = newNode
		this.length++
	}
	del(index) {
		if (index > this.length || index === 0) throw this._invalidIndexError
		if (index === 1) return this._delStart()
		if (index === this.length) return this._delEnd()
		else return this._delMiddle(index)
	}
	_delEnd() {
		const end = this.#getEnd()
		const prev = end.prev
		const next = end.next
		prev.next = next
		next.prev = prev
		this.length--
		return end.val
	}
	_delStart() {
		const deletedVal = this._delMiddle(1)
		this.head = this.head.next
		return deletedVal
	}
	_delMiddle(index) {
		const node = (index <= Math.floor(this.length / 2)) ?
			this.#traverse(this.head, "next", index) :
			this.#traverse(this.#getEnd(), "prev", this.length - index + 1)
		node.prev.next = node.next
		node.next.prev = node.prev
		this.length--
		return node.val
	}
	get(index) {
		const node = (index <= Math.floor(this.length / 2)) ?
			this.#traverse(this.head, "next", index) :
			this.#traverse(this.#getEnd(), "prev", this.length - index + 1)
		if (node) return node.val
		throw this._invalidValError
	}
	getAll() {
		let currNode = this.head
		const vals = []
		while (true) {
			vals.push(currNode.val)
			if (currNode.next === this.head) break
			currNode = currNode.next
		}
		return vals
	}
}

module.exports = { CircularDoublyLinkedList, Node }