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
	#randomnessFactor

	constructor(vals, randomnessFactor) {
		this.#createNodes(vals, randomnessFactor)
	}
	/*
		createNodes ([int], float) -> undefined
	*/
	#createNodes(vals, randomnessFactor) {
		this.#randomnessFactor = randomnessFactor
		if (!vals.length) {
			this.#end = new Node(Number.MAX_SAFE_INTEGER, null, null)
			this.#head = new Node(Number.MIN_SAFE_INTEGER, null, [this.#end])
			this.length = 0
			return
		}
		const nodes = this.#initNodes(vals)
		this.#joinNodes(nodes)
		this.#createRefNodes(nodes)
		this.length = nodes.length
		this.#createNexts()
	}
	/*
		initNodes ([int]) -> [Node obj]
	*/
	#initNodes(vals) {
		return vals.map(v => new Node(v))
	}
	/*
		joinNodes ([Node obj]) -> undefined
	*/
	#joinNodes(nodes) {
		for (let i = 0; i < nodes.length; i++) {
			nodes[i].prev = nodes[i - 1]
			nodes[i].nexts = [nodes[i + 1]]
		}
	}
	/*
		createRefNodes() -> undefined
	*/
	#createRefNodes(nodes) {
		this.#end = new Node(Number.MAX_SAFE_INTEGER, nodes[nodes.length - 1], null)
		this.#head = new Node(Number.MIN_SAFE_INTEGER, null, [nodes[0]])
		nodes[0].prev = this.#head
		nodes[nodes.length - 1].nexts = [this.#end]
	}
	/*
		createNexts () -> undefined
	*/
	#createNexts() {
		let currNode = this.#head
		let nextNode = currNode.nexts[currNode.nexts.length - 1]
		while (this.#head.nexts[this.#head.nexts.length - 1].nexts) {
			if (!nextNode.nexts) {
				currNode.nexts.push(nextNode)
				currNode = this.#head
				nextNode = currNode.nexts[currNode.nexts.length - 1]
				continue
			}
			if (Math.random() > this.#randomnessFactor) {
				currNode.nexts.push(nextNode)
				currNode = nextNode
			}
			nextNode = nextNode.nexts[nextNode.nexts.length - 1]
		}
	}
	/*
		insertByVal (int) -> int
	*/
	insertByVal(val) {
		const prev = this.#traverseForInsertion(val)
		const newNode = this.#create(prev, val)
		this.length++
		return newNode.val
	}
	/*
		del (int) -> int
	*/
	del(val) {
		const node = this.#search(val)
		this.#remove(node)
		this.length--
		return node.val
	}
	/*
		getAll () -> [int]
	*/
	getAll() {
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
	/*
		#traverseForInsertion(int) -> Node obj
	*/
	#traverseForInsertion(val) {
		let currNode = this.#head
		while (currNode.nexts) {
			if (currNode.nexts[0].val >= val) {
				return currNode
			}
			for (let i = currNode.nexts.length - 1; i >= 0; i--) {
				const currNext = currNode.nexts[i]
				if (currNext.val === val) {
					return currNext
				}
				if (currNext.val < val) {
					currNode = currNext
					break
				}
			}
		}
		return currNode
	}
	/*
		#search (Node obj) -> Node obj || null
	*/
	#search(val) {
		let currNode = this.#head
		while (currNode.nexts) {
			if (currNode.nexts[0].val > val) {
				return null
			}
			for (let i = currNode.nexts.length - 1; i >= 0; i--) {
				const currNext = currNode.nexts[i]
				if (currNext.val === val) {
					return currNext
				}
				if (currNext.val < val) {
					currNode = currNext
					break
				}
			}
		}
		return null
	}
	/*
		#create (Node obj, int) -> undefined
	*/
	#create(prev, val) {
		const newNode = new Node(val, prev, [prev.nexts[0]])
		prev.nexts[0] = newNode
		let currNode = this.#head
		if (Math.random() < this.#randomnessFactor) return newNode
		let level = 1
		while (currNode.val < newNode.val && currNode.nexts) {
			const currNext = currNode.nexts[level]
			if (!currNext) return newNode
			if (currNext.val > newNode.val) {
				newNode.nexts.push(currNext)
				currNode.nexts[level] = newNode
				if (Math.random() < this.#randomnessFactor) return newNode
				currNode = this.#head
				level++
				continue
			}
			currNode = currNode.nexts[level]
		}
		return newNode
	}
	/*
		#remove (Node obj) -> undefined
	*/
	#remove(node) {
		node.prev.nexts[0] = node.nexts[0]
		node.nexts[0].prev = node.prev
		let currNode = this.#head
		let level = 1
		while (currNode.nexts) {
			const currNext = currNode.nexts[level]
			if (currNext.val === node.val) {
				currNode.nexts[level] = currNext.nexts[level]
				currNode = this.#head
				level++
				continue
			}
			currNode = currNode.nexts[level]
		}
	}
}

module.exports = { SkipList }

// assume sorted data

// sometimes smaller value nodes are added before the larger value nodes in next. Fix that.

// doesnt handle duplicate values