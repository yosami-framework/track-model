const AsyncAttributeReader = require('../async_attribute_reader');

/**
 * Builder of attribute.
 * @example
 *   writer('hoge');   // Define `instance.piyo=`
 *   reader('fuga');   // Define `instance.piyo`
 *   accessor('piyo'); // Define `instance.piyo` and `instance.piyo=`
 *
 *   // with onchange callback.
 *   accessor('foo', {onchange: (() => alert('change'))});
 *   writer('foo', {onchange: (() => alert('change'))});
 *
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
   * @param {string} name    Name of accessor.
   * @param {object} options Options.
   */
  accessor(name, options = {onchange: null}) {
    Object.defineProperty(this._instance, name, {
      get: this._createGetter(name),
      set: this._createSetter(name, options),
    });
  }

  /**
   * Define attribute reader.
   * @param {string} name Name of reader.
   */
  reader(name) {
    Object.defineProperty(this._instance, name, {
      get: this._createGetter(name),
    });
  }

  /**
   * Define attribute writer.
   * @param {string} name    Name of writer.
   * @param {object} options Options.
   */
  writer(name, options = {onchange: null}) {
    Object.defineProperty(this._instance, name, {
      set: this._createSetter(name, options),
    });
  }

  /**
   * Define async attribute reader.
   * @param {string}   name    Name of writer.
   * @param {object}   options Options.
   * @param {function} block   Data getter block.
   */
  asyncReader(name, options = {default: null, expiresIn: null}, block) {
    const reader = new AsyncAttributeReader(options, block);
    this._instance[`_${name}`] = reader;

    Object.defineProperty(this._instance, name, {
      get: (function() {
        return reader.value;
      }),
    });
  }

  /**
   * Create setter.
   * @param {string} name Name of setter.
   * @param {object} options Options.
   * @return {function} setter.
   */
  _createSetter(name, options) {
    const onchange = options.onchange;

    return (function(newValue) {
      const oldValue = this[`_${name}`];
      if (oldValue !== newValue) {
        this[`_${name}`] = newValue;

        if (onchange) {
          onchange(newValue, oldValue);
        }
      }
    }).bind(this._instance);
  }

  /**
   * Create getter.
   * @param {string} name Name of getter.
   * @return {function} getter.
   */
  _createGetter(name) {
    return (function() {
      return this[`_${name}`];
    }).bind(this._instance);
  }
}

module.exports = AttributeBuilder;
