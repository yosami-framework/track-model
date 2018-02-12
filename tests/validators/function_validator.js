const t         = require('track-spec');
const Validator = require('../../lib/validators/function_validator.js');

t.describe('FunctionValidator', () => {
  let validator = null;
  let options   = null;

  t.beforeEach(() => {
    options = {validate: t.spy((value, resolve, reject) => null)};
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
      value = 'mockValue';
    });

    t.it('Call with value and resolve and reject', () => {
      subject();
      t.expect(options.validate.callCount).equals(1);
      t.expect(options.validate.args[0]).equals('mockValue');
      t.expect(options.validate.args[1]).equals(resolve);
      t.expect(options.validate.args[2]).equals(reject);
    });
  });
});
