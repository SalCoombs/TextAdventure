//Class imports
import Game from "./game.js";
import Player from "./player.js";
import HtmlController from "./htmlController.js";
import EventStack from "./eventStack.js";
import World from "./world.js";
import InputHandler from "./inputHandler.js";

//Object imports

window.addEventListener("load", handleDocumentLoaded);

function handleDocumentLoaded() {
  const game = linkObjects();
  game.start();
}

function linkObjects() {
  const eventStack = new EventStack();
  const player = new Player();
  const htmlController = new HtmlController();
  const world = new World(18, 18, player, htmlController);
  const inputHandler = new InputHandler(
    eventStack,
    htmlController,
    world,
    player
  );
  htmlController.inputCallback = inputHandler.handle.bind(inputHandler);

  return new Game(player, htmlController, world, eventStack);
}
