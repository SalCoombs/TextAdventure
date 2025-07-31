import Entity from "./entity.js";
import { entitySymbols } from "./constants.js";

export default class Player extends Entity {
  constructor(eventQueue) {
    super(null, null, null, entitySymbols.PLAYER, 10);
    this.eventQueue = eventQueue;
    this.inventory = {};
  }

  addItem(item) {
    inventory[item.name] = item;
  }

  dig() {}
}
