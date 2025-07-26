//Class imports
import Game from "./game.js";
import Player from "./player.js";
import HtmlController from "./htmlController.js";
import EventStack from "./eventStack.js";
import World from "./world.js";
import CommandMap from "./commandMap.js";
import InputHandler from "./inputHandler.js";

//Object imports

window.addEventListener("load", handleDocumentLoaded);

function handleDocumentLoaded() {
  const eventStack = new EventStack();
  const player = new Player();
  const htmlController = new HtmlController();
  const world = new World(18, 18, player, htmlController);
  const commandMap = new CommandMap(player, world);
  const inputHandler = new InputHandler(eventStack, htmlController, commandMap);
  htmlController.inputCallback = inputHandler.handle.bind(inputHandler);

  const game = new Game(player, htmlController, world, commandMap, eventStack);
  game.start();
}
