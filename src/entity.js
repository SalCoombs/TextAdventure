import { entitySymbols } from "./constants.js";

export default class Entity {
  constructor(tile, x, y, symbol = entitySymbols.BLANK, priority = 0) {
    this.tile = tile;
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.priority = priority;
  }
}
