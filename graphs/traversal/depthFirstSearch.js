const dfs = function* (matrix, n) {
  const stack = [0];
  const visited = Array(n).fill(0);
  visited[0] = 1;

  while (stack.length) {
    const curr = stack[stack.length - 1];
    stack.pop();
    yield curr;
    for (let i = 0; i < n; i++) {
      if (matrix[curr][i] && !visited[i]) {
        stack.push(i);
        visited[i] = 1;
      }
    }
  }
};

// const traversal = dfs(
//   [
//     [0, 1, 0, 1, 0, 0],
//     [1, 0, 1, 1, 1, 0],
//     [0, 1, 0, 0, 0, 0],
//     [1, 1, 0, 0, 1, 1],
//     [0, 1, 0, 1, 0, 0],
//     [0, 0, 0, 1, 0, 0],
//   ],
//   6
// );

// for (let i of traversal) {
//   console.log(i);
// }

module.exports = { dfs };
