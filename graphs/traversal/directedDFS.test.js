const { WeightedDirectedGraph } = require("../weightedDirectedGraph.js");
const { directedDFS } = require("./directedDFS.js");

test("Test DirectedDFS", () => {
  const G = new WeightedDirectedGraph(6);
  G.addEdge(0, 5, 1);
  G.addEdge(1, 0, 5);
  G.addEdge(5, 1, 4);
  G.addEdge(1, 2, 2);
  G.addEdge(1, 4, 4);
  G.addEdge(5, 4, 1);
  G.addEdge(4, 2, 3);
  G.addEdge(2, 3, 6);

  const reachables = directedDFS(G, [4, 2]);
  console.log(reachables);
  expect(reachables).toEqual([0, 0, 1, 1, 1, 0]);
});
