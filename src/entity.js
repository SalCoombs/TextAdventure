import { entitySymbols } from "./constants";

export default class Entity {
  constructor(tile, x, y, symbol = entitySymbols.BLANK, priority = 0) {
    this.tile = tile;
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.priority = priority;
  }
}

export class Treasure extends Entity {
  constructor(tile, x, y, level) {
    super(tile, x, y, entitySymbols.TREASURE, 9);
    this.level = level;
  }
}
