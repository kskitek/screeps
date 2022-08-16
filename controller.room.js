let harvesting = require("controller.harvesting");
let upgrading = require("controller.upgrading");
let spawning = require("controller.spawning");

module.exports.run = function(room) {
  const hostiles = room.find(FIND_HOSTILE_CREEPS);
  if (hostiles.length > 0) {
    Game.notify("Hostiles in the room!");
  }

  switch (room.level) {
    default:
      harvesting.run(room);
      upgrading.run(room);
  }

  spawning.run(room);
};
