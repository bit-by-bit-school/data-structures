const { WeightedDirectedGraph } = require("../weightedDirectedGraph");

const fordFulkerson = (G, s, t) => {
  if (s >= G.V || t >= G.V) return undefined
  let totalFlow = 0;
  const flowMatrix = G.matrix.map((a) =>
    a.map((b) => {
      return b && { capacity: b, flow: 0 };
    })
  );

  console.log(flowMatrix);

  const findAugmentedPath = () => {
    const visited = new Array(G.V);
    const stack = [s];
    const parents = [];
    let curr = s;
    while (true) {
      curr = stack.pop();
      if (curr === t) {
        return [parents, curr];
      }
      for (let i = 0; i < G.V; i++) {
        if (
          flowMatrix[curr][i] &&
          flowMatrix[curr][i].flow < flowMatrix[curr][i].capacity &&
          !visited[i]
        ) {
          parents[i] = curr;
          visited[i] = 1;
          stack.push(i);
        }
      }
      if (!stack.length) return [[], null];
    }
  };

  const findMinPathFlow = (parents, last) => {
    let curr = last;
    let min = Infinity;
    while (curr !== s) {
      const currResidualFlow =
        flowMatrix[parents[curr]][curr].capacity -
        flowMatrix[parents[curr]][curr].flow;
      if (currResidualFlow < min) {
        min = currResidualFlow;
      }
      curr = parents[curr];
    }
    return min;
  };

  const updateResidualFlows = (parents, last, min) => {
    let curr = last;
    while (curr !== s) {
      const parent = parents[curr];
      flowMatrix[parent][curr].flow = flowMatrix[parent][curr].flow + min;
      curr = parent;
    }
  };

  while (true) {
    const [parents, last] = findAugmentedPath();
    if (!parents.length) break;
    const min = findMinPathFlow(parents, last);
    totalFlow += min;
    updateResidualFlows(parents, last, min);
  }

  return totalFlow;
};

module.exports = { fordFulkerson };