class Node {
	constructor(val, next) {
		this.val = val
		this.next = next || null
	}
}

class LinkedList {
	#invalidIndexError = new Error("Invalid index")
	#invalidValError = new Error("Invalid node val")
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
	#traverse(op, filter, init) {
		let currNode = this.#head
		let index = 1
		let acc = init
		while (true) {
			if (filter(currNode, index)) {
				acc = op(acc, currNode)
			}
			currNode = currNode.next
			if (!currNode) break
			index++
		}
		return acc
	}
	#find = (index) => this.#traverse((acc, curr) => curr,
		(node, i) => i === index
	)
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
		const node = this.#find(index)
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
		const node = this.#find(index - 1)
		if (index === this.length) {
			this.#end = node
			node.next = null
			this.length--
			return
		}
		node.next = node.next.next
		this.length--
	}
	get(val) {
		if (this.length === 0) throw this.#invalidValError
		const node = this.#traverse((acc, curr) => curr,
			(node, i) => node.val === val
		)
		if (node) return node
		throw this.#invalidValError
	}
	getAll() {
		return this.#traverse((acc, curr) => [...acc, curr.val], (node, i) => true, [])
	}
}

module.exports = { LinkedList }

const a = new LinkedList([1, 2, 3])
