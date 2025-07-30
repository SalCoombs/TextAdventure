export default class GameLoop {
  constructor(world, eventStack) {
    this.world = world;
    this.eventStack = eventStack;
  }

  start() {
    const boundRunGame = runGame.bind(this);
    requestAnimationFrame(boundRunGame);

    function runGame() {
      this.#update();
      this.#render();

      requestAnimationFrame(boundRunGame);
    }
  }

  // This function is used.
  #update() {
    while (!this.eventStack.isEmpty()) {
      this.eventStack.pop();
    }
  }

  // This function is also used.
  #render() {
    this.world.render();
  }
}
