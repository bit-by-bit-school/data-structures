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
    this.node = null;
    this.topLeftTree = null;
    this.topRightTree = null;
    this.bottomLeftTree = null;
    this.bottomRightTree = null;
  }

  insert(node) {
    if (node == null) return;

    // if the node is outside the tree region
    if (!this.inBoundary(node.pos)) return;

    // if the region has unit area, it cannot be subdivided
    if (
      Math.abs(this.topLeft.x - this.bottomRight.x) <= 1 &&
      Math.abs(this.topLeft.y - this.bottomRight.y) <= 1
    ) {
      if (this.node == null) {
        this.node = node;
      }
      return;
    }

    // if the point is on the left half
    if ((this.topLeft.x + this.bottomRight.x) / 2 >= node.pos.x) {
      // if the point is on the top half
      if ((this.topLeft.y + this.bottomRight.y) / 2 >= node.pos.y) {
        if (this.topLeftTree == null) {
          // the mid point of previous tree becomes bottom right point for new tree
          this.topLeftTree = new QuadTree(
            this.topLeft,
            new Point(
              (this.topLeft.x + this.bottomRight.x) / 2,
              (this.topLeft.y + this.bottomRight.y) / 2
            )
          );
        }
        this.topLeftTree.insert(node);
      } else {
        // if the point is on bottom half
        if (this.bottomLeftTree == null) {
          this.bottomLeftTree = new QuadTree(
            new Point(
              this.topLeft.x,
              (this.topLeft.y + this.bottomRight.y) / 2
            ),
            new Point(
              (this.topLeft.x + this.bottomRight.x) / 2,
              this.bottomRight.y
            )
          );
        }
        this.bottomLeftTree.insert(node);
      }
    } else {
      // if the point is in the top right tree
      if ((this.topLeft.y + this.bottomRight.y) / 2 >= node.pos.y) {
        if (this.topRightTree == null) {
          this.topRightTree = new QuadTree(
            new Point(
              (this.topLeft.x + this.bottomRight.x) / 2,
              this.topLeft.y
            ),
            new Point(
              this.bottomRight.x,
              (this.topLeft.y + this.bottomRight.y) / 2
            )
          );
        }
        this.topRightTree.insert(node);
      } else {
        // if the point is in bottom right tree
        if (this.bottomRightTree == null) {
          this.bottomRightTree = new QuadTree(
            new Point(
              (this.topLeft.x + this.bottomRight.x) / 2,
              (this.topLeft.y + this.bottomRight.y) / 2
            ),
            this.bottomRight
          );
        }
        this.bottomRightTree.insert(node);
      }
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
console.log(quad);
