let roomCtl = require("controller.room");
let reporting = require("reporting");

module.exports.loop = function() {
  initMemory();

  for (let r in Game.rooms) {
    let room = Game.rooms[r];
    roomCtl.run(room);
  }

  reporting.run();

  pixels();
  gc();
};

function initMemory() {
  if (!Memory.requests) {
    Memory.requests = {};
  }
}

function pixels() {
  if (Game.cpu.bucket >= 10000) {
    if (Game.cpu.generatePixel() === OK) {
      Memory.pixels = Memory.pixels + 1;
    }
  }
}

function gc() {
  if (Game.time % 30 == 0)
    for (let i in Memory.creeps) {
      if (!Game.creeps[i]) {
        delete Memory.creeps[i];
      }
    }
}

