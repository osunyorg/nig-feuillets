import { WORLD } from "js/play/data/world";
import SpeakingThing from "./SpeakingThing";
import UI from "js/play/UI";
import { game } from "js/play/MainGame";

export default class City extends SpeakingThing {
  constructor(data) {
    data.scale = data.scale || WORLD.cities.scale;
    data.scale *= (1 / window.devicePixelRatio);

    super(data);

    this.type = "city";
    this.data = data;
    this.html = data.html;
    this.canCollide = true;
    this.isCollided = false;
    this.wasCollided = false;
    
    this.dialog.classList.add('game-dialog--action');
    this.dialog.addEventListener('click', () => this.openPopin());

    this.setImageFromDom();

    this.attach(this.data.id);
    
    // if (this.data.sign) {
    //   this.data.sign.x += this.data.x;
    //   this.data.sign.y += this.data.y;
    //   this.sign = new Sign({
    //     ...this.data.sign,
    //     src: `/assets/images/jouer/signs/${this.data.id}.png`
    //   });
    // }

    // this.setupAnimation();
  }

  manipulate (x, y) {
    this.x += x;
    this.y += y;

    console.log(this.data.id, this.x, this.y)
  }

  attach(id) {
    this.popin = UI.getPopin(id);
    if (this.popin) {
      this.popin.attach(this);
    }
  }

  setImageFromDom(id) {
    const image = document.querySelector(`#${this.data.id} img`);
    if (!image) {
      return;
    }

    if (image.complete) {
      this.setImage(image);
    } else {
      image.addEventListener('load', () => {
        this.setImage(image);
      });
    }
  }

  setImage(image) {
    this.src = image.currentSrc;
  }

  onLoaded() {
    this.hitbox.width = this.width * 0.8;
    this.hitbox.height = this.height * 0.8;
    this.hitbox.x = this.width * 0.1;
    this.hitbox.y = this.height * 0.2;
  }

  onCollide() {
    super.onCollide();
    if (!this.wasCollided) {
      
    }
  }

  startCollide() {
    UI.openPopin(this.data.id);
    document.getElementById('sound-city').play();
  }

  stopCollide() {
    this.popin.close();
  }

  change() {
      // this.x = this.data.transformation.x;
      // this.y = this.data.transformation.y;
      this.data.id = this.data.transformation.id
      this.attach(this.data.id);
      this.setImageFromDom();
      game.scene.hero.isWalkingToTarget = false;
  }

  update() {
    // game.ctx.globalAlpha = 0.5;
    super.update();
    // game.ctx.globalAlpha = 1;
  }
}