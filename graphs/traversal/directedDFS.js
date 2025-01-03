const directedDFS = function (G, sources) {
  const reachable = new Array(G.V).fill(0);
  sources.forEach((s) => {
    for (let d of dfs(G.matrix, G.V, s)) {
        console.log("d", d)
      reachable[d.value] = 1
    }
  });
  return reachable;
};

const dfs = function* (matrix, n, s) {
  const stack = [s];
  const visited = Array(n).fill(0);
  visited[s] = 1;
  while (stack.length) {
    const curr = stack.pop();
    yield {
      value: curr,
      stack,
      visited,
    };
    for (let i = 0; i < n; i++) {
      if (matrix[curr][i] && !visited[i]) {
        stack.push(i);
        visited[i] = 1;
      }
    }
  }
};

module.exports = { directedDFS };
