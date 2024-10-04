class Node {
	constructor(val, prev, next) {
		this.val = val
		this.next = next || null
		this.prev = prev || null
	}
}

class DoublyLinkedList {
	_invalidIndexError = new Error("Invalid index")
	_invalidValError = new Error("Invalid node val")
	_createNodes(vals) {
		vals = vals.map(val => new Node(val))
		vals.forEach((n, i) => {
			n.prev = vals[i - 1] || null
			n.next = vals[i + 1] || null
		})
		return [vals[0], vals[vals.length - 1]]
	}
	constructor(vals) {
		if (!vals.length) {
			this.head = null
			this.end = null
			this.length = 0
			return
		}
		this.length = vals.length
		let refs = this._createNodes(vals)
		this.head = refs[0]
		this.end = refs[1]
	}
	_traverse(startNode, direction, stopCondition, op, filter, init) {
		console.log("stopCondition", stopCondition.toString(), "startnode", startNode, "direction", direction, "op", op, "filter", filter, "init", init)
		let currNode = startNode
		let index = 1
		let acc = init
		while (true) {
			console.log("currNode", currNode)
			if (filter(currNode, index)) {
				acc = op(acc, currNode)
			}
			if (stopCondition(currNode)) break
			currNode = currNode[direction]
			index++
		}
		console.log("acc", acc)
		return acc
	}
	#find = (startNode, direction, index) => this._traverse(startNode, direction, (node) => !node[direction], (acc, curr) => curr,
		(node, i) => i === index
	)
	insert(val, index) {
		if (index > this.length) throw this._invalidIndexError
		if (index === 0) this._insertStart(val)
		if (index === this.length) this._insertEnd(val)
		else this._insertMiddle(val, index)
	}
	_insertMiddle(val, index) {
		const node = (index <= Math.floor(this.length / 2)) ?
			this.#find(this.head, "next", index) :
			this.#find(this.end, "prev", this.length - index + 1)
		const newNode = new Node(val, node, node.next)
		node.next = newNode
		newNode.next.prev = newNode
		console.log("traversed node", node, "new node", newNode)
		this.length++
	}
	_insertStart(val) {
		const oldHead = this.head
		this.head = new Node(val, null, oldHead)
		oldHead.prev = this.head
		this.length++
	}
	_insertEnd(val) {
		const oldEnd = this.end
		this.end = new Node(val, oldEnd, null)
		oldEnd.next = this.end
		this.length++
	}
	del(index) {
		if (index > this.length || index === 0) throw this._invalidIndexError
		if (index === this.length) this._delEnd()
		else this._delMiddle(index)
	}
	_delEnd() {
		this.end.prev.next = null
		this.end = this.end.prev
		this.length--
	}
	_delMiddle(index) {
		const node = (index <= Math.floor(this.length / 2)) ?
			this.#find(this.head, "next", index) :
			this.#find(this.end, "prev", this.length - index)
		node.prev.next = node.next
		node.next.prev = node.prev
		this.length--
	}
	_getByVal(val) {
		if (this.length === 0) throw this._invalidValError
		const node = this._traverse(this.head, "next", (node) => !node.next, (acc, curr) => curr,
			(node, i) => node.val === val
		)
		if (node) return node
		throw this._invalidValError
	}
	_get(index) {
		const node = (index <= Math.floor(this.length / 2)) ?
			this.#find(this.head, "next", index) :
			this.#find(this.end, "prev", this.length - index + 1)
		if (node) return node.val
		throw this._invalidValError
	}
	getAll() {
		return this._traverse(this.head, "next", (node) => !node.next, (acc, curr) => [...acc, curr.val], (node, i) => true, [])
	}
}

module.exports = { DoublyLinkedList, Node }