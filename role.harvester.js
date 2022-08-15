const role = "harvester";
const schema = [MOVE, MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, CARRY];

var roleHarvester = {
  spawn: function() {
    let spawn = Game.spawns["Spawn1"];
    let creeps = spawn.room.find(FIND_MY_CREEPS, {
      filter: c => c.memory.role === role
    });
    let sources = spawn.room.find(FIND_SOURCES);
    for (let src in sources) {
      let creepsPerSource = creeps.length;
      creeps = _.filter(creeps, c => c.memory.source != sources[src].id);
      creepsPerSource = creepsPerSource - creeps.length;
      if (creepsPerSource < Memory.sizes.harvesters) {
        spawn.spawnCreep(schema, role + (Game.time % 2000), {
          memory: { role: role, source: sources[src].id }
        });
      }
    }
  },

  run: function(creep) {
    let sources = creep.room.find(FIND_SOURCES);
    // var valuableTombstones = findTombstones(creep);
    // if (valuableTombstones) {
    //   if (creep.harvest(valuableTombstones[0]) == ERR_NOT_IN_RANGE) {
    //     creep.moveTo(valuableTombstones[0], {
    //       visualizePathStyle: { stroke: "#ffaa00" }
    //     });
    //   }
    // }

    if (creep.carry.energy < creep.carryCapacity) {
      if (!creep.memory.source) {
        creep.memory.source = sources[0].id
      }

      for (let src in sources) {
        if (sources[src].id === creep.memory.source) {
          var source = sources[src];
        }
      }
      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    } else {
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: structure => {
          return (
            (structure.structureType == STRUCTURE_EXTENSION ||
              structure.structureType == STRUCTURE_CONTAINER ||
              structure.structureType == STRUCTURE_SPAWN ||
              structure.structureType == STRUCTURE_TOWER) &&
            (structure.energy < structure.energyCapacity ||
              structure.store < structure.storeCapacity)
          );
        }
      });
      var target = undefined;
      var storage = creep.room.storage;
      // var storage = undefined;
      if (
        targets.length == 0 &&
        storage != undefined &&
        storage.store.energy < storage.storeCapacity
      ) {
        target = storage;
      } else {
        target = targets[0];
      }
      setConfused(creep, undefined);
      if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: "#ffffff" } });
      }
      if (
        storage == undefined ||
        storage.store.energy == storage.storeCapacity
      ) {
        setConfused(creep, "no targets");
      }
    }
  }
};

module.exports = roleHarvester;

var setConfused = function(creep, reason) {
  if (reason == undefined) {
    creep.memory.confused = false;
    creep.memory.confusedReason = undefined;
  } else {
    creep.memory.confused = true;
    creep.memory.confusedReason = reason;
  }
};

var findTombstones = function(creep) {
  var tombstones = creep.room.find(FIND_TOMBSTONES, {
    filter: t => t.creep.owner.username === "Invader"
  });
  // return tombstones;
  return undefined;
};
