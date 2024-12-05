class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Node {
  constructor(pos, value) {
    this.pos = pos;
    this.value = value;
  }
}

class QuadTree {
  constructor(topLeft, bottomRight) {
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;
    this.subTrees = {
      topLeft: null,
      bottomLeft: null,
      topRight: null,
      bottomRight: null,
    };
  }

  getQuadrants(node) {
    const midX = (this.topLeft.x + this.bottomRight.x) / 2;
    const midY = (this.topLeft.y + this.bottomRight.y) / 2;

    if (node.pos.x <= midX) {
      if (node.pos.y <= midY) return "topLeft";
      return "bottomLeft";
    }
    if (node.pos.y <= midY) return "topRight";
    return "bottomRight";
  }

  getBoundaryForQuadrant(quadrant) {
    const midX = (this.topLeft.x + this.bottomRight.x) / 2;
    const midY = (this.topLeft.y + this.bottomRight.y) / 2;

    switch (quadrant) {
      case "topLeft":
        return [this.topLeft, new Point(midX, midY)];
      case "bottomLeft":
        return [
          new Point(this.topLeft.x, midY),
          new Point(midX, this.bottomRight.y),
        ];
      case "topRight":
        return [
          new Point(midX, this.topLeft.y),
          new Point(this.bottomRight.x, midY),
        ];
      case "bottomRight":
        return [new Point(midX, midY), this.bottomRight];
    }
  }

  insert(node) {
    if (node == null || !this.inBoundary(node.pos)) return;

    const quadrant = this.getQuadrants(node);

    if (this.subTrees[quadrant] == null) {
      this.subTrees[quadrant] = new Node(node.pos, node.value);
    } else if (this.subTrees[quadrant] instanceof Node) {
      const existingNode = this.subTrees[quadrant];
      const [topLeft, bottomRight] = this.getBoundaryForQuadrant(quadrant);
      this.subTrees[quadrant] = new QuadTree(topLeft, bottomRight);
      this.subTrees[quadrant].insert(existingNode);
      this.subTrees[quadrant].insert(node);
    } else {
      this.subTrees[quadrant].insert(node);
    }
  }

  inBoundary(point) {
    return (
      point.x >= this.topLeft.x &&
      point.x <= this.bottomRight.x &&
      point.y >= this.topLeft.y &&
      point.y <= this.bottomRight.y
    );
  }

  getChildren() {
    const children = [];
    const quadrants = ["topLeft", "bottomLeft", "topRight", "bottomRight"];

    for (const quadrant of quadrants) {
      const child = this.subTrees[quadrant]; // here node is a point, whose children I'm supposed to find
      if (child != null) {
        children.push(child);
      }
    }
    return children;
  }

  // eager algo
  // [Symbol.iterator]() {
  //   const queue = [];

  //   const populateQueue = function (tree) {
  //     const children = tree.getChildren();

  //     for (const child of children) {
  //       if (child instanceof Node) {
  //         queue.push(child.value);
  //       } else if (child instanceof QuadTree) {
  //         populateQueue(child);
  //       }
  //     }
  //   };
  //   populateQueue(this); // calculates all values beforehand

  //   return {
  //     next: () => {
  //       if (queue.length === 0) return { done: true };

  //       return { value: queue.shift(), done: false };
  //     },
  //   };
  // }

  // lazy algo
  [Symbol.iterator]() {
    const queue = [this];

    return {
      next: () => {
        while (queue.length > 0) {
          const current = queue.shift();

          if (current instanceof QuadTree) {
            const children = current.getChildren();

            for (const child of children) {
              queue.push(child);
            }
          } else if (current instanceof Node) {
            return { value: current.value, done: false };
          }
        }
        return { done: true };
      },
    };
  }
}

const quad = new QuadTree(new Point(0, 0), new Point(8, 8));
const a = new Node(new Point(1, 1), 1);
const b = new Node(new Point(2, 5), 2);
const c = new Node(new Point(7, 6), 3);
const d = new Node(new Point(5, 3), 4);
quad.insert(a);
quad.insert(b);
quad.insert(c);
quad.insert(d);
// const quad1 = new QuadTree(new Point(0, 0), new Point(4, 4));
console.log([...quad]);
