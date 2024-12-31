const { WeightedDirectedGraph } = require("../weightedDirectedGraph.js");

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

const G = new WeightedDirectedGraph(6);
G.addEdge(0, 5, 1);
G.addEdge(1, 0, 5);
G.addEdge(5, 1, 4);
G.addEdge(1, 2, 2);
G.addEdge(1, 4, 4);
G.addEdge(5, 4, 1);
G.addEdge(4, 2, 3);
G.addEdge(2, 3, 6);

console.log("matrix", G.matrix);
console.log("reachable", directedDFS(G, [4, 2]));

module.exports = { directedDFS };
