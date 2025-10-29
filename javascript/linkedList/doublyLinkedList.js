class Node {
	constructor(val, prev, next) {
		this.val = val
		this.next = next || null
		this.prev = prev || null
	}
}

class DoublyLinkedList {
	#invalidIndexError = new Error("Invalid index")
	#invalidValError = new Error("Invalid node val")
	#head
	#end
	constructor(vals) {
		this.#createNodes(vals)
		this.length = vals.length
	}
	#createNodes(vals) {
		if (!vals.length) {
			this.#head = null
			this.#end = null
			return
		}
		const nodes = vals.map(val => new Node(val))
		nodes.forEach((n, i) => {
			n.prev = nodes[i - 1] || null
			n.next = nodes[i + 1] || null
		})
		this.#head = nodes[0]
		this.#end = nodes[nodes.length - 1]
	}
	#traverse(index) {
		let startNode, direction, stopIndex
		if (index <= Math.floor(this.length / 2)) {
			startNode = this.#head
			direction = "next"
			stopIndex = index
		} else {
			startNode = this.#end
			direction = "prev"
			stopIndex = this.length - index + 1
		}
		let currNode = startNode
		let count = 1
		while (true) {
			if (count === stopIndex) return currNode
			if (!currNode[direction]) break
			currNode = currNode[direction]
			count++
		}
		return null
	}
	#create(val, prev, next) {
		const newNode = new Node(val, prev, next)
		if (prev) prev.next = newNode
		if (next) next.prev = newNode
		return newNode
	}
	insert(val, index) {
		if (index > this.length) throw this.#invalidIndexError
		if (index === 0) this.#insertStart(val)
		if (index === this.length) this.#insertEnd(val)
		else this.#insertMiddle(val, index)
		this.length++
	}
	#insertMiddle(val, index) {
		const node = this.#traverse(index)
		this.#create(val, node, node.next)
	}
	#insertStart(val) {
		const newNode = this.#create(val, null, this.#head)
		this.#head = newNode
	}
	#insertEnd(val) {
		const newNode = this.#create(val, this.#end, null )
		this.#end = newNode
	}
	#remove(prev, next) {
		if (prev) prev.next = next
		if (next) next.prev = prev
	}
	del(index) {
		if (index > this.length || index === 0) throw this.#invalidIndexError
		if (index === 1) return this.#delStart()
		if (index === this.length) return this.#delEnd()
		else return this.#delMiddle(index)
	}
	#delStart() {
		this.#remove(null, this.#head.next)
		const deletedVal = this.#head.val
		this.#head = this.#head.next
		this.length--
	}
	#delEnd() {
		const deletedVal = this.#end.val
		this.#remove(this.#end.prev, null)
		this.#end = this.#end.prev
		this.length--
	}
	#delMiddle(index) {
		const node = this.#traverse(index)
		this.#remove(node.prev, node,next)
		this.length--
	}
	get(index) {
		const node = this.#traverse(index)
		if (node) return node.val
		throw this.#invalidValError
	}
	getAll() {
		let currNode = this.#head
		const vals = []
		while (true) {
			vals.push(currNode.val)
			if (!currNode.next) break
			currNode = currNode.next
		}
		return vals
	}
}

module.exports = { DoublyLinkedList, Node }