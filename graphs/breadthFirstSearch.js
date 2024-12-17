const bfs = (matrix, val) => {
  const n = matrix.length;
  const queue = [];
  const visited = [];
  const traverseNext = (node) => {
    console.log("node", node, "queue", queue, "visited", visited);
    if (node === val) return node;
    for (let i = 0; i < n; i++) {
      if (matrix[node][i] && !visited[i]) {
        queue.push(i);
        visited[i] = 1;
      }
    }
    const next = queue.shift();
    return traverseNext(next)
  };
  visited[0] = 1
  return traverseNext(0);
};

console.log(
  bfs(
    [
      [0, 1, 0, 1, 0, 0],
      [1, 0, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 1, 1],
      [0, 1, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 0],
    ],
    2
  )
);
