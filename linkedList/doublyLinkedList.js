class Node {
	constructor(val, prev, next) {
		this.val = val
		this.next = next || null
		this.prev = prev || null
	}
}

class DoublyLinkedList {
	constructor(vals) {
		if (!vals.length) {
			this.head = null
			this.end = null
			this.length = 0
			return
		}
		vals = vals.map(v => new Node(v))

		this.end = vals[vals.length - 1]
		this.head = vals[0]
		this.head.prev = null
		this.head.next = vals[1]
		this.end.next = null
		this.end.prev = vals[vals.length - 2]
		this.length = vals.length

		for (let i = 1; i < vals.length - 1; i++) {
			vals[i].prev = vals[i - 1]
			vals[i].next = vals[i + 1]
		}
	}
	insert(val, k) {
		if (!this.head) throw new Error("Empty Linked List");
		if (k === 0) {
			const oldHead = this.head
			this.head = new Node(val, null, oldHead)
			oldHead.prev = this.head
			this.length++
			return
		}
		if (k === this.length) {
			const oldEnd = this.end
			this.end = new Node(val, oldEnd, null)
			oldEnd.next = this.end
			this.length++
			return
		}
		let currNode = this.head
		let count = 1
		while (count < k) {
			if (!currNode.next) throw new Error("Invalid place");
			currNode = currNode.next
			count++
		}
		const newNode = new Node(val, currNode, currNode.next)
		currNode.next = newNode
		if (newNode.next) newNode.next.prev = newNode
		this.length++
	}
	del(k) {
		if (!this.head || k < 1) throw new Error("Empty Linked List");
		if (k === this.length) {
			this.end.prev.next = null
			this.end = this.end.prev
			this.length--
			return
		}
		let currNode = this.head
		let count = 1
		while (count < k) {
			if (!currNode.next) throw new Error("Invalid place");
			currNode = currNode.next
			count++
		}
		if (!currNode.prev) {
			currNode.next.prev = null
			this.head = currNode.next
		}
		else {
			currNode.prev.next = currNode.next
			currNode.next.prev = currNode.prev
		}
		this.length--
	}
	get(val) {
		if (!this.head) throw new Error("Empty Linked List");
		let currNode = this.head
		while (currNode) {
			if (currNode.val === val) return currNode
			currNode = currNode.next
		}
		throw new Error("Invalid node val");
	}
	print() {
		let currNode = this.head
		const vals = []
		while (currNode) {
			vals.push({
				val: currNode.val,
				prev: currNode.prev?.val || null,
				next: currNode.next?.val || null
			})
			currNode = currNode.next
		}
		return vals
	}

}

module.exports = { DoublyLinkedList, Node }