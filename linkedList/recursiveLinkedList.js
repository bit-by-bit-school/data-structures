class RecursiveLinkedList {
	constructor(vals) {
		this.val = vals[0]
		const nextVals = vals.slice(1)
		if (nextVals.length) this.next = new RecursiveLinkedList(nextVals)
		else this.next = null

	}
}