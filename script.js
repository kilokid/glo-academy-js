// class DomElement {
//     constructor(selector, height, width, bg, fontSize) {
//         this.selector = selector;
//         this.height = height;
//         this.width = width;
//         this.bg = bg;
//         this.fontSize = fontSize;
//     }

//     createElem() {
//         if (this.selector.charAt(0) === '.') {
//             const div = document.createElement('div');
//             div.classList.add(this.selector.slice(1));
//             div.textContent = 'Hello, world!';
//             div.style.cssText = `width: ${this.width};
//                 height: ${this.height};
//                 background-color: ${this.bg};
//                 font-size: ${this.fontSize};`;
//             document.body.append(div);
//         } else if (this.selector.charAt(0) === '#') {
//             const p = document.createElement('p');
//             p.id = this.selector.slice(1);
//             p.textContent = 'Hello, world!';
//             p.style.cssText = `width: ${this.width};
//                 height: ${this.height};
//                 background-color: ${this.bg};
//                 font-size: ${this.fontSize};`;
//             document.body.append(p);
//         }
//     }
// }

// let elem1 = new DomElement('.test', '100px', '100px', 'lightblue', '34px').createElem();
// let elem2 = new DomElement('#test2', '50px', '50px', 'red', '14px').createElem();

const DomElement = function(selector, styles) {
    this.selector = selector;

    styles = styles || {};
    this.height = styles.height;
    this.width = styles.width;
    this.bg = styles.bg;
    this.fontSize = styles.fontSize;
};

DomElement.prototype.create = function() {
    let element;

    switch (this.selector[0]) {
        case '.':
            element = document.createElement('div');
            element.classList.add(this.selector.slice(1));
            break;

        case '#':
            element = document.createElement('p');
            element.id = this.selector.slice(1);
            break;
    }
    element.textContent = 'hello world';

    element.style.cssText = `width: ${this.width};
    height: ${this.height};
    background-color: ${this.bg};
    font-size: ${this.fontSize};`;

    document.body.append(element);
    
};

const elem1 = new DomElement('.lolwhat', {bg: 'red', width: '50px'}).create();
const elem2 = new DomElement('#wowtest', {width: '100px', height: '100px', fontSize: '42px', bg: 'yellow'}).create();
