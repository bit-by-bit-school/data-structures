const { init, next } = require("./Barnes-Hut_algo.js");

const input = [
  { x: 100, y: 0, mass: 1 },
  { x: -100, y: 0, mass: 1 },
];

init(input, 10);

for (let i = 0; i < 1000; i++) {
  next();
}
