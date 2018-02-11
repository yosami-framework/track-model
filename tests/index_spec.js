const t               = require('track-spec');
const TrackViewModel  = require('../lib/index.js');
const LengthValidator = require('../lib/validators/length_validator');
const Error           = require('../lib/validators/error');

t.describe('TrackViewModel', () => {
  let mock = null;

  t.beforeEach(() => {
    mock = new (class extends TrackViewModel {
      /**
       * Definitions of model.
       */
      static definer() {
        name('mock');

        accessor('hoge', 'piyo');

        validate('hoge', {length: {max: 10}});
        validate('piyo', {function: {validate: this.validatePiyo}});
      }

      /**
       * Validate piyo.
       * @return {Error} Error.
       */
      validatePiyo() {
        return new Error('is_not_piyo');
      }
    })();
  });

  t.describe('attributes', () => {
    t.it('Defined attributes', () => {
      mock.hoge = 'HOGE';

      t.expect(mock.hoge).equals('HOGE');
      t.expect(mock._hoge).equals('HOGE');
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

  t.describe('#errors', () => {
    const subject = (() => mock.errors);

    t.it('Return errors', () => {
      t.expect(subject()).deepEquals({});
    });
  });

  t.describe('#setAttributes', () => {
    const subject = (() => mock.setAttributes(attributes));
    let attributes = null;

    t.beforeEach(() => {
      attributes = {hoge: 'HOGE', piyo: 'PIYO'};
    });

    t.it('Set attribute', () => {
      subject();
      t.expect(mock.hoge).equals('HOGE');
      t.expect(mock.piyo).equals('PIYO');
    });

    t.context('When class does not have attribute', () => {
      t.beforeEach(() => {
        attributes = {fuga: 'FUGA'};
      });

      t.it('Not set attribute', () => {
        subject();
        t.expect(mock.fuga).equals(undefined);
      });
    });
  });

  t.describe('#toObject', () => {
    const subject = (() => mock.toObject());

    t.beforeEach(() => {
      mock.hoge = 'HOGE';
      mock.piyo = 'PIYO';
    });

    t.it('Return object.', () => {
      t.expect(subject()).deepEquals({hoge: 'HOGE', piyo: 'PIYO'});
    });
  });

  t.describe('#validate', () => {
    const subject = (() => mock.validate(attr));
    let attr = null;

    t.beforeEach(() => {
      attr = 'hoge';
    });

    t.context('When has error', () => {
      t.beforeEach(() => {
        mock.hoge = 'abcdefghijk';
      });

      t.it('Return falsey', () => {
        t.expect(!!subject()).equals(false);
      });

      t.it('Set error', () => {
        subject();
        t.expect(mock.errors['hoge'].type).equals('too_long');
        t.expect(mock.errors['hoge'].options.count).equals(10);
      });
    });

    t.context('When has no error', () => {
      t.beforeEach(() => {
        mock.hoge = 'abc';
      });

      t.it('Return truthy', () => {
        t.expect(!!subject()).equals(true);
      });

      t.it('Set error to null', () => {
        subject();
        t.expect(mock.errors['hoge']).equals(null);
      });
    });

    t.context('When FunctionValidator', () => {
      t.beforeEach(() => {
        attr = 'piyo';
        mock.piyo = 'hahaha';
      });

      t.it('Return falsey', () => {
        t.expect(!!subject()).equals(false);
      });

      t.it('Set error', () => {
        subject();
        t.expect(mock.errors['piyo'].type).equals('is_not_piyo');
      });
    });
  });

  t.describe('#validateAll', () => {
    const subject = (() => mock.validateAll());

    t.beforeEach(() => {
      mock.validate = t.spy();
    });

    t.it('Call vadalite', () => {
      subject();
      t.expect(mock.validate.callCount).equals(2);
      t.expect(mock.validate.args[0]).equals('piyo');
    });
  });
});
