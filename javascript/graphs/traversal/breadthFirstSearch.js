bfs =  function* (matrix, n) {
  const queue = [0];
  const visited = Array(n).fill(0);
  visited[0] = 1
  while (queue.length) {
    const curr = queue.shift();
    yield curr
    for (let i = 0; i < n; i++) {
      if (matrix[curr][i] && !visited[i]) {
        queue.push(i);
        visited[i] = 1;
      }
    }
  }
};

const traversal = bfs(
  [
    [0, 1, 0, 1, 0, 0],
    [1, 0, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 1, 1],
    [0, 1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0],
  ],
  6
);

for (let i of traversal) {
    console.log(i)
}
