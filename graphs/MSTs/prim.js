const { MST } = require("./minimumSpanningTree.js");
const { PriorityQueue } = require("../../queues/PQusingArrays.js");
const { Graph } = require("../weightedGraph.js");

const prim = (G) => {
  if (!G.isConnected) return false;
  const mst = new MST([], G.length);
  const marked = Array(G.length).fill(0);
  const crossingEdges = new PriorityQueue([]);
  const checkAllMarked = (marked) => (marked.indexOf(0) === -1 ? true : false);
  const addToCrossingEdges = (v) => {
    for (let i = 0; i < G.length; i++) {
      if (G.matrix[v][i] && !marked[i]) {
          crossingEdges.enqueue({
            edges: [v, i],
            val: G.matrix[v][i],
          });
      }
    }
  };
  const getNewVertex = () => {
    let minEdge = crossingEdges.dequeue();
    mst.addEdge([...minEdge.edges, minEdge.val])
    return !marked[minEdge.edges[0]] ? minEdge.edges[0] : minEdge.edges[1];
  };
  const removeFromCrossingEdges = (v) => {
    for (let [i, n] of crossingEdges) {
      if (
        (n.edges[0] === v && marked[n.edges[1]]) ||
        (n.edges[1] === v && marked[n.edges[0]])
      ) {
        crossingEdges.delete(n);
        break;
      }
    }
  };

  // start with 0 vertex
  marked[0] = 1;
  addToCrossingEdges(0);

  // have cut between tree's and other vertices
  // add min edge to mst
  // till all vertices connected

  let newVertex;
  while (!checkAllMarked(marked)) {
    newVertex = getNewVertex();
    marked[newVertex] = 1;
    addToCrossingEdges(newVertex);
    removeFromCrossingEdges(newVertex);
  }
  return mst;
};

const graph = new Graph(
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

console.log(prim(graph).edges);
