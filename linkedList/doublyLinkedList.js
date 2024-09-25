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
	getNode(val) {
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
		while (currNode) {
			console.log(currNode.val, currNode.prev && currNode.prev.val, currNode.next && currNode.next.val)
			currNode = currNode.next
		}
	}

}

module.exports = { DoublyLinkedList, Node }

const node1 = new Node(1)
const node2 = new Node(2, node1)
// console.log(node2)

const ll = new DoublyLinkedList([1, 2, 3])
ll.insert(4, 3)
ll.del(4)
ll.print()
// console.log(ll.getNode(4))
