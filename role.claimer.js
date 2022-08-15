var _ = require("lodash");

const role = "claimer";
const scehma = [];
const roomsToClaim = ["W29S18"];

var roleDefender = {
  spawn: function() {
    let claimers = _.filter(Game.creeps, c => c.getActiveBodyparts(CLAIM) != 0);
    let rooms = _.filter(roomsToClaim, r => r.memory.my == true);
    let creeps = spawn.room.find(FIND_MY_CREEPS, {
      filter: c => c.memory.role === role
    });
    if (creeps.length < Memory.sizes.defenders) {
      spawn.spawnCreep(swarmer, role + (Game.time % 2000), {
        memory: { role: role }
      });
    }
  },

  run: function(creep) {
    const targets = creep.room.find(FIND_HOSTILE_CREEPS);
    if (targets.length > 0) {
      Game.notify("Hostiles!" + JSON.stringify(targets));
      const target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
      creep.moveTo(target);
      creep.attack(target);
    } else {
      var flag = creep.room.find(FIND_FLAGS, {
        filter: f => f.name == "MainDefence"
      });
      creep.moveTo(flag[0], {
        visualizePathStyle: { stroke: "#00ff00" }
      });
    }
  }
};

module.exports = roleDefender;
