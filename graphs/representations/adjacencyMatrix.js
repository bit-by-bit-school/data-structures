class AdjacencyMatrix {
  matrix;
  constructor(edges, n) {
    this.matrix = Array(n)
      .fill()
      .map(() => Array(n).fill(0));
    edges.forEach((e) => {
      this.matrix[e[0]][e[1]] = 1;
      this.matrix[e[1]][e[0]] = 1;
    });
  }
}

module.exports = { AdjacencyMatrix };
