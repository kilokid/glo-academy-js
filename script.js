class DomElement {
    constructor(selector, height, width, bg, fontSize, position) {
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.position = position;
    }

    createElem() {
        if (this.selector.charAt(0) === '.') {
            const div = document.createElement('div');
            div.classList.add(this.selector.slice(1));
            div.textContent = 'Hello, world!';
            div.style.cssText = `width: ${this.width};
                height: ${this.height};
                background-color: ${this.bg};
                font-size: ${this.fontSize};
                position: ${this.position}`;
            document.body.append(div);
        } else if (this.selector.charAt(0) === '#') {
            const p = document.createElement('p');
            p.id = this.selector.slice(1);
            p.textContent = 'Hello, world!';
            p.style.cssText = `width: ${this.width};
                height: ${this.height};
                background-color: ${this.bg};
                font-size: ${this.fontSize};
                position: ${this.position}`;
            document.body.append(p);
        }
    }
}

const square = new DomElement('.square', '100px', '100px', 'yellow', '18px', 'absolute').createElem();