const { Graph } = require("../weightedGraph.js");

class MST {
  graph;
  edges;
  constructor(edges, n) {
    this.graph = new Graph(edges, n);
    this.edges = edges;
  }
  addEdge(edge) {
    this.graph.matrix[edge[0]][edge[1]] = edge[2];
    this.edges.push(edge);
  }
}

module.exports = { MST };
