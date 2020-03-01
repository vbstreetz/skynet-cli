const debug = require('debug')('skynet-cli:upload');
const { EventEmitter: Emitter } = require('events');
const Item = require('./upload-item');

module.exports = class extends Emitter {
  /**
   * Initialize a new Upload
   *
   * @api public
   */
  constructor() {
    super();
    this._items = [];
  }

  /**
   * Create a new item for uploading
   *
   *   var item = upload.item({ filename: 'avatar.jpeg' })
   *
   * @param {Object} [options]
   * @return {Item}
   * @api public
   */
  item(options) {
    const item = new Item(options);
    this._items.push(item);
    this.emit('item', item);
    return item;
  }

  /**
   * Save and invoke `fn(err)`
   *
   * Emits "error" events with `(err, item)` if an item
   * fails to properly save.
   *
   * @param {Function} [fn]
   * @api public
   */
  async save(fn) {
    this.emit('save');
    // todo: concurrency
    await Promise.all(this._items.map(item => item.save()));
    this.emit('end');
    debug('end');
    fn();
  }
};
