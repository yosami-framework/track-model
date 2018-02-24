const AttributeHelper = require('./helpers/attribute_helper');
const Builder         = require('./builder');

/**
 * A base class.
 * @example
 *  class Hoge extends TrackModel {
 *    static definer() {
 *      name('hoge'); // Define name of model.
 *
 *      writer('hoge');   // Define `instance.piyo=`
 *      reader('fuga');   // Define `instance.piyo`
 *      accessor('piyo'); // Define `instance.piyo` and `instance.piyo=`
 *
 *      // Define accessor with onchange callback.
 *      accessor('foo', {onchange: (() => alert('change'))});
 *
 *      validate('hoge', {presence: true});
 *      validate('hoge', {presence: true, length: {max: 50}});
 *    }
 *  }
 *
 * const hoge = new Hoge({piyo: 'abc'});
 * hoge.validate('piyo'); // => Promise
 * hoge.piyo = null;
 *
 * hoge.validate('piyo').then(() => {
 *  // Be called when success.
 * }).catch(() => {
 *  // Be called when fail.
 *  hoge.errors['piyo']     // => Error instance.
 *  hoge.errors['piyo'].t() // => Error message.
 * });
 *
 * hoge.validateAll(); // => Promise
 */
class TrackModel {
  /**
   * Initialize
   * @param {object} attributes DefaultAttributes.
   */
  constructor(attributes) {
    Builder.build(this);
    this.setAttributes(attributes || {});
  }

  /**
   * Get validation errors.
   * @return {object} errors.
   */
  get errors() {
    if (!this._errors) {
      this._errors = {};
    }
    return this._errors;
  }

  /**
   * Set attributes.
   * @param {object} attributes Attributes.
   */
  setAttributes(attributes) {
    const setters = AttributeHelper.getSetters(this);
    for (let key in attributes) {
      if (attributes.hasOwnProperty(key) && setters.indexOf(key) != -1) {
        this[key] = attributes[key];
      }
    }
  }

  /**
   * Return key-value pair object. (hash)
   * @return {object} key-value pair object.
   */
  toObject() {
    const obj     = {};
    const getters = AttributeHelper.getGetters(this);
    for (let i = 0; i < getters.length; ++i) {
      const key = getters[i];
      if (!/^_/.test(key)) {
        obj[key] = this[key];
      }
    }
    delete obj['errors'];
    return obj;
  }

  /**
   * Validate.
   * @param {string} attr Attribute.
   * @return {Promise} Promise for validation.
   */
  validate(attr) {
    const value      = this[attr];
    const validation = this._validations[attr];

    return Promise.all(validation.validators.map(function(validator) {
      return new Promise(function(resolve, reject) {
        validator.validate(value, resolve, reject);
      });
    })).then(() => {
      this.errors[attr] = null;
    }).catch((error) => {
      error.setDetail(this.__modelName, attr);
      this.errors[attr] = error;
      throw error;
    });
  }

  /**
   * Validate all value.
   * @return {Promise} Promise for all validation.
   */
  validateAll() {
    return Promise.all(Object.keys(this._validations).map((attr) => {
      return this.validate(attr);
    }));
  }
}

module.exports = TrackModel;
