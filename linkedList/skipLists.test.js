const { SkipList } = require("./skipList.js")

test('Create Skip List', () => {
	const ll = new SkipList([1, 2, 4], 0.5)
	expect(ll.print().length).toBe(5)
})

test('Insert into Skip List', () => {
	const ll = new SkipList([1, 2, 4], 0.5)
	ll.insert(3)
	expect(ll.print()[3].val).toBe(3)
})

test('Insert into Empty Skip List', () => {
	const ll = new SkipList([], 0.5)
	ll.insert(3)
	expect(ll.print()[1].val).toBe(3)
})

test('Insert at the end of Skip List', () => {
	const ll = new SkipList([1, 2, 4], 0.5)
	ll.insert(5)
	expect(ll.print()[4].val).toBe(5)
})

test('Insert at the start of Skip List', () => {
	const ll = new SkipList([2, 3, 4], 0.5)
	ll.insert(1)
	expect(ll.print()[1].val).toBe(1)
})

test('Delete from Skip List', () => {
	const ll = new SkipList([1, 2, 4], 0.5)
	ll.del(2)
	expect(ll.print().length).toBe(4)
})

test('Delete from empty Skip List', () => {
	const ll = new SkipList([], 0.5)
	expect(() => {
		ll.del(2)
	}).toThrow()
})

test('Delete element not available', () => {
	const ll = new SkipList([2,5,7], 0.5)
	expect(() => {
		ll.del(1)
	}).toThrow()
})