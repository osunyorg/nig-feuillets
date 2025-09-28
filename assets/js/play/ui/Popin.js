export class Popin {
  constructor(element) {
    this.element = element;
    this.isOffcanvas = this.element.classList.contains('popin--offcanvas');
    this.state = {
      opened: false,
      closing: false,
      opening: false
    };

    this.classes = {
      opened: "is-opened",
      bodyOpened: this.isOffcanvas ? "offcanvas-is-opened" : "popin-is-opened",
      bodyClosing: this.isOffcanvas ? "offcanvas-is-closing" : "popin-is-closing"
    };

    this.closingTimeout = null;
    this.bindButtons();
  }
  attach(city) {
    this.city = city;
  }
  bindButtons() {
    this.buttonClose = this.element.querySelector('.close'); 
    this.buttonChange = this.element.querySelector('.change-city-action');

    if (this.buttonClose) {
      this.buttonClose.addEventListener('click', this.close.bind(this));
    }

    if (this.buttonChange) {
      this.buttonChange.addEventListener('click', () => {
        this.city.change();
        this.close();
      });
    }
  }
  open() {
    if (this.state.opening || this.state.opened) return;
    this.state.opened = true;

    document.body.classList.remove(this.classes.bodyOpened);

    this.element.style.display = "flex";
    this.element.scrollTo(0, 0);

    setTimeout(() => {
      document.body.classList.remove(this.classes.bodyClosing);
      this.element.classList.add(this.classes.opened);
    }, 5);

    clearTimeout(this.closingTimeout);
    document.body.classList.add(this.classes.bodyOpened);
  }
  close() {
    if (this.state.closing || !this.state.opened) return;
    this.state.opened = false;

    this.element.classList.remove(this.classes.opened);
    document.body.classList.remove(this.classes.bodyOpened);
    document.body.classList.add(this.classes.bodyClosing);

    clearTimeout(this.closingTimeout);

    this.closingTimeout = setTimeout(() => {
      // if (!this.state.opened) return;
      this.element.style.display = "none";
      document.body.classList.remove(this.classes.bodyClosing);
    }, 400);

  }
}
