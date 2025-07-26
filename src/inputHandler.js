export default class InputHandler {
  constructor(eventStack, htmlController, commandMap) {
    this.eventStack = eventStack;
    this.htmlController = htmlController;
    this.commandMap = commandMap;
  }

  handle(rawInput) {
    if (!rawInput) return;

    const input = this.#clean(rawInput);
    const matchMove = input.match(/move (up|down|left|right)/);
    if (!matchMove) {
      this.htmlController.displayText("Invalid command. No match");
      return;
    }
    const direction = matchMove[1];
    const moveAction = this.commandMap[direction];
    if (!moveAction) {
      this.htmlController.displayText("Invalid command. No action");
      return;
    }

    this.eventStack.queue(moveAction);
  }

  #clean(input) {
    const cleanedInput = input.trim().toLowerCase();
    return cleanedInput;
  }
}
