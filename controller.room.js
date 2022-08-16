let harvesting = require("controller.harvesting");
let upgrading = require("controller.upgrading");
let spawning = require("controller.spawning");
let defending = require("controller.defending");

module.exports.run = function(room) {
  defending.run(room);
  harvesting.run(room);
  spawning.run(room);
  upgrading.run(room);
};
