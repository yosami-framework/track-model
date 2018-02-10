/**
 * Builder of model information.
 */
class InformationBuilder {
  /**
   * Initialize class
   * @param {object} instance Target instance.
   */
  constructor(instance) {
    this._instance = instance;
  }

  /**
   * Define model name.
   * @param {string} name Model name.
   */
  name(name) {
    Object.defineProperty(this._instance, '__modelName', {
      get: function() {
        return name;
      },
    });
  }
}

module.exports = InformationBuilder;
