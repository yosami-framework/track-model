const Base  = require('./base');
const Error = require('./error');

/**
 * PresenceValidator
 * @example
 * column.validate('hoge', {validator: 'Presence'});
 */
class PresenceValidator extends Base {
  /**
   * Validate value.
   * @override
   * @param {object} value
   * @return {string} message when has error. (nil when has no error.)
   */
  validate(value) {
    if (value === undefined || value === null || value === '') {
      return new Error('blank');
    }
  }
}

module.exports = PresenceValidator;
