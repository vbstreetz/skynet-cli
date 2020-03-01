const debug = require('debug')('skynet-cli:upload-item');
const { EventEmitter: Emitter } = require('events');
const mime = require('mime');
const { uuid } = require('./utils');
const request = require('superagent');
const fs = require('fs');
const { basename } = require('path');

module.exports = class extends Emitter {
  constructor(options) {
    super();
    this._options = options;
  }

  /**
   * Queue `file` for uploading.
   *
   *    var stream = client.stream({ title: 'Animals' })
   *    var item = stream.item({ title: 'Simon' })
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
