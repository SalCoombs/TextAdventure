export default class InputParser {
  constructor(htmlController, commandMap, eventStack) {
    this.input = "";
    this.htmlController = htmlController;
    this.commandMap = commandMap;
    this.eventStack = eventStack;
  }

  setInput(input) {
    this.input = input;
  }

  parseInput() {
    const commandMatch = this.input.match(/^(\w+)(?:\s+(.+))?$/);
    const commandKey = commandMatch[1];
    // console.log(commandKey);
    // console.log(this.commandMap[commandKey]);
    if (!this.commandMap[commandKey]) {
      console.error("Parse Input: Unable to find command");
      return;
    }
  }
}
