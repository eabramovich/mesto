export default class Section {
    constructor({ items, renderer}, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._container.prepend(element);
    }

    renderedItems() {
        this._renderedItems.forEach(this._renderer);
    }

}