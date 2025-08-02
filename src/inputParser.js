export default class InputParser {
  constructor(htmlController, commandManager, eventSystem) {
    this.input = "";
    this.htmlController = htmlController;
    this.commandManager = commandManager;
    this.eventSystem = eventSystem;
  }

  setInput(input) {
    this.input = input;
  }

  parseInput() {
    const inputMatch = this.input.match(/^(\w+)(?:\s+(.+))?$/);
    if (!inputMatch) {
      this.htmlController.displayText("Invalid Input.");
      return;
    }

    const commandStr = inputMatch[1];
    const args = inputMatch.slice(2);

    let commandObject = this.commandManager.commandMap[commandStr];
    if (!commandObject) {
      this.htmlController.displayText("Invalid Command.");
      return;
    }

    for (const arg of args) {
      if (typeof commandObject !== "object") break;
      commandObject = commandObject[arg];
      if (typeof commandObject === "function") break;
    }
    // this.eventSystem.on(commandStr, commandObject);

    this.eventSystem.emit(commandObject);
  }
}
