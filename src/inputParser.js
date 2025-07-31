export default class InputParser {
  constructor(htmlController, commandManager, eventQueue) {
    this.input = "";
    this.htmlController = htmlController;
    this.commandManager = commandManager;
    this.eventQueue = eventQueue;
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

    const command = inputMatch[1];
    const args = inputMatch.slice(2);

    let commandObject = this.commandManager.commandMap[command];
    if (!commandObject) {
      this.htmlController.displayText("Invalid Command.");
      return;
    }

    for (let i = 0; i < args.length; i++) {
      const argument = args[i];
      commandObject = commandObject[argument];
      if (typeof commandObject === "function") break;
    }

    this.eventQueue.queue(commandObject);
  }
}
