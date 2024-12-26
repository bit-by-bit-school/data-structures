const { PriorityQueue } = require("./PQusingArrays.js");

test("Enqueue to PQ", () => {
  const q = new PriorityQueue([
    {
      val: 1,
    },
    {
      val: 2,
    },
    {
      val: 3,
    },
  ]);
  q.enqueue({
    val: 4
  });
  expect(q.getAll().length).toBe(4);
  expect(q.dequeue().val).toBe(1);
  expect(q.dequeue().val).toBe(2);
  expect(q.dequeue().val).toBe(3);
});
