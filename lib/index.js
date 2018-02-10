const AttributeHelper   = require('./helpers/attribute_helper');
const Builder           = require('./builder');

/**
 * A base class.
 * @example
 *  class Hoge extends TrackViewModel {
 *    static definer() {
 *      name('hoge'); # Define name of model.
 *
 *      writer('hoge');   # Define `instance.piyo=`
 *      reader('fuga');   # Define `instance.piyo`
 *      accessor('piyo'); # Define `instance.piyo` and `instance.piyo=`
 *
 *      validate('hoge', [{validator: 'Presence'}]);
 *      validate('piyo', [
 *        {validator: 'Presence'},
 *        {validator: 'Length', options: {max: 50}},
 *      ]);
 *    }
 *  }
 *
 * const hoge = new Hoge({piyo: 'abc'});
 * hoge.validate('piyo'); // => truthy
 * hoge.piyo = null;
 * hoge.validate('piyo');  // => falsey
 * hoge.errors['piyo']     // => instance of Error.
 * hoge.errors['piyo'].t() // => Message of error.
 *
 */
class TrackViewModel {
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
   * @return {boolean} false when invalid.
   */
  validate(attr) {
    const value      = this[attr];
    const validation = this._validations[attr];

    for (let i = 0; i < validation.validators.length; ++i) {
      const error = validation.validators[i].validate(value);
      if (!!error) {
        error.setDetail(this.__modelName, attr);
        this.errors[attr] = error;
        return false;
      }
    }

    this.errors[attr] = null;
    return true;
  }
}

module.exports = TrackViewModel;
