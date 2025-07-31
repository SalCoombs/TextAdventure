export default class InputHandler {
  constructor(eventStack, htmlController, world, player, inputParser) {
    this.eventStack = eventStack;
    this.htmlController = htmlController;
    this.world = world;
    this.player = player;
    this.inputParser = inputParser;
  }

  handleInput(rawInput) {
    if (!rawInput) return;
    const input = this.#clean(rawInput);

    this.inputParser.setInput(input);
    this.inputParser.parseInput();
  }

  #clean(input) {
    const cleanedInput = input.trim().toLowerCase();
    return cleanedInput;
  }
}
