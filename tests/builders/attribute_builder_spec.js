const t                = require('track-spec');
const AttributeBuilder = require('../../lib/builders/attribute_builder.js');

t.describe('AttributeBuilder', () => {
  let builder = null;
  let mock    = null;

  t.beforeEach(() => {
    mock = {};
    builder = new AttributeBuilder(mock);
  });

  t.describe('#accessor', () => {
    const subject = ( () => builder.accessor('hoge', options));
    let options = null;

    t.beforeEach(() => {
      options = {};
    });

    t.it('Create accessor', () => {
      subject();

      mock.hoge = 'HOGE';

      t.expect(mock.hoge).equals('HOGE');
      t.expect(mock._hoge).equals('HOGE');
    });

    t.context('When with onchange option', () => {
      let onchange = null;

      t.beforeEach(() => {
        options.onchange = onchange = t.spy();
        mock._hoge = 'old';
      });

      t.context('When value is changed', () => {
        t.it('Call onchange callback', () => {
          subject();

          mock.hoge = 'new';

          t.expect(onchange.callCount).equals(1);
          t.expect(onchange.args[0]).equals('new');
          t.expect(onchange.args[1]).equals('old');
        });
      });

      t.context('When value is not changed', () => {
        t.it('Call onchange callback', () => {
          subject();

          mock.hoge = 'old';

          t.expect(onchange.callCount).equals(0);
        });
      });
    });
  });

  t.describe('#reader', () => {
    const subject = ( () => builder.reader('hoge'));

    t.it('Create reader', () => {
      subject();

      mock._hoge = 'HOGE';

      t.expect(mock.hoge).equals('HOGE');
    });
  });

  t.describe('#writer', () => {
    const subject = ( () => builder.writer('hoge'));

    t.it('Create writer', () => {
      subject();

      mock.hoge = 'HOGE';

      t.expect(mock._hoge).equals('HOGE');
    });
  });

  t.describe('#asyncReader', () => {
    const subject = (() => builder.asyncReader('hoge', {default: 'piyo'}, (() => null)));

    t.it('Create async reader', () => {
      subject();
      t.expect(mock.hoge).equals('piyo');
    });

    t.it('Create selialize data getter', () => {
      subject();

      mock._hoge._expiredAt = 123;
      mock._hoge._value = 'mock';

      t.expect(
        mock.hogeReader
      ).deepEquals({
        expiredAt: 123,
        value:     'mock',
      });
    });

    t.it('Create selialize data setter', () => {
      subject();

      mock.hogeReader = {
        expiredAt: 123,
        value:     'mock',
      };

      t.expect(mock._hoge._expiredAt).equals(123);
      t.expect(mock._hoge._value).equals('mock');
    });
  });
});
