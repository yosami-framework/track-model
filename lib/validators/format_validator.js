const Base  = require('./base');
const Error = require('./error');

/**
 * FormatValidator
 * @example
 * column.validate('hoge', {format: {regex: /.+@.+/}}});
 */
class FormatValidator extends Base {
  /**
   * Validate value.
   * @override
   * @param {object}   value   Value.
   * @param {function} resolve Callback for success validation.
   * @param {function} reject  Callback for failed validation.
   */
  validate(value, resolve, reject) {
    if (this._isNotNull(value)) {
      if (!this.options.regex.test(value)) {
        reject(new Error('invalid'));
        return;
      }
    }
    resolve();
  }
}

module.exports = FormatValidator;
