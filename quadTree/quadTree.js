export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Node {
  constructor(pos, value) {
    this.pos = pos;
    this.value = value;
  }
}

export class QuadTree {
  constructor(topLeft, bottomRight) {
    this.topLeft = topLeft;
    this.bottomRight = bottomRight;
    this.midPoint = new Point(
      (this.topLeft.x + this.bottomRight.x) / 2,
      (this.topLeft.y + this.bottomRight.y) / 2
    );
    this.subTrees = {
      topLeft: null,
      bottomLeft: null,
      topRight: null,
      bottomRight: null,
    };
    this.mass = 0;
    this.centerOfMass = new Point(0, 0);
  }

  isLeaf() {
    return (
      this.subTrees["topLeft"] == null &&
      this.subTrees["bottomLeft"] == null &&
      this.subTrees["topRight"] == null &&
      this.subTrees["bottomRight"] == null
    );
  }

  insert(node) {
    if (node == null) return;

    this.updateMassAndCoM(node);

    const quadrant = this.getQuadrant(node);

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

  // inBoundary(point) {
  //   return (
  //     point.x >= this.topLeft.x &&
  //     point.x <= this.bottomRight.x &&
  //     point.y >= this.topLeft.y &&
  //     point.y <= this.bottomRight.y
  //   );
  // }

  updateMassAndCoM(node) {
    const totalMass = this.mass + node.value.mass;
    this.centerOfMass = new Point(
      (this.mass * this.centerOfMass.x + node.value.mass * node.pos.x) /
        totalMass,
      (this.mass * this.centerOfMass.y + node.value.mass * node.pos.y) /
        totalMass
    );
    this.mass = totalMass;
  }

  getQuadrant(node) {
    if (node.pos.x <= this.midPoint.x) {
      if (node.pos.y <= this.midPoint.y) return "topLeft";
      return "bottomLeft";
    }
    if (node.pos.y <= this.midPoint.y) return "topRight";
    return "bottomRight";
  }

  getBoundaryForQuadrant(quadrant) {
    switch (quadrant) {
      case "topLeft":
        return [this.topLeft, this.midPoint];
      case "bottomLeft":
        return [
          new Point(this.topLeft.x, this.midPoint.y),
          new Point(this.midPoint.x, this.bottomRight.y),
        ];
      case "topRight":
        return [
          new Point(this.midPoint.x, this.topLeft.y),
          new Point(this.bottomRight.x, this.midPoint.y),
        ];
      case "bottomRight":
        return [this.midPoint, this.bottomRight];
    }
  }

  getChildren() {
    const quadrants = ["topLeft", "bottomLeft", "topRight", "bottomRight"];

    return quadrants
      .map((quadrant) => this.subTrees[quadrant])
      .filter((child) => child != null);
  }

  // eager algo
  [Symbol.iterator]() {
    const queue = [];

    const populateQueue = function (tree) {
      const children = tree.getChildren();

      for (const child of children) {
        if (child instanceof Node) {
          queue.push(child.value);
        } else if (child instanceof QuadTree) {
          populateQueue(child);
        }
      }
    };
    populateQueue(this); // calculates all values beforehand

    return {
      next: () => {
        if (queue.length === 0) return { done: true };

        return { value: queue.shift(), done: false };
      },
    };
  }

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
              queue.unshift(child);
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
