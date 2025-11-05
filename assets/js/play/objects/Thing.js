import { WORLD } from "../data/world";
import { game } from "js/play/MainGame";
import settings from "../data/settings";

export default class Thing {

  get projectedPosition () {
    return {
      x : this.x + game.camera.x,
      y : this.y + game.camera.y
    }
  }

  set src (source) {
    var updateSource = this.image ? true : false;

    this.image = new Image();
    this.image.addEventListener('load', () => {
      if (updateSource || (!this.srcWidth || !this.srcHeight)) {
        this.srcWidth = this.image.width;
        this.srcHeight = this.image.height;
      }

      if (updateSource || (!this.width && !this.height && this.scale)) {
        this.width = this.srcWidth * this.scale;
        this.height = this.srcHeight * this.scale;
      }
      this.ready = true
      this.onLoaded();
    });

    this.image.src = source.replace('.png', settings.extension);
  }

  constructor({x, y, width, height, srcWidth, srcHeight, hitbox = null, src = null, scale = 1, depthOffset = 0}) {
    this.x = x || 0;
    this.y = y || 0;
    this.originalY = this.y;
    this.width = width;
    this.height = height;
    this.srcWidth = srcWidth;
    this.srcHeight = srcHeight;
    this.hitbox = hitbox || { width, height, x: 0, y: 0 };
    this.ready = this.src ? true : false;
    this.depthOffset = depthOffset;
    this.scale = scale;

    // Collisions
    this.canCollide = true;
    this.collidedObject = null;
    this.isCollided = false;
    this.wasCollided = false;

    this.center = {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2
    }

    if (src) {
      this.src = src;
    }

  }

  collides(thing) {
    if (!this.canCollide || !thing.canCollide) return;
    return (this.x + this.hitbox.x + this.hitbox.width > thing.x + thing.hitbox.x && this.x + this.hitbox.x < thing.x + thing.hitbox.x + thing.hitbox.width && thing.y + thing.hitbox.x + thing.hitbox.height > this.y + this.hitbox.y && thing.y + thing.hitbox.y < this.y + this.hitbox.height + this.hitbox.y);
  }

  onCollide(object) {
    this.isCollided = true;
  }

  startCollide() {
  }

  stopCollide() {
    this.collidedObject = null;
  }

  onLoaded() {
  }

  update() {
    if (!this.ready) return;
    game.drawImage(this.image, 0, 0, this.srcWidth, this.srcHeight, this.x, this.y, this.width, this.height);

    if (this.isCollided && !this.wasCollided) {
      this.wasCollided = true;
      this.startCollide();
    } else if (!this.isCollided && this.wasCollided) {
      this.wasCollided = false;
      this.stopCollide();
    }
    this.isCollided = false;

    if (WORLD.collisions.visible) {
      this.drawHitbox();
    }

    if (this.introduction) {
      this.updateAnimation()
    }
  }

  drawHitbox() {
    game.ctx.beginPath();
    game.ctx.globalAlpha = 0.3;
    game.ctx.fillStyle = "blue";
    game.ctx.fillRect(this.x + this.hitbox.x + game.camera.x, this.y + this.hitbox.y + game.camera.y, this.hitbox.width, this.hitbox.height)
    game.ctx.globalAlpha = 1.0;
  }

  setupAnimation() {
    this.introduction = {};
    if (!WORLD.animateIntroduction) return;

    this.y = this.originalY - 1500;

    this.introduction = {
      duration: 100, // seconds * FPS
      delay: (this.originalY + this.x) * 0.025,
      tick: 0,
      index: 0,
      isAnimating: false,
      isEnded: false
    }
  }
  animate() {
    if (this.introduction.isEnded) return;

    this.introduction.isAnimating = true;

    if (this.y < this.originalY) {
      this.introduction.index += 1;
      this.y = Math.min(this.originalY, this.y + this.introduction.index);
    } else {
      this.introduction.isEnded = true;
    }
  }
  updateAnimation() {
    this.introduction.tick += 1;

    if (this.introduction.tick > this.introduction.delay) {
      this.animate();
    }
  }
}