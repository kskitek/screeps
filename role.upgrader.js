var _ = require("lodash");

const role = "upgrader";

var roleUpgrader = {
  run: function(creep) {

    if (creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
    }
    if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
    }

    if (creep.memory.upgrading) {
      var res = creep.upgradeController(creep.room.controller);
      if (res == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {
          visualizePathStyle: { stroke: "#ffffff" }
        });
      }
    } else {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.memory.source) {
        var source = sources[creep.memory.source];
      } else {
        var source = sources[0];
      }
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {
          visualizePathStyle: { stroke: "#ffaa00" }
        });
      }
    }
  }
};

module.exports = roleUpgrader;
