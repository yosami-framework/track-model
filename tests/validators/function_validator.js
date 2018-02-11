const t         = require('track-spec');
const Validator = require('../../lib/validators/function_validator.js');

t.describe('FunctionValidator', () => {
  let validator = null;
  let options   = null;

  t.beforeEach(() => {
    options = {validate: t.spy(() => 'mockReturningValue')};
    validator = new Validator(options);
  });

  t.describe('#validate', () => {
    const subject = ( () => validator.validate('mockValue'));

    t.it('Call validate function', () => {
      subject();
      t.expect(options.validate.callCount).equals(1);
      t.expect(options.validate.args[0]).equals('mockValue');
    });

    t.it('Return function value', () => {
      t.expect(subject()).equals('mockReturningValue');
    });
  });
});
