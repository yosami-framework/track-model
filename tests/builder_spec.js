require('./spec_helper');
const t               = require('track-spec');
const LengthValidator = require('../lib/validators/length_validator');
const TrackModel      = require('../lib/index.js');

t.describe('Builder', () => {
  let mock = null;

  t.beforeEach(() => {
    mock = new (class extends TrackModel {
      /**
       * Definitions of model.
       */
      static definer() {
        name('mock_model');

        accessor('hoge');
        reader('fuga');
        writer('piyo');

        validates('hoge', {length: {max: 10}});
      }
    })();
  });

  t.describe('#name', () => {
    t.it('Defined name reader', () => {
      t.expect(mock.__name).equals('mock_model');
    });
  });

  t.describe('#accessor', () => {
    t.it('Defined attribute reader', () => {
      mock._hoge = 'HOGE';
      t.expect(mock.hoge).equals('HOGE');
    });

    t.it('Defined attribute writer', () => {
      mock.hoge = 'HOGE';
      t.expect(mock._hoge).equals('HOGE');
    });
  });

  t.describe('#reader', () => {
    t.it('Defined attribute reader', () => {
      mock._fuga = 'FUGA';
      t.expect(mock.fuga).equals('FUGA');
    });
  });

  t.describe('#writer', () => {
    t.it('Defined attribute writer', () => {
      mock.piyo = 'PIYO';
      t.expect(mock._piyo).equals('PIYO');
    });
  });

  t.describe('#validates', () => {
    t.it('Defined validations', () => {
      const validation = mock._validations['hoge'];
      const validator  = validation.validators[0];

      t.expect(validator instanceof LengthValidator).equals(true);
      t.expect(validator.options).deepEquals({max: 10});
    });
  });
});
