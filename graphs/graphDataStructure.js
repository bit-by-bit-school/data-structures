// const dfs = require("./depthFirstSearch.js")

class Graph {
  matrix;
  length;
  constructor(edges, n) {
    this.matrix = Array(n)
      .fill()
      .map(() => Array(n).fill(0));
    edges.forEach((e) => {
      this.matrix[e[0]][e[1]] = 1;
      this.matrix[e[1]][e[0]] = 1;
    });
    this.length = n;
  }

  [Symbol.iterator]() {
    const stack = [];
    const visited = [];
    const matrix = this.matrix;
    const length = this.length;
    let done = false;
    return {
      next() {
        if (done === true)
          return {
            value: undefined,
            done: true,
          };
        if (!stack.length) {
          visited[0] = 1;
          stack.push([0, 0]);
        }
        let [currParent, prevChild] = stack.pop();
        let currChild = prevChild + 1;
        while (currParent <= length - 1 && currChild <= length - 1) {
          if (matrix[currParent][currChild] && !visited[currChild]) {
            visited[currChild] = 1;
            stack.push([currParent, currChild]);
            currParent = currChild;
            currChild = 0;
            continue;
          }
          currChild++;
        }
        const value = stack[stack.length - 1] ? stack[stack.length - 1][1] : 0;
        if (value === 0) done = true;
        return {
          value,
          done: false,
        };
      },
    };
  }
}

const g1 = new Graph(
  [
    [0, 1],
    [1, 2],
    [1, 4],
    [2, 3],
    [2, 4],
    [0, 5],
    [4, 5]
  ],
  6
);

for (let n of g1) {
  console.log("iter", n);
}
