const TrackDSL           = require('track-dsl');
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
    this.definer = instance.constructor.definer;
    if (!this.definer) {
      throw new Error(`${instance.constructor.name}.definer is undefined.`);
    }

    this._defineDSL();
  }

  /**
   * Define DSL.
   */
  _defineDSL() {
    const attributeBuilder   = new AttributeBuilder(this._instance);
    const informationBuilder = new InformationBuilder(this._instance);
    const validationBuilder  = new ValidationBuilder(this._instance);

    this.dsl = new TrackDSL({
      'name':     {func: informationBuilder.name, binding: informationBuilder},
      'accessor': {func: attributeBuilder.accessor, binding: attributeBuilder},
      'reader':   {func: attributeBuilder.reader, binding: attributeBuilder},
      'writer':   {func: attributeBuilder.writer, binding: attributeBuilder},
      'validate': {func: validationBuilder.validate, binding: validationBuilder},
    });
  }

  /**
   * Build model from DSL.
   */
  _build() {
    this.dsl.evaluate(this.definer, this._instance);

    if (!this._instance.__modelName) {
      throw new Error('Model name is undefined. A definer must define `name("model_name")`.');
    }
  }

  /**
   * Build model from DSL.
   * @param {TrackViewModel} model Model.
   */
  static build(model) {
    (new Builder(model))._build();
  }
}

module.exports = Builder;
