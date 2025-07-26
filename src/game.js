import World from "./world.js";
import EventStack from "./eventStack.js";

export default class Game {
  constructor(player, htmlController, world, commandMap, eventStack) {
    this.player = player;
    this.htmlController = htmlController;
    this.world = world;
    this.commandMap = commandMap;
    this.eventStack = eventStack;
  }

  init() {}

  start() {
    const boundRunGame = runGame.bind(this);
    requestAnimationFrame(boundRunGame);

    function runGame() {
      this.#update();
      this.#render();

      requestAnimationFrame(boundRunGame);
    }
  }

  #update() {
    while (!this.eventStack.isEmpty()) {
      this.eventStack.executeTop();
    }
  }

  #render() {
    this.world.render();
  }
}
