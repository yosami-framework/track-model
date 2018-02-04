const t         = require('track-spec');
const Validator = require('../../lib/validators/presence_validator.js');

t.describe('PresenceValidator', () => {
  let validator = null;

  t.beforeEach(() => {
    validator = new Validator();
  });

  t.describe('#validate', () => {
    const subject = ( () => validator.validate(value));
    let value = null;

    t.context('When value is 0', () => {
      t.beforeEach(() => {
        value = 0;
      });

      t.it('Return falsey', () => {
        t.expect(!!subject()).equals(false);
      });
    });

    t.context('When value is empty', () => {
      t.beforeEach(() => {
        value = '';
      });

      t.it('Return falsey', () => {
        t.expect(subject().type).equals('blank');
      });
    });

    t.context('When value is undefined', () => {
      t.beforeEach(() => {
        value = undefined;
      });

      t.it('Return falsey', () => {
        t.expect(subject().type).equals('blank');
      });
    });

    t.context('When value is null', () => {
      t.beforeEach(() => {
        value = null;
      });

      t.it('Return falsey', () => {
        t.expect(subject().type).equals('blank');
      });
    });
  });
});
