const t               = require('track-spec');
const AttributeHelper = require('../../lib/helpers/attribute_helper');

t.describe('AttributeHelper', () => {
  let mock = null;

  t.beforeEach(() => {
    const parent = (class {
      /**
       * Mock setter
       * @param {object} value
       */
      set piyo(value) {
        this._piyo = value;
      }
    });
    mock = new (class extends parent {
      /**
       * Mock getter.
       */
      get hoge() {
        return '';
      }

      /**
       * Mock setter.
       * @param {object} value
       */
      set fuga(value) {
        this._fuga = value;
      }
    })();
  });

  t.describe('getGetters', () => {
    const subject = (() => AttributeHelper.getGetters(mock));

    t.it('Return getters', () => {
      t.expect(subject()).deepEquals(['hoge']);
    });
  });

  t.describe('getSetters', () => {
    const subject = (() => AttributeHelper.getSetters(mock));

    t.it('Return getters', () => {
      t.expect(subject()).deepEquals(['fuga', 'piyo']);
    });
  });
});
