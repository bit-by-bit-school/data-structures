// const { QuadTree, Node, Point } = require("./quadTree.js");
import { QuadTree, Node, Point } from "./quadTree.js";

let particles = [];
let dt = 0;
const G = 0.5;

export function init(input, timeStep) {
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
  let maxX = -Infinity,
    maxY = -Infinity,
    minX = Infinity,
    minY = Infinity;

  for (const particle of particles) {
    if (particle.x > maxX) maxX = particle.x;
    if (particle.y > maxY) maxY = particle.y;
    if (particle.x < minX) minX = particle.x;
    if (particle.y < minY) minY = particle.y;
  }
  const width = maxX - minX;
  const height = maxY - minY;
  const side = Math.max(width, height);

  const root = new QuadTree(
    new Point(minX, minY),
    new Point(minX + side, minY + side)
  );

  particles.forEach((particle) => {
    const newNode = new Node(new Point(particle.x, particle.y), {
      mass: particle.mass,
    });
    root.insert(newNode);
  });

  return root;
}

function computeForce(tree, particle, theta) {
  const maxForce = 0.01;
  let dx, dy, s, F;
  if (tree instanceof QuadTree) {
    dx = tree.centerOfMass.x - particle.x;
    dy = tree.centerOfMass.y - particle.y;
    s = tree.bottomRight.x - tree.topLeft.x;
  } else if (tree instanceof Node) {
    dx = tree.pos.x - particle.x;
    dy = tree.pos.y - particle.y;
  }

  const d = Math.sqrt(dx ** 2 + dy ** 2);

  if (
    tree instanceof Node &&
    tree.pos.x === particle.x &&
    tree.pos.y === particle.y
  ) {
    return;
  }

  if (tree instanceof Node) {
    F = (G * tree.value.mass * particle.mass) / d ** 2;
    if (F > maxForce) F = maxForce;

    particle.ax += (F / particle.mass) * (dx / d);
    particle.ay += (F / particle.mass) * (dy / d);
  } else if (s / d < theta) {
    F = (G * tree.mass * particle.mass) / d ** 2;
    if (F > maxForce) F = maxForce;

    particle.ax += (F / particle.mass) * (dx / d);
    particle.ay += (F / particle.mass) * (dy / d);
  } else {
    const children = tree.getChildren();
    children.forEach((child) => computeForce(child, particle, theta));
  }
}

function computeAcceleration() {
  const theta = 0.5;
  const quadTree = buildQuadTree();
  particles.forEach((particle) => {
    particle.ax = 0;
    particle.ay = 0;
    computeForce(quadTree, particle, theta);
  });
}

function updatePositions() {
  particles.forEach((particle) => {
    particle.vx += particle.ax * dt;
    particle.vy += particle.ay * dt;

    particle.x += particle.vx * dt;
    particle.y += particle.vy * dt;
  });
}

export function next() {
  computeAcceleration();
  updatePositions();
  buildQuadTree();

  return particles.map((p) => {
    return { x: p.x, y: p.y };
  });
}

// module.exports = { init, next };
