const t         = require('track-spec');
const Validator = require('../../lib/validators/length_validator.js');

t.describe('LengthValidator', () => {
  let validator = null;
  let options   = null;

  t.beforeEach(() => {
    options = {min: 5, max: 10};
    validator = new Validator(options);
  });

  t.describe('#validate', () => {
    const subject = ( () => validator.validate(value));
    let value = null;

    t.context('When has no error.', () => {
      t.beforeEach(() => {
        value = 'abcdef';
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

    t.context('When value is too short', () => {
      t.beforeEach(() => {
        value = 'abcd';
      });

      t.it('Return error message', () => {
        t.expect(subject().type).equals('too_short');
        t.expect(subject().options.count).equals(5);
      });
    });

    t.context('When value is too long', () => {
      t.beforeEach(() => {
        value = 'abcdefghijk';
      });

      t.it('Return error message', () => {
        t.expect(subject().type).equals('too_long');
        t.expect(subject().options.count).equals(10);
      });
    });
  });
});
