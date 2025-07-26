export default class InputHandler {
  constructor(eventStack, htmlController, world, player) {
    this.eventStack = eventStack;
    this.htmlController = htmlController;
    this.world = world;
    this.player = player;
  }

  handle(rawInput) {
    if (!rawInput) return;
    const input = this.#clean(rawInput);

    const matchMove = input.match(/move (up|down|left|right)/);
    if (!matchMove) {
      this.htmlController.displayText("handle: Invalid command. No match");
      return;
    }

    const direction = matchMove[1];
    const moveAction = this.world.moveAdjacentGen(this.player, direction);

    if (!moveAction) {
      this.htmlController.displayText("handle: Invalid command. No action");
      return;
    }

    this.eventStack.queue(moveAction);
  }

  #clean(input) {
    const cleanedInput = input.trim().toLowerCase();
    return cleanedInput;
  }
}
