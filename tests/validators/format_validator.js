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
    const subject = ( () => validator.validate(value, resolve, reject));
    let value   = null;
    let resolve = null;
    let reject  = null;

    t.beforeEach(() => {
      resolve = t.spy();
      reject = t.spy();
    });

    t.context('When has no error.', () => {
      t.beforeEach(() => {
        value = 'hoge@hoge.com';
      });

      t.it('Call resolve', () => {
        subject();
        t.expect(resolve.callCount).equals(1);
        t.expect(reject.callCount).equals(0);
      });
    });

    t.context('When value is invalid', () => {
      t.beforeEach(() => {
        value = 'abcdefg';
      });

      t.it('Call reject', () => {
        subject();
        t.expect(resolve.callCount).equals(0);
        t.expect(reject.callCount).equals(1);
        t.expect(reject.args[0].type).equals('invalid');
      });
    });
  });
});
