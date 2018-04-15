const t          = require('track-spec');
const TrackModel = require('../lib/index.js');
const Error      = require('../lib/validators/error');

t.describe('TrackModel', () => {
  let mock = null;

  t.beforeEach(() => {
    mock = new (class extends TrackModel {
      /**
       * Definitions of model.
       */
      static definer() {
        name('mock');

        accessor('hoge');
        accessor('piyo');
        reader('foo');

        validates('hoge', {length: {max: 10}});
        validates('piyo', {function: {validate: this.validatePiyo}});
      }

      /**
       * Validate piyo.
       * @param {object}   value   Value.
       * @param {function} resolve Callback for success validation.
       * @param {function} reject  Callback for failed validation.
       */
      validatePiyo(value, resolve, reject) {
        reject(new Error('is_not_piyo'));
      }
    })();
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

      t.it('Reject', () => {
        return new Promise((resolve, reject) => {
          subject().then(() => {
            reject('Be not rejected.');
          }).catch((error) => {
            t.expect(error.type).equals('too_long');
            resolve();
          });
        });
      });

      t.it('Set error', () => {
        return subject().catch(() => {
          t.expect(mock.errors['hoge'].type).equals('too_long');
          t.expect(mock.errors['hoge'].t).equals('translation missing: track_model.errors.too_long');
          t.expect(mock.errors['hoge'].options.count).equals(10);
        });
      });
    });

    t.context('When has no error', () => {
      t.beforeEach(() => {
        mock.hoge = 'abc';
      });

      t.it('Resolve', () => {
        return new Promise((resolve, reject) => {
          subject().then(() => {
            resolve();
          }).catch(() => {
            reject('Be not resolved.');
          });
        });
      });

      t.it('Set error to null', () => {
        return subject().then(() => {
          t.expect(mock.errors['hoge']).equals(null);
        });
      });
    });

    t.context('When FunctionValidator', () => {
      t.beforeEach(() => {
        attr = 'piyo';
        mock.piyo = 'hahaha';
      });

      t.it('Reject', () => {
        return new Promise((resolve, reject) => {
          subject().then(() => {
            reject('Be not rejected.');
          }).catch(() => {
            resolve();
          });
        });
      });

      t.it('Set error', () => {
        return subject().catch(() => {
          t.expect(mock.errors['piyo'].type).equals('is_not_piyo');
        });
      });
    });
  });

  t.describe('#validateAll', () => {
    const subject = (() => mock.validateAll());

    t.beforeEach(() => {
      mock.validate = t.spy(() => new Promise(() => null));
    });

    t.it('Call vadalite', () => {
      subject();
      t.expect(mock.validate.callCount).equals(2);
      t.expect(mock.validate.args[0]).equals('piyo');
    });

    t.it('Return promise', () => {
      t.expect(subject() instanceof Promise).equals(true);
    });
  });
});
