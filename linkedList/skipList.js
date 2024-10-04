// skip list uses LL

class Node {
	constructor(val, prev, nexts) {
		this.val = val
		this.nexts = nexts || null
		this.prev = prev || null
	}
}

class SkipList {
	constructor(vals) {
		if (!vals.length) {
			this.head = null
			this.end = null
			this.length = 0
			return
		}

		const nodes = vals.map(v => new Node(v))

		this.end = nodes[nodes.length - 1]
		this.head = nodes[0]
		this.head.prev = null
		this.head.nexts = [nodes[1]]
		this.end.nexts = null
		this.end.prev = nodes[nodes.length - 2]
		this.length = nodes.length

		for (let i = 1; i < nodes.length - 1; i++) {
			nodes[i].prev = nodes[i - 1]
			nodes[i].nexts = [nodes[i + 1]]
		}

		let currNode = this.head
		let nextNode = currNode.nexts[currNode.nexts.length - 1]

		while (this.head.nexts[this.head.nexts.length - 1].nexts) {
			if (!nextNode.nexts) {
				currNode.nexts.push(nextNode)
				currNode = this.head
				nextNode = currNode.nexts[currNode.nexts.length - 1]
				continue
			}
			if (Math.random() > 0.5) { // no magic numbers p = 0.5 default pass to constructor
				currNode.nexts.push(nextNode)
				currNode = nextNode
			}
			nextNode = nextNode.nexts[nextNode.nexts.length - 1]
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
				nexts: currNode.nexts?.map(n => n.val) || null
			})
			currNode = currNode.nexts ? currNode.nexts[0] : null
		}
		return vals
	}

}

const vals = [1, 2, 3, 4, 5, 6, 7, 8]

