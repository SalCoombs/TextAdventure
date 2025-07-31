export default class InputHandler {
  constructor(inputParser) {
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
