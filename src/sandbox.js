// const regex = /^(\w+)(?:\s+(.+))?$/;
// const inputString = "very nice";

// const match = inputString.match(regex);
// match.

// const array = [1, 2, 3, 4, 5];

// const result = array.reduce((accum, current) => {
//   return accum + current;
// }, 0);
// console.log(result);

class eventSystem {
  constructor() {
    listeners = {};
  }

  on(type, callback, isPersistant = false) {
    this.listeners[type] ??= [];
    this.listeners[type].push();
  }
}

class GameEvent {
  constructor(callback, isPersistant) {
    this.callback = callback;
  }
}
