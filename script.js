class DomElement {
    constructor(selector, height, width, bg, fontSize) {
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
    }

    createElem() {
        if (this.selector.charAt(0) === '.') {
            const div = document.createElement('div');
            div.classList.add(this.selector.slice(1));
            div.textContent = 'Hello, world!';
            div.style.cssText = `width: ${this.width};
                height: ${this.height};
                background-color: ${this.bg};
                font-size: ${this.fontSize};`;
            document.body.append(div);
        } else if (this.selector.charAt(0) === '#') {
            const p = document.createElement('p');
            p.id = this.selector.slice(1);
            p.textContent = 'Hello, world!';
            p.style.cssText = `width: ${this.width};
                height: ${this.height};
                background-color: ${this.bg};
                font-size: ${this.fontSize};`;
            document.body.append(p);
        }
    }
}

let elem1 = new DomElement('.test', '100px', '100px', 'lightblue', '34px').createElem();
let elem2 = new DomElement('#test2', '50px', '50px', 'red', '14px').createElem();