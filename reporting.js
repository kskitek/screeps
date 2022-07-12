let harvesting = require("controller.harvesting");
let spawning = require("controller.spawning");

module.exports.run = function() {
  if (Game.time % 10) {
    Memory.reports = {
      "time": new Date().toJSON(),
      "global": reportGlobals(),
      ...harvesting.report(),
      ...spawning.report(),
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
    pixels: Memory.pixels
  }
}
