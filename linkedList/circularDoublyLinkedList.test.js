const { CircularDoublyLinkedList } = require("./circularDoublyLinkedList.js")

test('Inserts to CircularDoublyLinkedList', () => {
	const ll = new CircularDoublyLinkedList([1, 2, 3])
	console.log("getAll", ll.getAll(), ll.head.next.next)
	expect(ll._get(3)).toBe(3)
})

// test('Deletes from CircularDoublyLinkedList', () => {
// 	const ll = new CircularDoublyLinkedList([1, 2, 3])
// 	ll.del(3)
// 	expect(() => {
// 		ll.get(3)
// 	}).toThrow()
// })

// test('Get all node vals', () => {
// 	const ll = new CircularDoublyLinkedList([1, 2, 3])
// 	expect(ll.getAll().length).toBe(3)
// })