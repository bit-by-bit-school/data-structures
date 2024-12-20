const shortestPath = (matrix, n, s, t) => {
  let currChild = 0;
  let currParent = s;
  let prevChild;
  const distances = [];

  while (currChild < n) {
    console.log(currParent, currChild);
    const stack = dfs(matrix, n, currParent, t, currChild);

    const path = stack.map((p) => p[0]);
    path.push(stack[stack.length - 1][1]);
    const distance = path.length;
    distances.push([path, distance]);
    console.log(path, distance, stack);

    [currParent, prevChild] = stack[stack.length - 2];
    currChild = prevChild + 1;
  }

  console.log("distances", distances);
};

const dfs = (matrix, n, s, t, startChild) => {
  const stack = [];
  const visited = Array(n).fill(0);
  while (true) {
    console.log("stack in while true", stack)
    let currParent, currChild;
    if (!stack.length) {
      visited[s] = 1;
      currParent = s;
      currChild = startChild;
    } else {
      [currParent, prevChild] = stack.pop();
      currChild = prevChild + 1;
    }
    while (currParent < n && currChild < n) {
        console.log(currParent, currChild)
      if (matrix[currParent][currChild] && !visited[currChild]) {
        visited[currChild] = 1;
        stack.push([currParent, currChild]);
        if (currChild === t) return stack;
        currParent = currChild;
        currChild = 0;
        continue;
      }
      currChild++;
    }
  }
};

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
  0,
  5
);

// Properties: distance, path, hasPath
