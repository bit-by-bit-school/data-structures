class Node {
	constructor(val, prev, nexts) {
		this.val = val
		this.nexts = nexts || null
		this.prev = prev || null
	}
}

class SkipList {
	#head
	#end
	constructor(vals) {
		if (!vals.length) {
			this.#head = null
			this.#end = null
			this.length = 0
			return
		}
		const nodes = this._createNodes(vals)
		this._joinNodes(nodes)
		this._createRefNodes(nodes)
		this.length = nodes.length
		this._createNexts()
	}
	_createNodes(vals) {
		return vals.map(v => new Node(v))
	}
	_joinNodes(nodes) {
		for (let i = 1; i < nodes.length - 1; i++) {
			nodes[i].prev = nodes[i - 1]
			nodes[i].nexts = [nodes[i + 1]]
		}
	}
	_createRefNodes(nodes) {
		this.#end = nodes[nodes.length - 1]
		this.#head = nodes[0]
		this.#head.prev = null
		this.#head.nexts = [nodes[1]]
		this.#end.nexts = null
		this.#end.prev = nodes[nodes.length - 2]
	}
	_createNexts() {
		let currNode = this.#head
		let nextNode = currNode.nexts[currNode.nexts.length - 1]

		while (this.#head.nexts[this.#head.nexts.length - 1].nexts) {
			if (!nextNode.nexts) {
				currNode.nexts.push(nextNode)
				currNode = this.#head
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
	findPlacementNodeForInsertion(val) {
		let currNode = this.#head
		let reqNode = null
		const nodesToUpdate = []
		while (currNode.nexts) {
			if (currNode.nexts[0].val >= val) {
				nodesToUpdate.push([currNode, 0])
				return [currNode, nodesToUpdate]
			}
			for (let i = currNode.nexts.length - 1; i >= 0; i--) {
				const currNext = currNode.nexts[i]
				if (currNext.val === val) {
					reqNode = currNext
					nodesToUpdate.push([reqNode, 0])
					return [reqNode, nodesToUpdate]
				}
				if (currNext.val < val) {
					currNode = currNext
					break
				}
				if (Math.random() > 0.5) nodesToUpdate.push([currNode, i])
			}
		}
		nodesToUpdate.push([currNode, 0])
		return [currNode, nodesToUpdate]
	}
	insert(val) {
		if (!this.#head) throw new Error("Empty Linked List");
		const [reqNode, nodesToUpdate] = this.findPlacementNodeForInsertion(val)
		console.log("nodesToUpdate", nodesToUpdate)
		console.log("reqNode", reqNode)
		const newNode = new Node(val, reqNode, [])
		this.updateNexts(nodesToUpdate, newNode)
		this.length++
	}
	updateNexts(nodesToUpdate, node) {
		nodesToUpdate.forEach(ele => {
			const nextNode = ele[0].nexts[ele[1]]
			node.nexts.unshift(nextNode)
			ele[0].nexts[ele[1]] = node
		})
	}
	del(k) {
		if (!this.#head || k < 1) throw new Error("Empty Linked List");
		if (k === this.length) {
			this.#end.prev.next = null
			this.#end = this.#end.prev
			this.length--
			return
		}
		let currNode = this.#head
		let count = 1
		while (count < k) {
			if (!currNode.next) throw new Error("Invalid place");
			currNode = currNode.next
			count++
		}
		if (!currNode.prev) {
			currNode.next.prev = null
			this.#head = currNode.next
		}
		else {
			currNode.prev.next = currNode.next
			currNode.next.prev = currNode.prev
		}
		this.length--
	}
	get(val) {
		if (!this.#head) throw new Error("Empty Linked List");
		let currNode = this.#head
		let reqNode = null
		const predecessors = []
		while (!reqNode) {
			for (let i = currNode.nexts.length - 1; i >= 0; i--) {
				if (currNode.nexts[i].val === val) {
					reqNode = currNode.nexts[i]
					break
				}
				if (currNode.nexts[i].val < val) {
					predecessors.push(currNode.nexts[i])
					currNode = currNode.nexts[i]
					break
				}
			}
			if (!reqNode) break
		}
		throw new Error("Invalid node val");
	}
	print() {
		let currNode = this.#head
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

const vals = [1, 2, 3, 4, 6, 7, 8]
const sl = new SkipList(vals)
console.log("before", sl.print())
sl.insert(5)
console.log("after", sl.print())


module.exports = { SkipList }

// assume sorted data

// update head and end to be sentinels instead of internal nodes