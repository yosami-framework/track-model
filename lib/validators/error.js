/**
 * Error of validation.
 */
class Error {
  /**
   * Initialize error.
   * @param {string} type    Type of error.
   * @param {object} options Error options.
   */
  constructor(type, options) {
    this._type = type;
    this._options = options;
  }

  /**
   * Get type.
   * @return {string} type.
   */
  get type() {
    return this._type;
  }

  /**
   * Get options.
   * @return {object} options.
   */
  get options() {
    return this._options;
  }
}

module.exports = Error;
