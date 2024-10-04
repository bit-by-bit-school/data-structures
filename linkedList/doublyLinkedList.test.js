const { DoublyLinkedList } = require("./doublyLinkedList.js")

test('Inserts to Doubly Linked List', () => {
	const ll = new DoublyLinkedList([1, 2, 3])
	ll.insert(4, 2)
	expect(ll._get(3)).toBe(4)
})

test('Deletes from Doubly Linked List', () => {
	const ll = new DoublyLinkedList([1, 2, 3])
	ll.del(3)
	expect(() => {
		ll.get(3)
	}).toThrow()
})

test('Get all node vals', () => {
	const ll = new DoublyLinkedList([1, 2, 3])
	expect(ll.getAll().length).toBe(3)
})