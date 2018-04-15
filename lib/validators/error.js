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
    const keys = [
      `track_model.errors.${this._modelName}.${this._attributeName}.${this.type}`,
      `track_model.errors.${this._modelName}.${this.type}`,
      `track_model.errors.${this.type}`,
    ];

    return this._i18n.t(
      this._i18n.isExist(keys[0]) ? (
        keys[0]
      ) : (this._i18n.isExist(keys[1]) ? (
        keys[1]
      ) : (
        keys[2]
      )), this._options
    );
  }

  /**
   * Set error detail.
   * @param {string}    modelName     Model name.
   * @param {string}    attributeName Attribute name.
   * @param {TrackI18n} i18n          TrackI18n instance.
   */
  setDetail(modelName, attributeName, i18n) {
    this._attributeName = attributeName;
    this._modelName = modelName;
    this._i18n = i18n;

    this._options['attribute'] = i18n.t(`track_model.attributes.${modelName}.${attributeName}`);
  }
}

module.exports = Error;
