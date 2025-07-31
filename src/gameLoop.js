export default class GameLoop {
  constructor(world, eventSystem) {
    this.world = world;
    this.eventSystem = eventSystem;
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
    this.eventSystem.emit("move");
  }

  // This function is also used.
  #render() {
    this.world.render();
  }
}
