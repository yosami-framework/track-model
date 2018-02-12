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
   * @param {object}   value   Value.
   * @param {function} resolve Callback for success validation.
   * @param {function} reject  Callback for failed validation.
   */
  validate(value, resolve, reject) {
    if (this._isNotNull(value)) {
      this.options.validate(value, resolve, reject);
    } else {
      resolve();
    }
  }
}

module.exports = FunctionValidator;
