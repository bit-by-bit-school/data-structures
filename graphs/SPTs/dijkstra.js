const { Graph } = require("../weightedGraph.js");
const { PriorityQueue } = require("../../queues/PQusingArrays.js");

const dijkstra = (G, s) => {
  if (!G.isConnected) return false;
  const distTo = Array(G.length).fill(Infinity);
  distTo[s] = 0;
  const edgeTo = Array(G.length);
  edgeTo[s] = s;
  const pq = new PriorityQueue(
    distTo.map((d, i) => {
      return {
        val: d,
        v: i,
      };
    })
  );

  while (pq.length) {
    const v = pq.dequeue().v;
    for (let u = 0; u < G.length; u++) {
      if (G.matrix[v][u] && distTo[u] > distTo[v] + G.matrix[v][u]) {
        distTo[u] = distTo[v] + G.matrix[v][u];
        edgeTo[u] = v;
        pq.set(u, distTo[v] + G.matrix[v][u]);
      }
    }
  }

  return edgeTo;
};

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

console.log(dijkstra(G, 0));

module.exports = { dijkstra };
