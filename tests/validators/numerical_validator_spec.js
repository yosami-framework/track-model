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
    const subject = ( () => validator.validate(value, resolve, reject));
    let value   = null;
    let resolve = null;
    let reject  = null;

    t.beforeEach(() => {
      resolve = t.spy();
      reject = t.spy();
    });

    t.context('When has no error', () => {
      t.beforeEach(() => {
        value = 8;
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

    t.context('When value is not number', () => {
      t.beforeEach(() => {
        value = '123';
      });

      t.it('Call reject', () => {
        subject();
        t.expect(resolve.callCount).equals(0);
        t.expect(reject.callCount).equals(1);
        t.expect(reject.args[0].type).equals('not_a_number');
      });
    });

    t.context('When value is small', () => {
      t.beforeEach(() => {
        value = 4;
      });

      t.it('Call reject', () => {
        subject();
        t.expect(resolve.callCount).equals(0);
        t.expect(reject.callCount).equals(1);
        t.expect(reject.args[0].type).equals('greater_than');
        t.expect(reject.args[0].options.count).equals(5);
      });
    });

    t.context('When value is large', () => {
      t.beforeEach(() => {
        value = 11;
      });

      t.it('Call reject', () => {
        subject();
        t.expect(resolve.callCount).equals(0);
        t.expect(reject.callCount).equals(1);
        t.expect(reject.args[0].type).equals('less_than');
        t.expect(reject.args[0].options.count).equals(10);
      });
    });
  });
});
