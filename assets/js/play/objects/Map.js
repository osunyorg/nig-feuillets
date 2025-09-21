import Thing from "./Thing";
import { WORLD } from "../data/world";
import { game } from "js/play/MainGame";

export default class Map extends Thing {
  constructor() {
    super({
      width: WORLD.width,
      height: WORLD.height,
      src: WORLD.mapSrc
    })
    this.setCollision();
    this.drawElements();
    super.update();
  }
  setCollision() {
    this.collisionMap = [];
    WORLD.collisions.matrice.forEach((line) => {
      line.split('').forEach((cell, x) => {
        this.collisionMap.push(cell)
      })
    });
  }
  drawCollisionMap(){
    const size = WORLD.collisions.size;
    WORLD.collisions.matrice.forEach((line, y) => {
      line.split('').forEach((cell, x) => {
        this.drawSquare(x, y, size, cell)
      })
    });
  }
  drawSquare(x, y, size, active) {
    game.ctx.beginPath(); // RESET path here
    game.ctx.globalAlpha = 0.6;
    game.ctx.fillStyle = active == 1 ? "transparent" : "red";
    game.ctx.fillRect(x * size + game.camera.x, y * size + game.camera.y, size, size)
    game.ctx.globalAlpha = 1.0;
  }
  update() {
    // return;
    super.update();
    if (WORLD.collisions.visible){
      this.drawCollisionMap();
    }
  }
  drawElements() {
    this.elements = [];
    WORLD.elements.forEach(element => {
      this.elements.push(new Thing(element));
    });

    // this.elements.forEach(element => element.setupAnimation())
  }
}