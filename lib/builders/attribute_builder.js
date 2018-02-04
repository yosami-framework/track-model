/**
 * Builder of attribute.
 */
class AttributeBuilder {
  /**
   * Initialize class
   * @param {object} instance Target instance.
   */
  constructor(instance) {
    this._instance = instance;
  }

  /**
   * Define attribute accessor.
   * @param {string} names Name of accessor.
   */
  accessor(...names) {
    for (let i = 0; i < names.length; ++i) {
      const name = names[i];
      Object.defineProperty(this._instance, name, {
        get: this._createGetter(name),
        set: this._createSetter(name),
      });
    }
  }

  /**
   * Define attribute reader.
   * @param {string} names Name of reader.
   */
  reader(...names) {
    for (let i = 0; i < names.length; ++i) {
      const name = names[i];
      Object.defineProperty(this._instance, name, {
        get: this._createGetter(name),
      });
    }
  }

  /**
   * Define attribute writer.
   * @param {string} names Name of writer.
   */
  writer(...names) {
    for (let i = 0; i < names.length; ++i) {
      const name = names[i];
      Object.defineProperty(this._instance, name, {
        set: this._createSetter(name),
      });
    }
  }

  /**
   * Create setter.
   * @param {string} name Name of setter.
   * @return {function} setter.
   */
  _createSetter(name) {
    return (function(value) {
      this[`_${name}`] = value;
    }).bind(this._instance);
  }

  /**
   * Create getter.
   * @param {string} name Name of getter.
   * @return {function} getter.
   */
  _createGetter(name) {
    return (function(value) {
      return this[`_${name}`];
    }).bind(this._instance);
  }
}

module.exports = AttributeBuilder;
