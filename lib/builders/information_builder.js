/**
 * Builder of model information.
 * @example
 *   name('hoge'); // Define name of model.
 *
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
    Object.defineProperty(this._instance, '__name', {
      get: function() {
        return name;
      },
    });
  }
}

module.exports = InformationBuilder;
