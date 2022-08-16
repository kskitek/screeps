var _ = require("lodash");

module.exports.run = function(room) {
  // No defence code for now
}

module.exports.report = function() {
  const report = {
    "defending": {}
  };


  for (let r in Game.rooms) {
    let room = Game.rooms[r];

    let enemies = room.find(FIND_HOSTILE_CREEPS, {
      filter: c => c.getActiveBodyparts(ATTACK) > 0 || c.getActiveBodyparts(RANGED_ATTACK) > 0
    });

    report.defending[room.name] = {
      enemies: enemies.length,
      defenders: 0
    };
  }

  return report;
}
