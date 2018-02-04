const ValidatorBase = require('../validators/base');

/**
 * Builder of validation.
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
   * validate('hoge', [
   *   {validator: 'Length', options: {max: 100}}, // Use build-in validator.
   *   {validator: HogeValidator },                // Use HogeValidator.
   *   {validator: validateHoge },                 // Use function.
   * ]);
   *
   * @param {string} attr        Name of attribute.
   * @param {array}  validations Definitions of validation.
   */
  validate(attr, validations) {
    const validators = [];

    for (let i = 0; i < validations.length; ++i) {
      const validation = validations[i];
      const validator  = validation.validator;
      const options    = validation.options;

      switch (true) {
      case (typeof validator === 'string'):
        validators.push(new (require(`../validators/${validator.toLowerCase()}_validator`))(options));
        break;
      case (validator.prototype instanceof ValidatorBase):
        const Validator = validator;
        validators.push(new Validator(options));
        break;
      case (validator instanceof Function):
        validators.push({validate: validator});
        break;
      default:
        throw new Error(`${validator} is invalid validator`);
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
