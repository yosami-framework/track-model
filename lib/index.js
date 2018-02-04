const AttributeBuilder  = require('./builders/attribute_builder');
const ValidationBuilder = require('./builders/validation_builder');
const AttributeHelper   = require('./helpers/attribute_helper');

/**
 * A base class.
 * @example
 *  class Hoge extends TrackViewModel {
 *    attributes(attr) {
 *      attr.writer('hoge');   # Define `instance.piyo=`
 *      attr.reader('fuga');   # Define `instance.piyo`
 *      attr.accessor('piyo'); # Define `instance.piyo` and `instance.piyo=`
 *    }
 *
 *    validations(column) {
 *      column.validate('hoge', [{validator: 'Presence'}]);
 *      column.validate('piyo', [
 *        {validator: 'Presence'},
 *        {validator: 'Length', options: {max: 50}},
 *      ]);
 *    }
 *  }
 *
 * const hoge = new Hoge({piyo: 'abc'});
 * hoge.validate('piyo'); // => truthy
 * hoge.piyo = null;
 * hoge.validate('piyo'); // => falsey
 * hoge.errors['piyo']    // => instance of Error.
 *
 */
class TrackViewModel {
  /**
   * Initialize
   * @param {object} attributes DefaultAttributes.
   */
  constructor(attributes) {
    if (this.attributes) {
      this.attributes(new AttributeBuilder(this));
    }

    if (this.validations) {
      this.validations(new ValidationBuilder(this));
    }

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
      obj[getters[i]] = this[getters[i]];
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
        this.errors[attr] = error;
        return false;
      }
    }

    this.errors[attr] = null;
    return true;
  }
}

module.exports = TrackViewModel;
