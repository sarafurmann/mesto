export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(item) {
        this._container.prepend(item)
    }

    setItems(items) {
        this._items = items;
    }

    render() {
        this._items.forEach((item) => {
            this._container.append(
                this._renderer(item)
            )
        });
    }
}