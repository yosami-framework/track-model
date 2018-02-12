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
   * @param {object}   value   Value.
   * @param {function} resolve Callback for success validation.
   * @param {function} reject  Callback for failed validation.
   */
  validate(value, resolve, reject) {
    if (this.options && !this._isNotNull(value) || value === '') {
      reject(new Error('blank'));
    } else {
      resolve();
    }
  }
}

module.exports = PresenceValidator;
