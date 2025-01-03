const { directedDFS } = require("./traversal/directedDFS.js");

class WeightedDirectedGraph {
  V = 0;
  E = 0;
  matrix;
  constructor(V) {
    this.V = V;
    this.matrix = new Array(V).fill().map(() => new Array(V).fill(undefined));
  }
  addEdge(from, to, weight) {
    this.matrix[from][to] = weight;
    this.E++;
  }
  isConnected() {
    const reachables = directedDFS(this, [0]);
    return reachables.indexOf(0) === -1 ? true : false;
  }
}

module.exports = { WeightedDirectedGraph };
