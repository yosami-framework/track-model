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
   * @param {object} value
   * @return {string} message when has error. (nil when has no error.)
   */
  validate(value) {
    if (this._isNotNull(value)) {
      if (this.options.max && value.length > this.options.max) {
        return new Error('too_long', {count: this.options.max});
      }

      if (this.options.min && value.length < this.options.min) {
        return new Error('too_short', {count: this.options.min});
      }
    }
  }
}

module.exports = LengthValidator;
