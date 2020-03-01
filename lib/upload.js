const debug = require('debug')('skynet-cli:upload');
const { EventEmitter: Emitter } = require('events');
const Item = require('./upload-item');

module.exports = class extends Emitter {
  constructor() {
    super();

    this._items = [];
  }

  item(options) {
    if ('string' == typeof options) {
      options = { id: options };
    }
    options = options || {};
    options.stream = this;
    const item = new Item(options);
    this._items.push(item);
    this.emit('item', item);
    return item;
  }

  async save(fn) {
    this.emit('save');

    await Promise.all(this._items.map(item => item.save()));

    this.emit('end');
    debug('end');
    fn();
  }
};
