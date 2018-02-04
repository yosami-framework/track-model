const t         = require('track-spec');
const Validator = require('../../lib/validators/format_validator.js');

t.describe('FormatValidator', () => {
  let validator = null;
  let options   = null;

  t.beforeEach(() => {
    options = {regex: /.+@.+/};
    validator = new Validator(options);
  });

  t.describe('#validate', () => {
    const subject = ( () => validator.validate(value));
    let value = null;

    t.context('When has no error.', () => {
      t.beforeEach(() => {
        value = 'hoge@hoge.com';
      });

      t.it('Return falsey', () => {
        t.expect(!!subject()).equals(false);
      });
    });

    t.context('When value is invalid', () => {
      t.beforeEach(() => {
        value = 'abcdefg';
      });

      t.it('Return error message', () => {
        t.expect(subject().type).equals('invalid');
      });
    });
  });
});
