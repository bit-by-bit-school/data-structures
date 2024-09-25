const { LinkedList } = require("./linkedList.js")

const reverseLinkedList = (ll) => {
	if (!ll.head) throw new Error("Empty Linked List");

	let prevHead = ll.head
	let prevEnd = ll.end
	ll.end = prevHead
	ll.head = prevEnd

	let currNode = prevHead
	let nextNode = currNode.next
	let prevNode = null

	while (nextNode) {
		currNode.next = prevNode
		prevNode = currNode
		currNode = nextNode
		nextNode = nextNode.next
	}
	currNode.next = prevNode
	return ll.head
}

console.log(reverseLinkedList(new LinkedList([1,2])))