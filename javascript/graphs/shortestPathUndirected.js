const shortestPath = (matrix, n, s, t) => {
  return bfp(matrix, n, s, t);
};

bfp = function (matrix, n, s, t) {
  const pathTo = (edgeTo, s, t) => {
    const pathTo = [t];
    let curr = t;
    while (curr !== s) {
      curr = edgeTo[curr];
      pathTo.push(curr);
    }
    return pathTo.reverse()
  };
  const queue = [s];
  const visited = Array(n).fill(0);
  const edgeTo = [];
  visited[s] = 1;
  while (queue.length) {
    const curr = queue.shift();
    if (curr === t) return [t, pathTo(edgeTo, s, t)];
    for (let i = 0; i < n; i++) {
      if (matrix[curr][i] && !visited[i]) {
        queue.push(i);
        visited[i] = 1;
        edgeTo[i] = curr;
      }
    }
  }
};

console.log(
  shortestPath(
    [
      [0, 1, 0, 1, 0, 0],
      [1, 0, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 1, 1],
      [0, 1, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 0],
    ],
    6,
    5,
    4
  )
);
