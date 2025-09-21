import { TROLLS } from "js/play/data/trolls";
import Character from "./Character";
import { WORLD } from "js/play/data/world";

const ACTIONS = ["idle", "idle", "idle", "left", "right", "up", "down"];
export default class Troll extends Character {
  constructor(data) {
    super({
      x: data.x,
      y: data.y,
      width: 128 * WORLD.characters.scale,
      height: 150 * WORLD.characters.scale,
      srcWidth: 256,
      srcHeight: 300,
      src: data.sprite,
      animations: {
        idle: {
          steps: 8,
          y: 0
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
    this.type = "troll";
    this.changeActionChance = 0.05;
    this.speed = 2;
    this.action = "idle";
    this.voice = data.voice

    this.isSpeaking = false;
    this.slangs = window.trollDialogs;
    this.slang = "";
    this.slangMilliseconds = 5000;

    this.setAnimation("idle");
  }
  updateMovment() {
    let x = 0, y = 0;
    if (Math.random() < this.changeActionChance) {
      this.action = ACTIONS[Math.round(Math.random() * (ACTIONS.length-1))]
    }

    switch(this.action) {
      case "up":
        y = -1;
        break;
      case "right":
        x = 1;
        break;
      case "down":
        y = 1;
        break;
      case "left":
        x = -1;
        break;
    }

    if (x || y) {
      this.setAnimation(x > 0 ? "walk" : "reversedWalk");
      x = this.x + x * this.speed;
      y = this.y + y * this.speed;
      this.move(x, y);
    } else {
      this.setAnimation("idle");
    }
  }
  onCollide() {
    super.onCollide();
    this.pickRandomSlang();
    this.speak(this.slang, this.voice);
    setTimeout(() => this.stopSpeaking(), this.slangMilliseconds);
  }
  pickRandomSlang() {
    this.slang = this.slangs[Math.floor(Math.random() * this.slangs.length)];
  }
  update() {
    if (this.isSpeaking) {
      this.updateDialog();
      this.action = "idle";
    } else {
      this.updateMovment();
    }

    super.update();
  }
}