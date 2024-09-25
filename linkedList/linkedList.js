class Node {
	constructor(val, next) {
		this.val = val
		this.next = next || null
	}
}

class LinkedList {
	constructor(vals) {
		if (!vals.length) {
			this.head = null
			this.end = null
			this.length = 0
			return
		}
		this.end = {
			val: vals[vals.length - 1],
			next: null
		}
		this.length = vals.length
		let currNode = this.end

		for (let i = vals.length - 2; i >= 0; i--) {
			currNode = new Node(vals[i], currNode)
		}
		this.head = currNode
	}
	insert(val, place) {
		let currNode = this.head
		while (currNode) {
			if (currNode.val === place) {
				currNode.next = new Node(val, currNode.next)
				this.length++
				return
			}
			currNode = currNode.next
		}
		throw new Error("Invalid place");

	}
	insertStart(val) {
		const oldStart = this.head
		this.head = new Node(val, oldStart)
		this.length++
	}
	insertEnd(val) {
		const oldEnd = this.end
		this.end = new Node(val, oldEnd)
		this.length++
	}
	del(val) {
		if (!this.head) throw new Error("Empty Linked List");
		if (!this.head) throw new Error("Invalid place");
		let prevNode = this.head
		while (prevNode.next) {
			if (prevNode.next.val === val) {
				const oldNext = prevNode.next
				prevNode.next = prevNode.next.next
				// delete oldNext
				this.length--
				return
			}
			prevNode = prevNode.next
		}
		throw new Error("Invalid place");
	}
	delStart() {
		if (!this.head) throw new Error("Empty Linked List");
		const oldHead = this.head
		this.head = this.head.next
		// delete oldHead
		this.length--
	}
	delEnd() {
		if (!this.head) throw new Error("Empty Linked List");
		let currNode = this.head
		while (currNode.next.next) {
			currNode = currNode.next
		}
		this.end = currNode
		currNode.next = null
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

}

module.exports = {LinkedList, Node}
// const node1 = new Node(1)
// const node2 = new Node(2, node1)
// console.log(node2)
// const ll = new LinkedList([1,2,3])
// ll.insert(4, 2)
// console.log(ll.getNode(4))
// ll.del(4)
// console.log(ll.getNode(4))