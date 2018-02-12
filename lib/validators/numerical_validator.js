const Base  = require('./base');
const Error = require('./error');

/**
 * NumericalValidator
 * @example
 * column.validate('hoge', {numerical: {max: 50}}});
 * column.validate('hoge', {numerical: {min: 10}}});
 */
class NumericalValidator extends Base {
  /**
   * Validate value.
   * @override
   * @param {object}   value   Value.
   * @param {function} resolve Callback for success validation.
   * @param {function} reject  Callback for failed validation.
   */
  validate(value, resolve, reject) {
    if (this._isNotNull(value)) {
      if (typeof value !== 'number') {
        reject(new Error('not_a_number'));
        return;
      }

      if (this.options.max && value > this.options.max) {
        reject(new Error('less_than', {count: this.options.max}));
        return;
      }

      if (this.options.min && value < this.options.min) {
        reject(new Error('greater_than', {count: this.options.min}));
        return;
      }
    }
    resolve();
  }
}

module.exports = NumericalValidator;
