const Base  = require('./base');
const Error = require('./error');

/**
 * PresenceValidator
 * @example
 * column.validate('email', {validator: 'Format', options: {regex: /.+@.+/}});
 */
class FormatValidator extends Base {
  /**
   * Validate value.
   * @override
   * @param {object} value
   * @return {string} message when has error. (nil when has no error.)
   */
  validate(value) {
    if (value !== undefined && value !== null) {
      if (!this.options.regex.test(value)) {
        return new Error('invalid');
      }
    }
  }
}

module.exports = FormatValidator;
