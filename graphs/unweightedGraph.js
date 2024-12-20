const { AdjacencyMatrix } = require("./representations/adjacencyMatrix.js");
const { dfs } = require("./traversal/depthFirstSearch.js");

class Graph {
  matrix;
  length;
  constructor(edges, n) {
    // this.matrix = new AdjacencyMatrix(edges, n);
    this.matrix = Array(n)
      .fill()
      .map(() => Array(n).fill(0));
    edges.forEach((e) => {
      this.matrix[e[0]][e[1]] = 1;
      this.matrix[e[1]][e[0]] = 1;
    });
    this.length = n;
    console.log(this.matrix, this.length);
  }
  *[Symbol.iterator]() {
    yield* dfs(this.matrix, this.length);
  }
}

const g1 = new Graph(
  [
    [0, 1],
    [1, 2],
    [1, 4],
    [2, 3],
    [2, 4],
    [0, 5],
    [4, 5],
  ],
  6
);

for (let node of g1) {
  console.log("iter", node);
}

module.exports = { Graph };
