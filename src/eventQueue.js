export default class EventQueue {
  constructor() {
    this.head = null;
  }

  queue(event) {
    const newEvent = new GameEvent(event);
    if (this.head) {
      this.head.next = newEvent;
    } else {
      this.head = newEvent;
    }
  }

  pop() {
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
