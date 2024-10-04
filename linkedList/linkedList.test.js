const { LinkedList } = require("./linkedList.js")

test('Inserts to Linked List', () => {
	const ll = new LinkedList([1, 2, 3])
	ll.insert(4, 2)
	expect(ll.getAll()[2]).toBe(4)
})

test('Deletes from Linked List', () => {
	const ll = new LinkedList([1, 2, 3])
	ll.del(2)
	expect(() => {
		ll.get(2)
	}).toThrow("Invalid node val")
})

test('Search Linked List via index', () => {
	const ll = new LinkedList([1, 2, 3])
	expect(ll.get(2).val).toBe(2)
})

test('Get all node vals', () => {
	const ll = new LinkedList([1, 2, 3])
	console.log(ll.getAll())
	expect(ll.getAll().length).toBe(3)
})