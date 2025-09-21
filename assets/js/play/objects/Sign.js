import Thing from "./Thing";

export default class Sign extends Thing {
  constructor(data) {
    super(data);

    this.type = "sign";
    this.data = data;
    this.html = data.html;
    this.canCollide = false;

    this.setupAnimation();
    this.introduction.delay += 25
  }
  // setupAnimation() {
  //   this.y = this.originalY - 1000;

  //   this.introduction = {
  //     duration: 100, // seconds * FPS
  //     delay: this.data.x * 0.035,
  //     tick: 0,
  //     index: 0,
  //     isAnimating: false,
  //     isEnded: false
  //   }
  // }
}