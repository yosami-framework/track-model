const t    = require('track-spec');
const Base = require('../../lib/validators/base.js');

t.describe('Base', () => {
  let validator = null;
  let options   = null;

  t.beforeEach(() => {
    options = {hoge: 'fuga'};
    validator = new Base(options);
  });

  t.describe('#options', () => {
    const subject = ( () => validator.options);

    t.it('Return options', () => {
      t.expect(subject()).equals(options);
    });
  });

  t.describe('#validate', () => {
    const subject = ( () => validator.validate('hoge'));

    t.it('Create validation', () => {
      let error = false;

      try {
        subject();
      } catch (e) {
        error = e;
      }

      t.expect(error.message).equals('Override #validate.');
    });
  });
});
