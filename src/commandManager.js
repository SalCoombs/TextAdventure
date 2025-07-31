import { directions } from "./constants.js";

export default class CommandManager {
  constructor(world) {
    this.world = world;
    this.commandMap = {
      move: {
        up: world.moveAdjacentGen(directions.UP),
        down: world.moveAdjacentGen(directions.DOWN),
        left: world.moveAdjacentGen(directions.LEFT),
        right: world.moveAdjacentGen(directions.RIGHT),
      },
      dig: () => {
        console.log("DigFn");
      },
    };
  }
}
