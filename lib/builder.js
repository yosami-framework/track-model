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
   * @param {TrackViewModel} model Model.
   */
  constructor(model) {
    this.definer = model.constructor.definer;
    if (!this.definer) {
      throw new Error(`${model.constructor.name}.definer is undefined.`);
    }

    this._defineDSL(model);
    this._defineDelegator();
  }

  /**
   * Define DSL.
   * @param {TrackViewModel} instance Instance of model.
   */
  _defineDSL(instance) {
    this._instance = instance;
    const attributeBuilder   = new AttributeBuilder(instance);
    const informationBuilder = new InformationBuilder(instance);
    const validationBuilder  = new ValidationBuilder(instance);

    this.dsl = {
      'name':     [informationBuilder, 'name'],
      'accessor': [attributeBuilder, 'accessor'],
      'reader':   [attributeBuilder, 'reader'],
      'writer':   [attributeBuilder, 'writer'],
      'validate': [validationBuilder, 'validate'],
    };
  }

  /**
   * Define delegator.
   */
  _defineDelegator() {
    Object.keys(this.dsl).forEach((key) => {
      const builder = this.dsl[key][0];
      const method  = this.dsl[key][1];
      this[`__${key}`] = builder[method].bind(builder);
    });
  }

  /**
   * Build model from DSL.
   */
  _build() {
    const builderScripts = [];

    for (const key in this.dsl) {
      if (this.dsl.hasOwnProperty(key)) {
        builderScripts.push(`const ${key} = this.__${key}.bind(this)`);
      }
    }

    builderScripts.push(
      this.definer.toString()
                  .replace(/^[^{]+{/, '')
                  .replace(/}[^}]*$/, '')
    );

    eval(builderScripts.join(';'));

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
