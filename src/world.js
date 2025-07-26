import Entity from "./entity.js";
import Tile from "./tile.js";
import { Treasure } from "./entity.js";

export default class World {
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
    this.TREASURE_DISTRIBUTION = 0.1;
    this.htmlController = htmlController;
    this.tiles = this.#initTiles();
    this.#generateWorld();
  }

  moveEntity(entity, x, y) {
    if (y < 0 || y >= this.height || x < 0 || x >= this.width) {
      this.htmlController.displayText("Can not move out of bounds");
      return;
    }
    const tile = this.getTileAt(entity.x, entity.y);
    const newTile = this.getTileAt(x, y);

    entity.x = x;
    entity.y = y;

    tile.removeEntity(entity);
    newTile.addEntity(entity, x, y);
  }

  moveAdjacentGen(entity = this.player, direction) {
    function moveAdjacent() {
      switch (direction) {
        case "up":
          this.moveEntity(entity, entity.x, entity.y - 1);
          break;
        case "down":
          this.moveEntity(entity, entity.x, entity.y + 1);
          break;
        case "left":
          this.moveEntity(entity, entity.x - 1, entity.y);
          break;
        case "right":
          this.moveEntity(entity, entity.x + 1, entity.y);
          break;
      }
    }
    return moveAdjacent.bind(this);
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

  #generateWorld() {
    this.#spawnPlayer();
    this.#spawnTreasure();
  }

  #spawnTreasure() {
    for (let i = 0; i < this.tiles.length; i++) {
      const shouldHaveTreasure = Math.random();
      const curTile = this.tiles[i];
      const tileX = i % this.width;
      const tileY = i / this.width;

      if (shouldHaveTreasure < this.TREASURE_DISTRIBUTION) {
        const level = Math.floor(Math.random() * 3) + 1;
        curTile.addEntity(new Treasure(curTile, tileX, tileY, level));
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

  #getRandomTile() {
    const x = Math.floor(Math.random() * this.width);
    const y = Math.floor(Math.random() * this.height);
    const tile = this.getTileAt(x, y);
    return [tile, x, y];
  }
}
