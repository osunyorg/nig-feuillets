import { WORLD } from "js/play/data/world";
import Sprite from "./Sprite";

export default class Character extends Sprite {
  constructor(parameters) {
    super(parameters)
    this.speed = 10;
    this.type = "character";
    this.canCollide = true;
    this.collisions = {};
    this.collideTimeoutDuration = 5000;
    this.depthOffset = parameters.depthOffset || 0;
  }
  move(x, y) {
    const { matrice, size } = WORLD.collisions

    // if (this.type !== "hero") return;

    const mapx = Math.floor((x + this.width / 2) / size)
    const mapy = Math.floor((y + this.height * 0.75) / size)

    if (typeof matrice[mapy] == 'undefined') {
      return false;
    } else if (matrice[mapy].length < mapx) {
      return false;
    }

    if (matrice[mapy][mapx] == 1) {
      this.x = x;
      this.y = y;

    } else {
      return false;
    }

    return true;
  }
  onCollide(object) {
    this.canCollide = false;
    setTimeout(() => {
      this.canCollide = true;
    }, this.collideTimeoutDuration);
  }
}

