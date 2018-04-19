require('../spec_helper');
const t                 = require('track-spec');
const ValidationBuilder = require('../../lib/builders/validation_builder.js');
const LengthValidator   = require('../../lib/validators/length_validator');

t.describe('ValidationBuilder', () => {
  let builder = null;
  let mock    = null;

  t.beforeEach(() => {
    mock = {};
    builder = new ValidationBuilder(mock);
  });

  t.describe('#validate', () => {
    const subject = (() => builder.validate('hoge', {length: {max: 100}}));

    t.it('Create validation', () => {
      subject();

      const validation = mock._validations['hoge'];
      const validator  = validation.validators[0];
      t.expect(validator instanceof LengthValidator).equals(true);
      t.expect(validator.options.max).equals(100);
    });
  });
});
