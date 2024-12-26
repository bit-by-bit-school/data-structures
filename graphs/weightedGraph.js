const { AdjacencyMatrix } = require("./representations/adjacencyMatrix.js");
const { dfs } = require("./traversal/depthFirstSearch.js");

class Graph {
  matrix;
  length;
  isConnected;
  constructor(edges, n) {
    // this.matrix = new AdjacencyMatrix(edges, n);
    this.matrix = Array(n)
      .fill()
      .map(() => Array(n).fill(0));
    if (edges.length) {
      edges.forEach((e) => {
        this.matrix[e[0]][e[1]] = e[2];
        this.matrix[e[1]][e[0]] = e[2];
      });
    }
    this.length = n;
    this.checkConnected();
  }
  *[Symbol.iterator]() {
    for (let i = 0; i < dfs(this.matrix, this.length); i++) {
      yield obj.value;
    }
  }
  checkConnected() {
    dfs(this.matrix, this.length).forEach((obj, i) => {
      if (i === this.length - 1) {
        const unvisited = obj.visited.indexOf(0);
        this.isConnected = unvisited === -1 ? true : false;
      }
    });
  }
  addEdge(edge) {
    this.matrix[edge[0]][edge[1]] = 1;
    this.matrix[edge[1]][edge[0]] = 1;
  }
}

const g1 = new Graph(
  [
    [0, 1, 2],
    [1, 2, 2],
    [1, 4, 2],
    [2, 3, 2],
    [2, 4, 2],
    [0, 5, 2],
    [4, 5, 2],
  ],
  6
);

for (let node of g1) {
  console.log("iter", node);
}

module.exports = { Graph };
