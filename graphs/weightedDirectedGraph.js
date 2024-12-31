class Edge {
  constructor(from, to, weight) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}

class WeightedDirectedGraph {
  V = 0;
  E = 0;
  matrix;
  constructor(V) {
    this.V = V;
    this.matrix = new Array(V).fill().map(() => new Array(V).fill(undefined));

    // console.log(this.matrix);
  }
  addEdge(from, to, weight) {
    this.matrix[from][to] = new Edge(from, to, weight);
  }
}

// const G = new WeightedDirectedGraph(6);
// G.addEdge(0, 5, 1);
// G.addEdge(1, 0, 5);
// G.addEdge(5, 1, 4);
// G.addEdge(1, 2, 2);
// G.addEdge(1, 4, 4);
// G.addEdge(5, 4, 1);
// G.addEdge(4, 2, 3);
// G.addEdge(2, 3, 6);

// console.log(G.matrix);

module.exports = { WeightedDirectedGraph };
