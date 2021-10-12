const DomElement = function(selector, styles) {
    this.selector = selector;

    styles = styles ?? {};
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
        
        default:
            element = document.createElement('div');
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
