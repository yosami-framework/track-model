const t                  = require('track-spec');
const InformationBuilder = require('../../lib/builders/information_builder.js');

t.describe('InformationBuilder', () => {
  let builder = null;
  let mock    = null;

  t.beforeEach(() => {
    mock = {};
    builder = new InformationBuilder(mock);
  });

  t.describe('#name', () => {
    const subject = ( () => builder.name('hoge'));

    t.it('Create reader', () => {
      subject();

      t.expect(mock.__name).equals('hoge');
    });
  });
});
