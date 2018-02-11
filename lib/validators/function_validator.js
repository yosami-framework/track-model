const Base  = require('./base');

/**
 * FunctionValidator
 * @example
 * const checkHoge = function(value) {
 *   if (value != 'hoge') {
 *     return new Error('is not hoge');
 *   }
 * }
 * column.validate('hoge', {function: {validate: checkHoge}}});
 */
class FunctionValidator extends Base {
  /**
   * Validate value.
   * @override
   * @param {object} value
   * @return {string} message when has error. (nil when has no error.)
   */
  validate(value) {
    if (this._isNotNull(value)) {
      return this.options.validate(value);
    }
  }
}

module.exports = FunctionValidator;
