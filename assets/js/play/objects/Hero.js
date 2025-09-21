import Controls from "js/play/Controls";
import Character from "./Character"
import { WORLD } from "js/play/data/world";
import 'js/play/utils/lerp';
export default class Hero extends Character {
  constructor({x = 0, y = 0}) {
    const width = 128 * WORLD.characters.scale,
      height = 150 * WORLD.characters.scale;
    super({
      x,
      y,
      width: width,
      height: height,
      srcWidth: 256,
      srcHeight: 300,
      src: '/assets/images/jouer/characters/alice.png',
      hitbox: {
        x: width * 0.25,
        y: height * 0.4,
        width: width * 0.5,
        height: height * 0.5,
      },
      animations: {
        idle: {
          steps: 8,
          y: 0,
          framesPerTick: 18
        },
        walk: {
          steps: 8,
          y: 300
        },
        reversedWalk: {
          steps: 8,
          y: 600
        }
      }
    });
    this.type = "hero";
    this.speed = 5;
    this.controls = new Controls();
    this.direction = 1;
    this.collideTimeoutDuration = 1;
    this.isWalking = false;
    this.isWalkingToTarget = false;
    this.audio1 = document.getElementById('sound-step-l');
    this.audio2 = document.getElementById('sound-step-r');
    this.currentAudio = this.audio1;
    this.positionTarget = {
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
      progression: 0,
      speed: 0,
      distance: 0
    }

    this.setAnimation("idle");
  }
  listenControls() {
    let x = 0, y = 0;
    if (this.controls.actions.left) {
      x = -1
      this.flipY = true;
    } else if (this.controls.actions.right) {
      x = 1
      this.flipY = false;
    }
    if (this.controls.actions.up) {
      y = -1
    } else if (this.controls.actions.down) {
      y = 1
    }
    if (x || y) {
      this.isWalkingToTarget = false;
      this.setAnimation(x > 0 ? "walk" : "reversedWalk");
      x = this.x + x * this.speed;
      y = this.y + y * this.speed;
      this.isWalking = true;
      this.move(x, y);
    } else if (!this.isWalkingToTarget) {
      this.setAnimation("idle");
      this.isWalking = false;
    }
  }
  goTo(x, y) {
    x -= this.width/2;
    y -= (this.height - 30);

    this.positionTarget.startX = this.x;
    this.positionTarget.startY = this.y;
    this.positionTarget.x = x;
    this.positionTarget.y = y;
    this.positionTarget.progression = 0;
    this.positionTarget.distance = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
    this.isWalkingToTarget = true;
    this.isWalking = true;
  }
  walkToTarget() {
    let {x, y, startX, startY, distance } = this.positionTarget;
    this.positionTarget.progression += (1/distance * this.speed);

    if (this.positionTarget.progression >= 1) {
      this.isWalkingToTarget = false;
      this.isWalking = false;
      this.setAnimation("idle");
      return;
    }

    const forward = this.move(
      Math.lerp(startX, x, this.positionTarget.progression),
      Math.lerp(startY, y, this.positionTarget.progression)
    )
    this.setAnimation(startX < x ? "walk" : "reversedWalk");

    if (!forward) {
      this.isWalkingToTarget = false;
      this.isWalking = false;
    }
  }
  makeSound() {
    if (this.audio1.paused) {
      if (this.currentAudio == this.audio1) {
        this.currentAudio = this.audio2;
    } else {
        this.currentAudio = this.audio1;
      }
      this.currentAudio.play();
    }
  }
  update() {
    this.listenControls();

    if (this.isWalkingToTarget) {
      this.walkToTarget();
    }

    if (this.isWalking) {
      this.makeSound();
    }

    super.update();
  }
}