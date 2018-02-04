const Base  = require('./base');
const Error = require('./error');

/**
 * NumericalValidator
 * @example
 * column.validate('hoge', {validator: 'Numerical', options: {max: 50}});
 * column.validate('fuga', {validator: 'Numerical', options: {min: 10}});
 */
class NumericalValidator extends Base {
  /**
   * Validate value.
   * @override
   * @param {object} value
   * @return {string} message when has error. (nil when has no error.)
   */
  validate(value) {
    if (value !== undefined && value !== null) {
      if (typeof value !== 'number') {
        return new Error('not_a_number');
      }

      if (this.options.max && value > this.options.max) {
        return new Error('less_than', {count: this.options.max});
      }

      if (this.options.min && value < this.options.min) {
        return new Error('greater_than', {count: this.options.min});
      }
    }
  }
}

module.exports = NumericalValidator;
