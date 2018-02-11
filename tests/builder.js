const t               = require('track-spec');
const Builder         = require('../lib/builder.js');
const LengthValidator = require('../lib/validators/length_validator');

t.describe('Builder', () => {
  let mock = null;

  t.beforeEach(() => {
    mock = new (class {
      /**
       * Definitions of model.
       */
      static definer() {
        name('mock_model');

        accessor('hoge');
        reader('fuga');
        writer('piyo');

        validate('hoge', {length: {max: 10}});
      }
    })();
    Builder.build(mock);
  });

  t.context('When definer is not defined', () => {
    t.it('Raise error', () => {
      let error = null;
      try {
        Builder.build(new (class { })());
      } catch (e) {
        error = e;
      }
      t.expect(error.message).equals('.definer is undefined.');
    });
  });

  t.context('When name is not defined', () => {
    t.it('Raise error', () => {
      let error = null;
      try {
        Builder.build(new (class {
          /**
           * Definitions of model.
           */
          static definer() {
            accessor('hoge');
          }
        })());
      } catch (e) {
        error = e;
      }
      t.expect(error.message).equals('Model name is undefined. A definer must define `name("model_name")`.');
    });
  });

  t.describe('#name', () => {
    t.it('Defined name reader', () => {
      t.expect(mock.__modelName).equals('mock_model');
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

  t.describe('validations', () => {
    t.it('Defined validations', () => {
      const validation = mock._validations['hoge'];
      const validator  = validation.validators[0];

      t.expect(validator instanceof LengthValidator).equals(true);
      t.expect(validator.options).deepEquals({max: 10});
    });
  });
});
