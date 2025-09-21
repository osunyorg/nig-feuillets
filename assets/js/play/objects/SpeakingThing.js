import { game } from "js/play/MainGame";
import Thing from "./Thing";

export default class SpeakingThing extends Thing {
  constructor(parameters) {
    super(parameters)
    this.isSpeaking = false;
    this.setDialog();
  }
  setDialog() {
    this.dialog = document.createElement('div');
    this.dialog.classList.add('game-dialog');
    game.container.append(this.dialog);
  }
  speak(html, voice) {
    if (this.isSpeaking) return false;
    this.dialog.innerHTML = html;
    this.dialog.style.display = "block";
    this.isSpeaking = true;
    this.updateDialog();
    document.getElementById(voice).play();
  }
  stopSpeaking() {
    this.dialog.style.display = "none";
    this.isSpeaking = false;
  }
  updateDialog() {
    this.dialog.style.left = this.projectedPosition.x + this.width / 2 + "px";
    this.dialog.style.top = this.projectedPosition.y + "px";
  }
}