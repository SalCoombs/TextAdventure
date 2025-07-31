import Tile from "./tile.js";
import Entity from "./entity.js";

export default class WorldGenerator {
  constructor(world) {
    this.world = world;
  }

  setWorld(world) {
    this.world = world;
  }

  generateWorld() {
    const tiles = this.#initTiles();
    return tiles;
  }

  #initTiles() {
    // Cannot use this.tiles until #initTiles has finished running.
    let tiles = [];
    let [playerX, playerY] = this.#getRandomXY();
    for (let y = 0; y < this.world.height; y++) {
      for (let x = 0; x < this.world.width; x++) {
        const tile = new Tile();
        tile.addEntity(new Entity(tile, x, y));

        if (x == playerX || y == playerY) {
          tile.addEntity(this.world.player);
        }

        tiles[y * this.world.width + x] = tile;
      }
    }

    return tiles;
  }

  #getRandomXY() {
    const x = Math.floor(Math.random() * this.world.width);
    const y = Math.floor(Math.random() * this.world.height);
    return [x, y];
  }

  #spawnPlayer(tiles) {
    const randomTileResult = this.world.getRandomTile();
    const randomTile = randomTileResult[0];
    randomTile.addEntity(
      this.world.player,
      randomTileResult[1],
      randomTileResult[2]
    );
  }
}
