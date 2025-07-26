import Entity from "./entity.js";
import { Treasure } from "./entity.js";
import Tile from "./tile.js";

export default class World {
  static TREASURE_DISTRIBUTION = 0.05;
  static moveEntity(entity, x, y) {
    const tile = getTileAt(entity.x, entity.y);
    const newTile = getTileAt(x, y);

    tile.removeEntity(entity);
    newTile = getTileAt(x, y);
  }

  constructor(width, height, player, htmlController) {
    this.width = width;
    this.height = height;
    this.player = player;
    this.viewport = {
      width: 18,
      height: 18,
      X: 0,
      Y: 0,
    };
    this.htmlController = htmlController;
    this.tiles = this.#initTiles(); // Is an array
    this.#generateWorld();
  }

  render() {
    let renderText = ``;
    for (let y = this.viewport.Y; y < this.viewport.height; y++) {
      for (let x = this.viewport.X; x < this.viewport.width; x++) {
        renderText += this.#getSymbolAtXY(x, y);
      }
      if (y != this.viewport.height - 1) {
        renderText += "\n";
      }
    }
    this.htmlController.displayMap(renderText);
  }

  getTileAt(x, y) {
    if (x < 0 || x >= this.width) {
      console.error("Accessed X outside world.");
      return;
    }

    if (y < 0 || y >= this.height) {
      console.error("Accessed Y outside world.");
      return;
    }

    const tile = this.tiles[y * this.width + x];
    if (!tile) {
      console.error(`Tile not found at ${x}, ${y}`);
      return;
    }

    return tile;
  }

  #generateWorld() {
    this.#spawnPlayer();
    this.#spawnTreasure();
  }

  #spawnTreasure() {
    for (const tile of this.tiles) {
      const shouldHaveTreasure = Math.random();
      if (shouldHaveTreasure > this.TREASURE_DISTRIBUTION) {
        const level = Math.floor(Math.random() * 3) + 1;
        tile.addEntity(new Treasure(tile, level));
      }
    }
  }

  #spawnPlayer() {
    const randomTileResult = this.#getRandomTile();
    const randomTile = randomTileResult[0];
    randomTile.addEntity(this.player, randomTileResult[1], randomTileResult[2]);
  }

  #getSymbolAtXY(x, y) {
    const tile = this.getTileAt(x, y);
    return tile.getAscii();
  }

  #initTiles() {
    // Cannot use this.tiles until #initTiles has finished running.
    let tiles = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const tile = new Tile();
        tile.addEntity(new Entity(tile, x, y));
        tiles[y * this.width + x] = tile;
      }
    }

    return tiles;
  }

  #getRandomTile() {
    const x = Math.floor(Math.random() * this.width);
    const y = Math.floor(Math.random() * this.height);
    const tile = this.getTileAt(x, y);
    return [tile, x, y];
  }
}
