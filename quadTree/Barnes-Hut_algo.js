const { QuadTree, Node, Point } = require("./quadTree.js");

let particles = [];
let dt = 0;
const G = 0.5;

function init(input, timeStep) {
  particles = input.map((particle) => ({
    ...particle,
    vx: 0,
    vy: 0,
    ax: 0,
    ay: 0,
  }));
  dt = timeStep;
}

function buildQuadTree() {
  const root = new QuadTree(new Point(0, 0), new Point(500, 500));

  particles.forEach((particle) => {
    const newNode = new Node(new Point(particle.x, particle.y), { mass });
    root.insert(newNode);
  });

  return root;
}

function computeForce(tree, particle, theta) {
  const dx = tree.centerOfMass.x - particle.pos.x;
  const dy = tree.centerOfMass.y - particle.pos.y;

  const d = Math.sqrt(dx ** 2 + dy ** 2);
  const s = tree.bottomRight.x - tree.topLeft.x;

  if (s / d < theta) {
    const F = (G * tree.mass * particle.value.mass) / d ** 2;

    particle.ax += (F / particle.value.mass) * (dx / d);
    particle.ay += (F / particle.value.mass) * (dy / d);
  } else {
    const children = tree.getChildren();
    children.forEach((child) => computeForce(child, particle, theta));
  }
}

function computeAcceleration() {
  const theta = 0.5;
  const quadTree = buildQuadTree();
  particles.forEach(quadTree, particle, theta);
}

function updatePositions() {
  particles.forEach((particle) => {
    particle.vx += particle.ax * dt;
    particle.vy += particle.ay * dt;

    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
  });
}

function next() {
  computeAcceleration();
  updatePositions();

  return particles.map((p) => {
    return { x: p.x, y: p.y };
  });
}
