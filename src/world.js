import WorldGenerator from "./worldGenerator.js";
import WorldMovement from "./worldMovement.js";

export default class World {
  constructor(player, htmlController, width = 18, height = 18) {
    this.width = width;
    this.height = height;
    this.player = player;
    this.viewport = {
      width,
      height,
      X: 0,
      Y: 0,
    };
    this.htmlController = htmlController;
    this.tiles = WorldGenerator.generateTiles(width, height);
    WorldGenerator.spawnPlayer(this.tiles, width, height, player);
  }

  moveEntity(entity, x, y) {
    WorldMovement.moveEntity(this, entity, x, y);
  }

  moveAdjacentGen(direction, entity = this.player) {
    return WorldMovement.moveAdjacentGen(this, direction, entity);
  }

  render() {
    let renderText = "";
    for (
      let y = this.viewport.Y;
      y < this.viewport.Y + this.viewport.height;
      y++
    ) {
      for (
        let x = this.viewport.X;
        x < this.viewport.X + this.viewport.width;
        x++
      ) {
        renderText += this.getTileAt(x, y)?.getAscii() ?? " ";
      }
      if (y !== this.viewport.Y + this.viewport.height - 1) {
        renderText += "\n";
      }
    }
    this.htmlController.displayMap(renderText);
  }

  getTileAt(x, y) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      console.error(`Accessed out-of-bounds tile at (${x}, ${y}).`);
      return undefined;
    }
    const tile = this.tiles[y * this.width + x];
    if (!tile) {
      console.error(`Tile not found at (${x}, ${y})`);
    }
    return tile;
  }
}
