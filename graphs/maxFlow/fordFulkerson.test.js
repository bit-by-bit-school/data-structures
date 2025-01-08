const { fordFulkerson } = require("./fordFulkerson.js");
const { WeightedDirectedGraph } = require("../weightedDirectedGraph");

test("test fordFulkerson max flow", () => {
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
  G.addEdge(5, 3, 2);

  expect(fordFulkerson(G, 0, 3)).toBe(8);
});

test("test fordFulkerson max flow with 1 vertex", () => {
  const G = new WeightedDirectedGraph(2);
  G.addEdge(0, 1, 5);

  expect(fordFulkerson(G, 0, 1)).toBe(5);
});

test("test fordFulkerson max flow with two vertices, no path from s to t", () => {
    const G = new WeightedDirectedGraph(3);
    G.addEdge(0, 1, 5);
    G.addEdge(0, 2, 3);
    expect(fordFulkerson(G, 1, 2)).toBe(0);
  });

  test("test fordFulkerson with invalid sink or source", () => {
    const G = new WeightedDirectedGraph(3);
    G.addEdge(0, 1, 5);
    G.addEdge(0, 2, 3);
    expect(fordFulkerson(G, 1, 3)).toBe(undefined);
  })

