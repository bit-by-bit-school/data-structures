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
		for (let i = 0; i < nodes.length; i++) {
			nodes[i].prev = nodes[i - 1]
			nodes[i].nexts = [nodes[i + 1]]
		}
	}
	_createRefNodes(nodes) {
		this.#end = new Node(Number.MAX_SAFE_INTEGER, nodes[nodes.length - 1], null)
		this.#head = new Node(Number.MIN_SAFE_INTEGER, null, [nodes[0]])
		nodes[0].prev = this.#head
		nodes[nodes.length - 1].nexts = [this.#end]
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
		const newNode = new Node(val, reqNode, [])
		this.updateNextsForInsertion(nodesToUpdate, newNode)
		this.length++
	}
	updateNextsForInsertion(nodesToUpdate, node) {
		nodesToUpdate.forEach(ele => {
			const nextNode = ele[0].nexts[ele[1]]
			node.nexts.unshift(nextNode)
			ele[0].nexts[ele[1]] = node
		})
	}
	updateNextsForDeletion(nodesToUpdate, node) {
		nodesToUpdate.forEach(ele => {
			ele[0].nexts[ele[1]] = node.nexts[ele[1]]
		})
	}
	findNodeToBeDeleted(val) {
		let currNode = this.#head
		let reqNode = null
		const nodesToUpdate = []
		while (currNode.nexts) {
			if (currNode.val === val) return [currNode, nodesToUpdate]
			if (currNode.nexts[0].val > val && !reqNode) {
				console.log(1)
				throw new Error("Node to be deleted not found")
			}
			for (let i = currNode.nexts.length - 1; i >= 0; i--) {
				const currNext = currNode.nexts[i]
				console.log("currNode", currNode.val, "currNext", currNext.val)
				if (currNext.val === val) {
					if (!reqNode) reqNode = currNext
					nodesToUpdate.push([currNode, i])
				}
				if (currNext.val < val || i === 0) {
					currNode = currNext
					break
				}
			}
		}
		if (!reqNode) throw new Error("Node to be deleted not found")
	}
	del(val) {
		if (!this.#head) throw new Error("Empty Linked List");
		const [node, nodesToUpdate] = this.findNodeToBeDeleted(val)
		console.log("nodesToUpdate", nodesToUpdate)
		this.updateNextsForDeletion(nodesToUpdate, node)

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
sl.insert(5)
console.log("before", sl.print())
sl.del(5)
console.log("after", sl.print())


module.exports = { SkipList }

// assume sorted data

// update head and end to be sentinels instead of internal nodes

// sometimes smaller value nodes are added before the larger value nodes in next. Fix that.

// if multiple vals to be deleted macth, delete first one, and check everytime after reqNode has been found.
// doesnt handle with duplicate values rn