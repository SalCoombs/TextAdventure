import { listenerPostActions } from "./constants.js";

export default class EventSystem {
  constructor() {
    this.listeners = {};
  }

  on(event, callback, postAction = listenerPostActions.DEFAULT) {
    this.listeners[event] ??= [];
    this.listeners[event].push(new GameEvent(callback, postAction));
  }

  emit(event, data) {
    for (const gameEvent of this.listeners[event] ?? []) {
      gameEvent.callback(data);
      if (gameEvent.postAction == listenerPostActions.DEFAULT) {
        this.removeEvent(event, gameEvent);
      }
    }
  }

  removeEvent(event, gameEvent) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(
      (val) => val !== gameEvent
    );
  }
}

export class GameEvent {
  constructor(callback, postAction) {
    this.callback = callback;
    this.postAction = postAction;
  }
}
