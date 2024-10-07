const { SkipList } = require("./skipList.js")

test('Create Skip List', () => {
	const ll = new SkipList([1, 2, 4])
	expect(ll.print().length).toBe(5)
})

test('Insert into Skip List', () => {
	const ll = new SkipList([1, 2, 4])
	ll.insert(3)
	expect(ll.print()[3].val).toBe(3)
})

test('Insert at the end of Skip List', () => {
	const ll = new SkipList([1, 2, 4])
	ll.insert(5)
	expect(ll.print()[4].val).toBe(5)
})

test('Delete from Skip List', () => {
	const ll = new SkipList([1, 2, 4])
	ll.del(2)
	expect(ll.print().length).toBe(4)
})