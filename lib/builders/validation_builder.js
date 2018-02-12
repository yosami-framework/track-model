/**
 * Builder of validation.
 * @example
 *   validate('hoge', {presence: true});
 *   validate('hoge', {presence: true, length: {max: 50}});
 */
class ValidationBuilder {
  /**
   * Initialize class
   * @param {object} instance Target instance.
   */
  constructor(instance) {
    this._instance = instance;
    this._instance._validations = {};
  }

  /**
   * Define attribute validator.
   * @example
   * validate('hoge', {presence: true});
   * validate('hoge', {presence: true, length: {max: 100}});
   *
   * @param {string} attr        Name of attribute.
   * @param {object} validations Definitions of validation.
   */
  validate(attr, validations) {
    const validators = [];

    for (const key in validations) {
      if (validations.hasOwnProperty(key)) {
        validators.push(new (require(`../validators/${key}_validator`))(validations[key]));
      }
    }

    this._addValidation(attr, validators);
  }

  /**
   * Add validation to model.
   *
   * @param {string} attr       Name of attribute.
   * @param {array}  validators Instances of validator.
   */
  _addValidation(attr, validators) {
    if (!this._instance._validations[attr]) {
      this._instance._validations[attr] = {
        validators: [],
      };
    }

    this._instance._validations[attr].validators = (
      this._instance._validations[attr].validators.concat(validators)
    );
  }
}

module.exports = ValidationBuilder;
