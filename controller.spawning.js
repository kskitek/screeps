var _ = require('lodash');

module.exports.requestSpawn = function(room, role, body, mem) {
  initMem(room);

  if (!room.memory.spawn[role]) {
    room.memory.spawn[role] = [];
  }

  const spawnRequests = room.memory.spawn[role];
  spawnRequests.push({
    body: body,
    mem: mem,
    spawning: false,
  });
}

// TODO provide instead amethod to `spawnUpToXCreeps` that takes queue len into consideration
module.exports.getRequestedSpawns = function(room, role) {
  initMem(room);

  if (!room.memory.spawn[role]) {
    return [];
  }

  return room.memory.spawn[role];
}

function initMem(room) {
  if (!room.memory.spawn) {
    room.memory.spawn = {};
  }
}

module.exports.run = function(room) {
  initMem(room);

  const spawns = room.find(FIND_MY_STRUCTURES, {
    filter: s => s.structureType == STRUCTURE_SPAWN
  });

  for (let role in room.memory.spawn) {
    const requests = room.memory.spawn[role];

    for (let spawnId in spawns) {
      const spawn = spawns[spawnId];
      if (spawn.spawning) {
        if (spawn.spawning.remainingTime == 1) {
          room.memory.spawn[role] = _.remove(requests, spawn.spawning.name);
        }
        continue;
      }

      for (let i = 0; i < requests.length; i++) {
        const req = requests[i];
        if (req.spawning) {
          continue;
        }

        req.mem.role = role;
        req.spawning = true;
        req.name = role + spawnId + (Game.time % 1500);

        let err = spawn.spawnCreep(req.body, req.name, { memory: req.mem });
        if (err != 0) {
          req.spawning = false;
        }
      }
    }
  }
}

module.exports.report = function() {
  const report = {
    "spawning": {}
  };

  for (let r in Game.rooms) {
    let room = Game.rooms[r];

    let len = 0;
    for (let role in room.memory.spawn) {
      len += room.memory.spawn[role].length;
    }
    report.spawning = { [room.name]: { queueLength: len } };
  }

  return report;
}
