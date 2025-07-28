import Entity from "./entity.js";
import { entitySymbols } from "./constants.js";

export default class Player extends Entity {
  constructor() {
    super(null, null, null, entitySymbols.PLAYER, 10);
  }
}
