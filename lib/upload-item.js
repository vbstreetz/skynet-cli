const debug = require('debug')('skynet-cli:upload-item');
const { EventEmitter: Emitter } = require('events');
const mime = require('mime');
const { uuid } = require('./utils');
const request = require('superagent');
const fs = require('fs');
const { basename } = require('path');

module.exports = class extends Emitter {
  /**
   * Initialize a new Item with the given options:
   *
   *  - `title` optional Item title string
   *
   * @param {Object} options
   * @api public
   */
  constructor(options) {
    super();
    this._options = options;
  }

  /**
   * Queue `file` for uploading.
   *
   *    var item = upload.file({ filename: 'simon-2.jpeg' })
   *    item.file('path/to/simon.jpg')
   *
   * @param {String} file
   * @return {Item} self
   * @api public
   */
  file(file) {
    this._file = file;
    this._mime = mime.lookup(file);
    this._filename = this._options.filename || basename(this.filename || file);
    debug('queue file %s (%s)', file, this._mime);
    return this;
  }

  /**
   * Create the remote item
   * and upload the associated
   * content, invoking `fn(err)`.
   *
   * @param {Function} fn
   * @api public
   */
  async save() {
    const { _filename: filename } = this;
    const file = fs.createReadStream(this._file);
    const {
      body: { skylink },
    } = await request
      .post(`https://siasky.net/skynet/skyfile/${uuid()}?filename=${filename}`)
      .attach('file', file)
      .on('progress', event => {
        const percent = (event.loaded / event.total) * 100;
        this.emit('progress', { percent });
      });

    this.emit('end', `https://siasky.net/${skylink}`);
  }
};
