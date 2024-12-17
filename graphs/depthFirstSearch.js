const dfs = (matrix, val) => {
  const n = matrix.length;
  const stack = [];
  const visited = [];
  const traverseNext = (node) => {
    console.log("node", node, "stack", stack, "visited", visited);
    if (node === val) return node;
    for (let i = 0; i < n; i++) {
      if (matrix[node][i] && !visited[i]) {
        stack.push(i);
        visited[node] = 1;
        const resp = traverseNext(i, stack);
        console.log("resp", resp);
        if (resp) return resp;
      }
    }
    visited[node] = 1;
    stack.pop();
    traverseNext(stack[stack.length - 1]);
  };
  stack.push(0);
  return traverseNext(0);
};

console.log(
  dfs(
    [
      [0, 1, 0, 1, 0, 0],
      [1, 0, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 1, 1],
      [0, 1, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 0],
    ],
    4
  )
);

module.exports = { dfs };
