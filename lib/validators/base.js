/**
 * Base of validators.
 */
class Base {
  /**
   * Initialize validator.
   * @param {object} options Validator options.
   */
  constructor(options) {
    this._options = options;
  }

  /**
   * Get options.
   * @return {object} Options.
   */
  get options() {
    return this._options;
  }

  /**
   * Validate value.
   * @param {object} value
   * @return {Error} error (falsey value when has no error.)
   */
  validate(value) {
    throw new Error('Override #validate.');
    return null;
  }

  /**
   * Check if value is not null or undefined..
   * @param {object} value Value.
   * @return {boolean} true if value is not null or undefined.
   */
  _isNotNull(value) {
    return value !== undefined && value !== null;
  }
}

module.exports = Base;
