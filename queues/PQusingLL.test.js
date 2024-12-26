const { PriorityQueue } = require("./PQusingLL.js");

test("Enqueue to PQ", () => {
  const q = new PriorityQueue([1, 2, 3]);
  q.enqueue(4);
  expect(q.getAll().length).toBe(4);
  expect(q.dequeue()).toBe(1);
  expect(q.dequeue()).toBe(2);
  expect(q.dequeue()).toBe(3);
});
