let harvesting = require("controller.harvesting");
let spawning = require("controller.spawning");
let upgrading = require("controller.upgrading");
let defending = require("controller.defending");

module.exports.run = function() {
  if (Game.time % 10) {
    Memory.reports = {
      "time": new Date().toJSON(),
      "global": reportGlobals(),
      ...harvesting.report(),
      ...spawning.report(),
      ...upgrading.report(),
      ...defending.report(),
    };
  }
}

function reportGlobals() {
  return {
    cpu: {
      bucket: Game.cpu.bucket,
      used: Game.cpu.getUsed(),
      limit: Game.cpu.limit
    },
    gcl: {
      level: Game.gcl.level,
      progress: Game.gcl.progress
    },
    gpl: {
      level: Game.gpl.level,
      progress: Game.gpl.progress
    },
    pixels: {
      generated: Memory.pixels
    }
  }
}
