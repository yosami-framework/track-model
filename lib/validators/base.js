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
   * @param {object}   value   Value.
   * @param {function} resolve Callback for success validation.
   * @param {function} reject  Callback for failed validation.
   */
  validate(value, resolve, reject) {
    throw new Error('Override #validate.');
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
