const { dijkstra } = require("./dijkstra.js");
const { Graph } = require("../weightedGraph.js");
const { WeightedDirectedGraph } = require("../weightedDirectedGraph.js");

test("Dijkstra on undirected graph", () => {
  const G = new Graph(
    [
      [0, 1, 5],
      [1, 2, 2],
      [1, 4, 4],
      [2, 3, 6],
      [2, 4, 3],
      [0, 5, 1],
      [4, 5, 1],
    ],
    6
  );
  console.log("undirected", G.V)
  expect(dijkstra(G, 0)).toEqual([0, 0, 4, 2, 5, 0]);
});

test("Dijkstra on directed graph", () => {
    const G = new WeightedDirectedGraph(6);
    G.addEdge(0, 5, 4);
    G.addEdge(0, 1, 7);
    G.addEdge(1, 5, 3);
    G.addEdge(1, 2, 2);
    G.addEdge(1, 4, 4);
    G.addEdge(5, 4, 6);
    G.addEdge(4, 2, 3);
    G.addEdge(2, 3, 2);
    G.addEdge(4, 3, 4);
    G.addEdge(2, 3, 2);
    G.addEdge(5, 3, 2);

  expect(dijkstra(G, 0)).toEqual([ 0, 0, 1, 5, 5, 0 ]);
});
