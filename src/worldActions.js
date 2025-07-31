export default class WorldActions {
  static removeEntity(world, entity, x, y) {
    const tile = world.getTileAt(x, y);
    tile.removeEntity(entity);
  }
}
