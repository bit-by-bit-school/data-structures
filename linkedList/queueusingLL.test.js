const {Queue} = require("./queueUsingLL.js")

test('Enqueue to Queue', () => {
	const q = new Queue([1, 2, 3])
	q.enqueue(4)
	expect(q.getAll().length).toBe(4)
	expect(q.dequeue()).toBe(1)
	expect(q.dequeue()).toBe(2)
	expect(q.dequeue()).toBe(3)
})