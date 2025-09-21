import { WORLD } from "../data/world";
import { game } from "js/play/MainGame";
import SpeakingThing from "./SpeakingThing";

export default class Sprite extends SpeakingThing {
  get animation () {
    return this.animations[this.currentAnimation]
  }
  constructor(parameters) {
    super(parameters)
    this.tick = 0;
    this.flipY = false;
    this.data = parameters.data;
    this.animations = parameters.animations;
    this.currentAnimation = null;
    this.depthOffset = parameters.depthOffset || 0;
  }
  setAnimation(animationName) {
    if (this.currentAnimation === animationName) return;

    this.tick = 0;
    this.currentAnimation = animationName;
  }
  update() {
    if (!this.currentAnimation || !this.ready) return;
  
    this.tick += 1 / (this.animation.framesPerTick || 8);
    const i = Math.round(this.tick) % this.animation.steps;

    game.drawImage(this.image, 
      this.srcWidth * i, 
      this.animation.y, 
      this.srcWidth, 
      this.srcHeight, 
      this.x, 
      this.y, 
      this.width, 
      this.height);

    if (WORLD.collisions.visible) {
      this.drawHitbox();
    }
  }
}