let upgrader = require("role.upgrader");

const role = "upgrader";

module.exports.dispatch = function(room) {
  let sources = room.find(FIND_SOURCES).length;
  let creeps = room.find(FIND_MY_CREEPS, {
    filter: c => c.memory.role === role
  });

  let maxUpgraders = room.controller.level == 8 ? 1 : sources.length*2;
  if ( creeps.length < maxUpgraders) {
    request(room, [MOVE, MOVE, CARRY, WORK], {});
  }

  for (let c in creeps) {
    upgrader.run(creeps[c]);
  }
}

module.exports.report = function(room) {
}

function request(room, body, mem) {
  Memory.requests.spawn.push({
    room: room.name,
    body: body,
    mem: mem,
    role: role
  })
}
