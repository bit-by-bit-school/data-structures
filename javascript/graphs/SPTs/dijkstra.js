const { Graph } = require("../weightedGraph.js");
const { IndexMinPQ } = require("../../queues/indexMinPQ.js");

const dijkstra = (G, s) => {
  console.log("about graph", G);
  if (!G.isConnected) return false;
  const distTo = new Array(G.V).fill(Infinity);
  distTo[s] = 0;
  const edgeTo = new Array(G.V);
  edgeTo[s] = s;
  const pq = new IndexMinPQ(
    distTo.map((d, i) => {
      return {
        val: d,
        key: i,
        priority: d,
      };
    })
  );

  while (pq.length) {
    const v = pq.getMin();
    for (let u = 0; u < G.V; u++) {
      if (
        G.matrix[v.key][u] &&
        distTo[u] > distTo[v.key] + G.matrix[v.key][u]
      ) {
        distTo[u] = distTo[v.key] + G.matrix[v.key][u];
        edgeTo[u] = v.key;
        pq.set(u, distTo[v] + G.matrix[v.key][u]);
      }
    }
  }

  return edgeTo;
};

module.exports = { dijkstra };
