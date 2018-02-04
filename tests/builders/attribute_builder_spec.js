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
    const subject = ( () => builder.accessor('hoge'));

    t.it('Create accessor', () => {
      subject();

      mock.hoge = 'HOGE';

      t.expect(mock.hoge).equals('HOGE');
      t.expect(mock._hoge).equals('HOGE');
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
