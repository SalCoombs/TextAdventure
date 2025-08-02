import Item from "./item.js";
import Entity from "./entity.js";
import { entitySymbols, itemNames } from "./constants.js";

export default class Player extends Entity {
  constructor(eventSystem) {
    super(null, null, null, entitySymbols.PLAYER, 10);
    this.eventSystem = eventSystem;
    this.inventory = {};

    this.eventSystem.on("dig", this.addItem);
  }

  addItem(item) {
    this.inventory[item.name] = item;
  }
}
