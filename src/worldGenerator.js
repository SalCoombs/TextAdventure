import Tile from "./tile.js";
import Entity from "./entity.js";

export default class WorldGenerator {
  /**
   * Generates a grid of tiles and places entities.
   * @param {number} width
   * @param {number} height
   * @returns {Tile[]}
   */
  static generateTiles(width, height) {
    const tiles = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const tile = new Tile();
        tile.addEntity(new Entity(tile, x, y));
        tiles[y * width + x] = tile;
      }
    }
    return tiles;
  }

  /**
   * Spawns the player at a random tile.
   * @param {Tile[]} tiles
   * @param {number} width
   * @param {number} height
   * @param {Entity} player
   */
  static spawnPlayer(tiles, width, height, player) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    const tile = tiles[y * width + x];
    tile.addEntity(player, x, y);
    player.x = x;
    player.y = y;
  }
}
