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
   * @param {object} value
   * @return {string} message when has error. (nil when has no error.)
   */
  validate(value) {
    if (this._isNotNull(value)) {
      if (!this.options.regex.test(value)) {
        return new Error('invalid');
      }
    }
  }
}

module.exports = FormatValidator;
