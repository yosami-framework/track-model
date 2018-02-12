const Base  = require('./base');
const Error = require('./error');

/**
 * LengthValidator
 * @example
 * column.validate('hoge', {length: {max: 50}}});
 * column.validate('hoge', {length: {min: 10}}});
 */
class LengthValidator extends Base {
  /**
   * Validate value.
   * @override
   * @param {object}   value   Value.
   * @param {function} resolve Callback for success validation.
   * @param {function} reject  Callback for failed validation.
   */
  validate(value, resolve, reject) {
    if (this._isNotNull(value)) {
      if (this.options.max && value.length > this.options.max) {
        reject(new Error('too_long', {count: this.options.max}));
        return;
      }

      if (this.options.min && value.length < this.options.min) {
        reject(new Error('too_short', {count: this.options.min}));
        return;
      }
    }
    resolve();
  }
}

module.exports = LengthValidator;
