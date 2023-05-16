let upgrader = require("role.upgrader");
let spawning = require("controller.spawning");

const role = "upgrader";

module.exports.run = function(room) {
  let sources = room.find(FIND_SOURCES);
  let creeps = room.find(FIND_MY_CREEPS, {
    filter: c => c.memory.role === role
  });
  let requestedCreeps = spawning.getRequestedSpawns(room, role);

  let maxUpgraders = room.controller.level == 8 ? 1 : sources.length * 2;
  let creepsToSpawn = maxUpgraders - (creeps.length + requestedCreeps.length);
  for (let i = 0; i < creepsToSpawn; i++) {
    spawning.requestSpawn(room, role, getBody(room), {});
  }

  for (let c in creeps) {
    upgrader.run(creeps[c]);
  }
}

function getBody(room) {
  // TODO body based on room.controller.level or energyCapacity
  return [MOVE, MOVE, CARRY, WORK];
}

module.exports.report = function() {
  const report = {
    "upgrading": {}
  };

  for (let r in Game.rooms) {
    let room = Game.rooms[r];
    let ctrl = room.controller;

    report.upgrading[room.name] = {
      level: ctrl.level,
      progress: ctrl.progress,
      ticksToDowngrade: ctrl.ticksToDowngrade,
    };
  }

  return report;
}
