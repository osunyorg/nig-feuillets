import { Popin } from "./ui/Popin";

class UI {
  constructor() {
    this.popins = [];
  }
  setup() {
    document.querySelectorAll('.popin').forEach(element => {
      this.popins[element.id] = new Popin(element);
    });

    this.coinsContainer = document.querySelector('.coins');
    this.coinsPicked = 0;
    this.coinsTotal = document.querySelectorAll('.definitions .definition').length;
    this.update();
  }
  closeAllPopins(excepted) {
    for (let id in this.popins) {
      this.closePopin(id);
    }
  }
  getPopin(id) {
    return this.popins[id];
  }
  openPopin(id) {
    this.closeAllPopins(id);
    this.popins[id].open();
    return this.popins[id];
  }
  closePopin(id) {
    this.popins[id].close();
  }
  collectCoin(id) {
    this.coinsPicked += 1;
    document.getElementById('sound-coin').play();
    this.closePopin(id)
    this.update();
    if (this.coinsTotal === this.coinsPicked) {
      const url = window.trollImages[Math.floor(Math.random() * window.trollImages.length)];
      document.getElementById('gift-url').href = url;
      this.openPopin('game-end');
    }
  }
  update() {
    document.querySelector('.coins__picked').innerHTML = this.coinsPicked;
    document.querySelector('.coins__total').innerHTML = this.coinsTotal;
  }
}

export default new UI();