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
	#NodeNotFound = new Error("Node not found")

	constructor(vals, randomnessFactor) {
		if (!vals.length) {
			this.#end = new Node(Number.MAX_SAFE_INTEGER, null, null)
			this.#head = new Node(Number.MIN_SAFE_INTEGER, null, [this.#end])
			this.length = 0
			return
		}
		const nodes = this._createNodes(vals)
		this._joinNodes(nodes)
		this._createRefNodes(nodes)
		this.length = nodes.length
		this._createNexts(randomnessFactor)
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
	_createNexts(randomnessFactor) {
		let currNode = this.#head
		let nextNode = currNode.nexts[currNode.nexts.length - 1]
		while (this.#head.nexts[this.#head.nexts.length - 1].nexts) {
			if (!nextNode.nexts) {
				currNode.nexts.push(nextNode)
				currNode = this.#head
				nextNode = currNode.nexts[currNode.nexts.length - 1]
				continue
			}
			if (Math.random() > randomnessFactor) {
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
				throw this.#NodeNotFound
			}
			for (let i = currNode.nexts.length - 1; i >= 0; i--) {
				const currNext = currNode.nexts[i]
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
		if (!reqNode) throw NodeNotFound
	}
	del(val) {
		const [node, nodesToUpdate] = this.findNodeToBeDeleted(val)
		this.updateNextsForDeletion(nodesToUpdate, node)
		this.length--
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

module.exports = { SkipList }

// assume sorted data

// sometimes smaller value nodes are added before the larger value nodes in next. Fix that.

// doesnt handle with duplicate values