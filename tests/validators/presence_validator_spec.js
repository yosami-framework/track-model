const t         = require('track-spec');
const Validator = require('../../lib/validators/presence_validator.js');

t.describe('PresenceValidator', () => {
  let validator = null;

  t.beforeEach(() => {
    validator = new Validator(true);
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

    t.context('When value is 0', () => {
      t.beforeEach(() => {
        value = 0;
      });

      t.it('Call resolve', () => {
        subject();
        t.expect(resolve.callCount).equals(1);
        t.expect(reject.callCount).equals(0);
      });
    });

    t.context('When value is empty', () => {
      t.beforeEach(() => {
        value = '';
      });

      t.it('Call reject', () => {
        subject();
        t.expect(resolve.callCount).equals(0);
        t.expect(reject.callCount).equals(1);
        t.expect(reject.args[0].type).equals('blank');
      });
    });

    t.context('When value is undefined', () => {
      t.beforeEach(() => {
        value = undefined;
      });

      t.it('Call reject', () => {
        subject();
        t.expect(resolve.callCount).equals(0);
        t.expect(reject.callCount).equals(1);
        t.expect(reject.args[0].type).equals('blank');
      });
    });

    t.context('When value is null', () => {
      t.beforeEach(() => {
        value = null;
      });

      t.it('Call reject', () => {
        subject();
        t.expect(resolve.callCount).equals(0);
        t.expect(reject.callCount).equals(1);
        t.expect(reject.args[0].type).equals('blank');
      });
    });
  });
});
