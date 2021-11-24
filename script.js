document.addEventListener('DOMContentLoaded', () => {
    const DomElement = function(selector, styles) {
        this.selector = selector;
    
        styles = styles ?? {};
        this.height = styles.height;
        this.width = styles.width;
        this.bg = styles.bg;
        this.fontSize = styles.fontSize;
        this.position = styles.position;
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
        element.textContent = '';
    
        element.style.cssText = `width: ${this.width};
        height: ${this.height};
        background-color: ${this.bg};
        font-size: ${this.fontSize};
        position: ${this.position}`;
    
        document.body.append(element);
        
    };

    const box = new DomElement('.box', {bg: 'red', width: '100px', height: '100px', position: 'absolute'}).create();
    
    const move = (elem) => {
        const box = document.querySelector(elem);
        let left = 0;
        let top = 0;
        
        window.addEventListener('keydown', (event) => {
            if (event.keyCode === 37) {
                box.style.left = `${left -= 10}px`;
            } else if (event.keyCode === 38) {
                box.style.top = `${top -= 10}px`;
            } else if (event.keyCode === 39) {
                box.style.left = `${left += 10}px`;
            } else if (event.keyCode === 40) {
                box.style.top = `${top += 10}px`;
            }
        });
    };

    move('.box');
});