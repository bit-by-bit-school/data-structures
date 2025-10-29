// not submitted
// compare c_lib and c_road to reduce time on sorting

const roadsAndLibraries = (n, c_lib, c_road, cities) => {
  const generateMatrix = (edges, n) => {
    const matrix = Array(n)
      .fill()
      .map(() => Array(n).fill(0));
    edges.forEach((e) => {
      matrix[e[0] - 1][e[1] - 1] = 1;
      matrix[e[1] - 1][e[0] - 1] = 1;
    });
    return matrix;
  };

  const matrix = generateMatrix(cities, n);
  console.log("matrix", matrix);
  const visited = Array(n).fill(0);
  console.log("visited", visited);
  let minEdges = 0;
  let disjointGraphs = 0;
  const noRoadCost = n * c_lib + 0 * c_road;
  const allCosts = [noRoadCost];

  const exploreNode = (node) => {
    console.log("out node", node);
    for (let i = 0; i < n; i++) {
      console.log("i", i);
      if (matrix[node][i] && !visited[i]) {
        allCosts.push(allCosts[allCosts.length - 1] - c_lib + c_road);
        visited[i] = 1;
        minEdges++;
        console.log("minEdges when not visited", node, i, allCosts);
        exploreNode(i);
      }
    }
  };

  visited[0] = 1;
  exploreNode(0);
  disjointGraphs++;

  let s = visited.indexOf(0);
  visited[s] = 1;
  console.log("s", s);
  while (s > 0) {
    exploreNode(s);
    disjointGraphs++;
    s = visited.indexOf(0);
  }
  console.log("edges", minEdges, "disjointGraphs", disjointGraphs, minEdges);
  const oneLibCost = disjointGraphs * c_lib + minEdges * c_road;
  allCosts.push(oneLibCost);
  console.log("allCosts", allCosts, disjointGraphs);
  return allCosts.sort((a, b) => a - b)[0];
};

console.log(
  roadsAndLibraries(5, 6, 1, [
    [1, 2],
    [1, 3],
    [1, 4],
  ])
);
