
export default class Section {
    constructor({items, renderer}, containerSelector){
        this._renderItems = items;
        this._container = document.querySelector(containerSelector);
        this._renderer=renderer;
    }

    renderItems() {
        this._renderItems.forEach(item => {
            this._renderer(item);
        });

    }
    addItem(item) {
        this._container.append(item)
    }

    addItemStart(item) {
        this._container.prepend(item)
    }
}