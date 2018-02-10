const t     = require('track-spec');
const I18n  = require('track-i18n');
const Error = require('../../lib/validators/error.js');

t.describe('Error', () => {
  let error   = null;
  let options = null;

  t.beforeEach(() => {
    options = {max: 1000};
    error = new Error('piyo', options);

    I18n.load({
      track_viewmodel: {
        attributes: {
          hoge: {
            fuga: 'FUGA',
          },
        },
        errors: {
          hoge: {
            fuga: {
              piyo: '%{attribute} is not piyo',
            },
          },
        },
      },
    });
  });

  t.describe('#type', () => {
    const subject = ( () => error.type);

    t.it('Return options', () => {
      t.expect(subject()).equals('piyo');
    });
  });

  t.describe('#options', () => {
    const subject = ( () => error.options);

    t.it('Return options', () => {
      t.expect(subject()).equals(options);
    });
  });

  t.describe('#setDetail', () => {
    const subject = ( () => error.setDetail('hoge', 'fuga'));

    t.it('Set values', () => {
      subject();
      t.expect(error._modelName).equals('hoge');
      t.expect(error._attributeName).equals('fuga');
      t.expect(error._options.attribute).equals('FUGA');
    });
  });

  t.describe('#t', () => {
    const subject = (() => error.t);

    t.beforeEach(() => {
      error.setDetail('hoge', 'fuga');
    });

    t.it('Set values', () => {
      t.expect(subject()).equals('FUGA is not piyo');
    });
  });
});
