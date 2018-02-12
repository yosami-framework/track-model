const t                    = require('track-spec');
const AsyncAttributeReader = require('../lib/async_attribute_reader.js');

t.describe('AsyncAttributeReader', () => {
  let _reader = null;
  let block   = null;
  let options = null;

  const reader = (() => {
    if (!_reader) {
      _reader = new AsyncAttributeReader(options, block);
    }
    return _reader;
  });

  t.beforeEach(() => {
    _reader = null;
    block = t.spy();
    options = {default: {}};
  });

  t.describe('value', () => {
    const subject = (() => reader().value);

    t.it('Call block', () => {
      subject();
      t.expect(block.callCount).equals(1);
    });

    t.context('When cache is not expired', () => {
      t.beforeEach(() => {
        reader()._expiredAt = Number.MAX_VALUE;
      });

      t.it('Not call block', () => {
        subject();
        t.expect(block.callCount).equals(0);
      });
    });

    t.context('When block returns null', () => {
      t.it('Return default value', () => {
        t.expect(subject()).equals(options.default);
      });

      t.it('Not set expiredAt', () => {
        subject();
        t.expect(reader()._expiredAt).equals(-1);
      });
    });

    t.context('When block returns promise', () => {
      t.beforeEach(() => {
        promise = new Promise((r) => r('hoge'));
        block = t.spy(() => promise);
      });
      let promise = null;

      t.it('Return value', () => {
        t.expect(subject()).equals(options.default);
        return promise.then(() => {
          t.expect(subject()).equals('hoge');
        });
      });

      t.it('Set expiredAt', () => {
        subject();
        return promise.then(() => {
          t.expect(reader()._expiredAt).equals(Number.MAX_VALUE);
        });
      });

      t.context('When with expiresIn option', () => {
        t.beforeEach(() => {
          options.expiresIn = 10;
          dateNow = Date.now;
          Date.now = t.spy(() => 1000);
        });
        let dateNow = null;

        t.afterEach(() => {
          Date.now = dateNow;
        });

        t.it('Set expiredAt', () => {
          subject();
          return promise.then(() => {
            t.expect(reader()._expiredAt).equals(Date.now() + 10000);
          });
        });
      });
    });
  });
});
