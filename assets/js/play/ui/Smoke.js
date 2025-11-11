const smoke = {
    element: document.getElementById('smoke'),
    position: {
        x: 0,
        y: 0,
    },
    duration: 900,
    animate (position, callback = () => {}) {
        this.position = position;
        this.show();
        setTimeout(() => {
            this.hide();
            callback();
        }, this.duration);
        
    },
    show () {
        this.element.style.display = 'block';
    },
    hide () {
        console.log('hide')
        this.element.style.display = 'none';
    },
    update (camera) {
        this.element.style.left = `${this.position.x + camera.x}px`;
        this.element.style.top = `${this.position.y + camera.y}px`;
    }
};

export default smoke