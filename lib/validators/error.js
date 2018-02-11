const I18n = require('track-i18n');

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
    this._options = options || {};
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

  /**
   * Get translated error message.
   * @return {string} Error message.
   */
  get t() {
    const key = `track_viewmodel.errors.${this._modelName}.${this._attributeName}.${this.type}`;
    if (I18n.locale[key]) {
      return I18n.t(key, this._options);
    } else {
      return I18n.t(key, `track_viewmodel.errors.${this.type}`);
    }
  }

  /**
   * Set error detail.
   * @param {string} modelName     Model name.
   * @param {string} attributeName Attribute name.
   */
  setDetail(modelName, attributeName) {
    this._attributeName = attributeName;
    this._modelName = modelName;

    this._options['attribute'] = I18n.t(`track_viewmodel.attributes.${modelName}.${attributeName}`);
  }
}

module.exports = Error;
