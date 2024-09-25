class Node {
	constructor(val, next) {
		this.val = val
		this.next = next || null
	}
}

class CircularLinkedList {
	constructor(vals) {
		this.end = {
			val: vals[vals.length - 1],
			next: null
		}
		this.length = vals.length
		let currNode = this.end

		for (let i = vals.length - 2; i >= 0; i--) {
			currNode = new Node(vals[i], currNode)
		}
		this.end.next = currNode
	}
	insert(val, place) {
		let currNode = this.end.next
		while (currNode.val !== this.end.val) {
			if (currNode.val === place) {
				currNode.next = new Node(val, currNode.next)
				this.length++
				return
			}
			currNode = currNode.next
		}
		throw new Error("Invalid place");

	}
	insertEnd(val) {
		const oldEndNext = this.end.next
		this.end.next = new Node(val, oldEndNext)
		this.length++
	}
	del(val) {
		let prevNode = this.end.next
		while (prevNode.next.val !== this.end.val) {
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
	delEnd() {
		let currNode = this.end.next
		while (currNode.next.val !== this.end.val) {
			currNode = currNode.next
		}
		currNode.next = this.end.next
		this.end = currNode
		this.length--
	}
	getNode(val) {
		let currNode = this.end.next
		while (currNode.val !== this.end.val) {
			if (currNode.val === val) return currNode
			currNode = currNode.next
		}
		throw new Error("Invalid node val");
	}
	enqueue(val) {
		this.insertEnd(val)
	}
	dequeue() {
		this.delEnd()
	}
}

const node1 = new Node(1)
const node2 = new Node(2, node1)
console.log(node2)
const ll = new LinkedList([1,2,3])
ll.insert(4, 2)
console.log(ll.getNode(4))
ll.delete(4)
console.log(ll.getNode(4))