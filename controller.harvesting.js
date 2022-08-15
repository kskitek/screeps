let harvester = require("role.harvester");
let spawning = require("controller.spawning");

const role = "harvester";

module.exports.run = function(room) {
  let sources = room.find(FIND_SOURCES).length;
  let creeps = room.find(FIND_MY_CREEPS, {
    filter: c => c.memory.role === role
  });
  let requestedCreeps = spawning.getRequestedSpawns(room, role);

  const creepsToSpawn = sources * 2 - (creeps.length + requestedCreeps.length);
  for (let i = 0; i < creepsToSpawn; i++) {
    spawning.requestSpawn(room, role, getBody(room), {});
  }
  // if (room.energyAvailable < room.energyCapacityAvailable) { TODO enable when done with experiments

  for (let c in creeps) {
    harvester.run(creeps[c]);
  }
}

module.exports.report = function() {
  const report = {
    "harvesting": {}
  };

  for (let r in Game.rooms) {
    let room = Game.rooms[r];
    let harvesters = room.find(FIND_MY_CREEPS, {
      filter: c => c.memory.role === role
    });

    report.harvesting[room.name] = {
      harvesters: harvesters.length,
      energy: room.energyAvailable,
      capacity: room.energyCapacityAvailable
    };
  }

  return report;
}

function getBody(room) {
  // TODO body based on room.controller.level or energyCapacity
  return [MOVE, MOVE, CARRY, WORK];
}
