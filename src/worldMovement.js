import { directions } from "./constants.js";

export default class WorldMovement {
  /**
   * Moves an entity to a new position if within bounds.
   * @param {World} world
   * @param {Entity} entity
   * @param {number} x
   * @param {number} y
   */
  static moveEntity(world, entity, x, y) {
    if (x < 0 || x >= world.width || y < 0 || y >= world.height) {
      world.htmlController.displayText("Cannot move out of bounds");
      return;
    }
    const oldTile = world.getTileAt(entity.x, entity.y);
    const newTile = world.getTileAt(x, y);

    entity.x = x;
    entity.y = y;

    oldTile.removeEntity(entity);
    newTile.addEntity(entity, x, y);
  }

  /**
   * Returns a function that moves the entity in the given direction.
   * @param {World} world
   * @param {string} direction
   * @param {Entity} entity
   * @returns {Function}
   */
  static moveAdjacentGen(world, direction, entity) {
    return () => {
      switch (direction) {
        case directions.UP:
          WorldMovement.moveEntity(world, entity, entity.x, entity.y - 1);
          break;
        case directions.DOWN:
          WorldMovement.moveEntity(world, entity, entity.x, entity.y + 1);
          break;
        case directions.LEFT:
          WorldMovement.moveEntity(world, entity, entity.x - 1, entity.y);
          break;
        case directions.RIGHT:
          WorldMovement.moveEntity(world, entity, entity.x + 1, entity.y);
          break;
        default:
          world.htmlController.displayText("Invalid direction");
      }
    };
  }
}
