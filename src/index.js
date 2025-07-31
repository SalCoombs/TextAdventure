//Class imports
import GameLoop from "./gameLoop.js";
import Player from "./player.js";
import HtmlController from "./htmlController.js";
import EventQueue from "./eventQueue.js";
import World from "./world.js";
import InputHandler from "./inputHandler.js";
import InputParser from "./inputParser.js";
import CommandManager from "./commandManager.js";

//Object imports

window.addEventListener("load", handleDocumentLoaded);

function handleDocumentLoaded() {
  const game = linkObjects();
  game.start();
}

function linkObjects() {
  const eventQueue = new EventQueue();
  const player = new Player();
  const htmlController = new HtmlController();
  const world = new World(player, htmlController, 18, 18);
  const commandManager = new CommandManager(world);
  const inputParser = new InputParser(
    htmlController,
    commandManager,
    eventQueue
  );
  const inputHandler = new InputHandler(
    eventQueue,
    htmlController,
    world,
    player,
    inputParser
  );
  htmlController.inputCallback = inputHandler.handleInput.bind(inputHandler);

  return new GameLoop(world, eventQueue);
}
