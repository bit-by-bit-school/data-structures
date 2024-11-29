class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  find(value) {
    let currentNode = this.root;

    while (currentNode != null) {
      if (value === currentNode.value) return currentNode;

      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  insert(value) {
    const newNode = new Node(value);

    if (this.root == null) {
      this.root = newNode;
      return;
    }

    let currentNode = this.root;
    while (true) {
      if (value < currentNode.value) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  delete(value) {
    this.root = this.deleteNode(this.root, value);
  }
  // helper function
  deleteNode(node, value) {
    // if the tree is empty
    if (node == null) return null;

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value); // go left
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value); //go right
    } else {
      if (!node.left && !node.right) {
        node = null; // leaf node
      } else if (!node.left) {
        node = node.right; //one child node
      } else if (!node.right) {
        node = node.left; // one child node
      } else {
        // two child nodes
        node.value = this.findMin(node.right);
        node.right = this.deleteNode(node.right, node.value);
      }
    }
    return node;
  }

  findMin(node) {
    while (node.left != null) {
      node = node.left;
    }
    return node.value;
  }

  iterator(value) {
    const node = this.find(value);
    if (!node) return null; // value is not in the tree

    // value is in right subtree
    if (node.right) return this.findMin(node.right);

    // if no right subtree, find the lowest ancestor for which
    // value is in left subtree
    let currentNode = this.root;
    let successor = null;
    while (currentNode) {
      if (value < currentNode.value) {
        successor = currentNode.value;
        currentNode = currentNode.left;
      } else if (value > currentNode.value) {
        currentNode = currentNode.right;
      } else break; // found the value
    }
    return successor ? successor.value : null;
  }
}

const bst = new BinarySearchTree();

bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);

// console.log(bst);
// console.log(bst.findMin(bst.root));
// console.log(bst.insert(3));
console.log(bst.delete(3));
console.log(bst.root);
// console.log("Search for 7:", bst.find(7));
// console.log("Search for 20:", bst.find(20));
