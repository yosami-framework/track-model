const Base  = require('./base');
const Error = require('./error');

/**
 * PresenceValidator
 * @example
 * column.validate('hoge', {presence: true});
 */
class PresenceValidator extends Base {
  /**
   * Validate value.
   * @override
   * @param {object} value
   * @return {string} message when has error. (nil when has no error.)
   */
  validate(value) {
    if (this.options && !this._isNotNull(value) || value === '') {
      return new Error('blank');
    }
  }
}

module.exports = PresenceValidator;
