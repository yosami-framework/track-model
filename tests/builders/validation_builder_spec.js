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
    const subject = ( () => builder.validate('hoge', validations));
    let validations = null;

    t.beforeEach(() => {
      validations = [{
        validator: 'Length',
        options:   {max: 100},
      }];
    });

    t.it('Create validation', () => {
      subject();

      const validation = mock._validations['hoge'];
      const validator  = validation.validators[0];
      t.expect(validator instanceof LengthValidator).equals(true);
      t.expect(validator.options.max).equals(100);
    });

    t.context('When options has ValidatorClass', () => {
      t.beforeEach(() => {
        validations = [{
          validator: LengthValidator,
          options:   {min: 50},
        }];
      });

      t.it('Create validation', () => {
        subject();

        const validation = mock._validations['hoge'];
        const validator  = validation.validators[0];
        t.expect(validator instanceof LengthValidator).equals(true);
        t.expect(validator.options.min).equals(50);
      });
    });

    t.context('When options has function', () => {
      let func = null;

      t.beforeEach(() => {
        func = t.spy();
        validations = [{
          validator: func,
        }];
      });

      t.it('Create validation', () => {
        subject();

        const validation = mock._validations['hoge'];
        const validator  = validation.validators[0];
        t.expect(validator.validate).equals(func);
      });
    });
  });
});
