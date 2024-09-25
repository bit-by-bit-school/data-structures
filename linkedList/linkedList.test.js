const { DoublyLinkedList } = require("./doublyLinkedList.js")

test('Inserts to Doubly Linked List', () => {
	const ll = new DoublyLinkedList([1, 2, 3])
	ll.insert(4, 2)
	expect(ll.print()[2].val).toBe(4)
})

test('Deletes from Doubly Linked List', () => {
	const ll = new DoublyLinkedList([1, 2, 3])
	ll.del(3)
	expect(ll.print()[3]).toBe(undefined)
})

test('Search Doubly Linked List via index', () => {
	const ll = new DoublyLinkedList([1, 2, 3])
	expect(ll.get(2).val).toBe(2)
})