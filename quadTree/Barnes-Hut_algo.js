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
  let maxX = particles[0].x,
    maxY = particles[0].y,
    minX = particles[0].x,
    minY = particles[0].y;

  for (const particle of particles) {
    if (particle.x > maxX) maxX = particle.x;
    if (particle.y > maxY) maxY = particle.y;
    if (particle.x < minX) minX = particle.x;
    if (particle.y < minY) minY = particle.y;
  }
  // console.log(maxX, maxY, minX, minY);
  const root = new QuadTree(new Point(minX, minY), new Point(maxX, maxY));
  // console.log(root);

  particles.forEach((particle) => {
    const newNode = new Node(new Point(particle.x, particle.y), {
      mass: particle.mass,
    });
    root.insert(newNode);
  });
  // console.log(particles);

  return root;
}

function computeForce(tree, particle, theta) {
  const maxForce = 5;
  const dx = tree.centerOfMass.x - particle.x;
  const dy = tree.centerOfMass.y - particle.y;
  // console.log(dx, dy);

  const d = Math.sqrt(dx ** 2 + dy ** 2);
  const s = tree.bottomRight.x - tree.topLeft.x;
  // console.log(s / d);

  if (tree.isLeaf() || s / d < theta) {
    let F = (G * tree.mass * particle.mass) / d ** 2;
    // console.log(F);
    if (F > maxForce) F = maxForce;

    particle.ax += (F / particle.mass) * (dx / d);
    particle.ay += (F / particle.mass) * (dy / d);
  } else {
    // console.log("hi");
    const children = tree.getChildren();
    children
      .filter((child) => child instanceof QuadTree)
      .forEach((child) => computeForce(child, particle, theta));
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
