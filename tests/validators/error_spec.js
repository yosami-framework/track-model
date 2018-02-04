const t     = require('track-spec');
const Error = require('../../lib/validators/error.js');

t.describe('Error', () => {
  let error   = null;
  let options = null;

  t.beforeEach(() => {
    options = {max: 1000};
    error = new Error('hoge', options);
  });

  t.describe('#type', () => {
    const subject = ( () => error.type);

    t.it('Return options', () => {
      t.expect(subject()).equals('hoge');
    });
  });

  t.describe('#options', () => {
    const subject = ( () => error.options);

    t.it('Return options', () => {
      t.expect(subject()).equals(options);
    });
  });
});
