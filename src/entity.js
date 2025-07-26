export default class Entity {
  constructor(tile, x, y, symbol = " ", priority = 0) {
    this.tile = tile;
    this.x = x;
    this.y = y;
    this.symbol = symbol;
    this.priority = priority;
  }
}

export class Treasure extends Entity {
  constructor(tile, level) {
    super(tile, x, y, "o", 9);
    this.level = level;
  }
}
