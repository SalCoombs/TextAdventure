export default class Tile {
  constructor(...entities) {
    this.entities = entities;
  }

  addEntity(entity, x = entity.x, y = entity.y) {
    entity.x = x;
    entity.y = y;
    this.entities.push(entity);
  }

  removeEntity(entity) {
    this.entities = this.entities.filter(
      (list_entity) => list_entity !== entity
    );
  }

  getAscii() {
    if (this.entities.length === 0) {
      return " ";
    }

    return this.#getTop().symbol;
  }

  #getTop() {
    const maxPrority = Math.max(...this.entities.map((e) => e.priority));
    const maxEntities = this.entities.filter((e) => {
      return e.priority >= maxPrority;
    });
    return maxEntities[0];
  }
}
