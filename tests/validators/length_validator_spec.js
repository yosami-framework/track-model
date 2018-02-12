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
        value = 'abcdef';
      });

      t.it('Call resolve', () => {
        subject();
        t.expect(resolve.callCount).equals(1);
        t.expect(reject.callCount).equals(0);
      });
    });

    t.context('When value is undefined', () => {
      t.beforeEach(() => {
        value = undefined;
      });

      t.it('Call resolve', () => {
        subject();
        t.expect(resolve.callCount).equals(1);
        t.expect(reject.callCount).equals(0);
      });
    });

    t.context('When value is too short', () => {
      t.beforeEach(() => {
        value = 'abcd';
      });

      t.it('Call reject', () => {
        subject();
        t.expect(resolve.callCount).equals(0);
        t.expect(reject.callCount).equals(1);
        t.expect(reject.args[0].type).equals('too_short');
        t.expect(reject.args[0].options.count).equals(5);
      });
    });

    t.context('When value is too long', () => {
      t.beforeEach(() => {
        value = 'abcdefghijk';
      });

      t.it('Call reject', () => {
        subject();
        t.expect(resolve.callCount).equals(0);
        t.expect(reject.callCount).equals(1);
        t.expect(reject.args[0].type).equals('too_long');
        t.expect(reject.args[0].options.count).equals(10);
      });
    });
  });
});
