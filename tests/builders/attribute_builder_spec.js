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
});
