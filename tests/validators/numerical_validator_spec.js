const t         = require('track-spec');
const Validator = require('../../lib/validators/numerical_validator.js');

t.describe('NumericalValidator', () => {
  let validator = null;
  let options   = null;

  t.beforeEach(() => {
    options = {min: 5, max: 10};
    validator = new Validator(options);
  });

  t.describe('#validate', () => {
    const subject = ( () => validator.validate(value));
    let value = null;

    t.context('When has no error', () => {
      t.beforeEach(() => {
        value = 8;
      });

      t.it('Return falsey', () => {
        t.expect(!!subject()).equals(false);
      });
    });

    t.context('When value is undefined', () => {
      t.beforeEach(() => {
        value = undefined;
      });

      t.it('Return falsey', () => {
        t.expect(!!subject()).equals(false);
      });
    });

    t.context('When value is not number', () => {
      t.beforeEach(() => {
        value = '123';
      });

      t.it('Return error message', () => {
        t.expect(subject().type).equals('not_a_number');
      });
    });

    t.context('When value is small', () => {
      t.beforeEach(() => {
        value = 4;
      });

      t.it('Return error message', () => {
        t.expect(subject().type).equals('greater_than');
        t.expect(subject().options.count).equals(5);
      });
    });

    t.context('When value is large', () => {
      t.beforeEach(() => {
        value = 11;
      });

      t.it('Return error message', () => {
        t.expect(subject().type).equals('less_than');
        t.expect(subject().options.count).equals(10);
      });
    });
  });
});
