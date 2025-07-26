export default class EventStack {
  constructor() {
    this.head = null;
  }

  queue(event) {
    const newEvent = new GameEvent(event);
    if (this.head) {
      newEvent.next = this.head;
    }

    this.head = newEvent;
  }

  executeTop() {
    this.head.event();
    this.head = this.head.next ? this.head : null;
  }

  isEmpty() {
    return this.head == null;
  }
}

class GameEvent {
  constructor(event) {
    this.event = event;
    this.next = null;
  }
}
