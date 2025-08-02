export default class HtmlController {
  constructor(eventSystem) {
    this.textDisplay = document.getElementById("text-display");
    if (!this.textDisplay) {
      console.error("Failed to find the game display");
    }

    this.controlBox = document.getElementById("control-box");
    if (!this.controlBox) {
      console.error("Failed to get control box.");
    }

    this.display = document.getElementById("game-map");
    if (!this.display) {
      console.error("Failed to get game map");
      return;
    }

    this.inputCallback = null;
    this.eventSystem = eventSystem;

    this.#initHtml();
  }

  displayText(text) {
    this.textDisplay.textContent += `${text}\n`;
  }

  displayMap(data) {
    this.display.textContent = `${data}\n`;
  }

  #initHtml() {
    this.controlBox.addEventListener("input", cancelNewlines);
    this.controlBox.addEventListener("keydown", acceptPlayerInput.bind(this));

    /** Callback for the input event listener. Prevents newlines.
     */
    function cancelNewlines(event) {
      event.target.value = event.target.value.replace(/\n/g, "");
    }

    /** Callback for keydown event listener. Updates games input. */
    function acceptPlayerInput(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        this.inputCallback(event.target.value);
        event.target.value = "";
      }
    }

    const CHAR_WIDTH = 8;
    const maxLineLen = Math.floor(this.controlBox.clientWidth / CHAR_WIDTH);
    this.controlBox.maxLength = maxLineLen;

    this.displayText(`Tutorial: Use the command bar to move your character.`);
    this.displayText(`I.E. move (up/down/left/right)`);
  }
}
