const AttributeBuilder   = require('./builders/attribute_builder');
const InformationBuilder = require('./builders/information_builder');
const ValidationBuilder  = require('./builders/validation_builder');

/**
 * Model Builder.
 */
class Builder {
  /**
   * Inititlize builder.
   * @note This method is only used internally by Builder.
   * @param {TrackViewModel} instance Model instance.
   */
  constructor(instance) {
    this._instance = instance;
  }

  /**
   * Get DSL
   * @private
   * @return {object} DSL.
   */
  get _dsl() {
    const attributeBuilder   = new AttributeBuilder(this._instance);
    const informationBuilder = new InformationBuilder(this._instance);
    const validationBuilder  = new ValidationBuilder(this._instance);

    return {
      'name':      {func: informationBuilder.name, binding: informationBuilder},
      'accessor':  {func: attributeBuilder.accessor, binding: attributeBuilder},
      'reader':    {func: attributeBuilder.reader, binding: attributeBuilder},
      'writer':    {func: attributeBuilder.writer, binding: attributeBuilder},
      'validates': {func: validationBuilder.validate, binding: validationBuilder},
    };
  }

  /**
   * Get DSL
   * @param {TrackModel} model Model instance.
   * @return {object} DSL.
   */
  static dsl(model) {
    return (new Builder(model))._dsl;
  }
}

module.exports = Builder;
