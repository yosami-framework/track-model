# TrackViewModel
A model of view.

## Installation

### npm

```shell
npm install track-view-model
```

## Usage

```javascript
const TrackViewModel = require('track-view-model');

class Hoge extends TrackViewModel {
  static definer() {
    name('hoge'); // Define model name. **Required**

    accessor('hoge'); // Define `hoge.hoge` and `hoge.hoge=`
    reader('fuga');   // Define `hoge.fuga`
    writer('piyo');   // Define `hoge.piyo=`

    // Define accessor with onchange callback.
    accessor('foo', {onchanage: ((newly, older) => alert(`change ${older} to ${newly}`))});

    // Define async reader.
    // - cache:   60sec
    // - default: []
    asyncReader('bars', {default: [], expiresIn: 60}, this._fetchBars);

    // Define validation of #hoge.
    // (require value, and value.length <= 100)
    validate('hoge', {presence: true, length: {max: 100}});
  }

  _fetchBars() {
    if (this.foo) {
      return m.request(`/bars?foo_id=${foo.id}`); // @see mithril doc `m.request`
    }
  }
}
```

```javascript
const hoge = new Hoge({piyo: 'PIYO'});

hoge.hoge = 'hogehoge!';
hoge.hoge; // => "hogehoge!"

hoge.validate('hoge').then(() => {
  // When success.
  hoge.errors['hoge'];   // => null
}).catch(() => {
  // When fail.
  hoge.errors['hoge'];   // => Error {type: 'blank'}
  hoge.errors['hoge'].t; // => Translated error message. @see `track-i18n`
});

hoge.validateAll().then(/*...*/).catch(/*...*/);

hoge.toObject(); // => Object {hoge: 'abcdefg'}


// ## asyncReader ##
hoge.bars; // [];
hoge.foo = {id: 1};
hoge.bars; // [];

// after fetch
hoge.bars; // [{id: 1}, {id: 2}]

// clear cache
hoge._bars.clear();

```

## Build-in validators

- PresenceValidator
  - `ex) validate('hoge', {presence: true})`
    - `ng) null undefined ''`
- LengthValidator
  - `ex) validate('hoge', {length: {max: 10, min: 5}})`
    - `ng) 'abcd' 'abcdefghijk'`
- NumericalValidator
  - `ex) validate('hoge', {numerical: {max: 10, min: 5}})`
    - `ng) 4 11 'abc'`
- FunctionValidator
  - `ex) validate('hoge', {function: {validate: checkHoge}})`
    - @see FunctionValidatorExample
- FormatValidator
  - `ex) validate('hoge', {format: {regex: /.+@.+/}})`
    - `ng) 'abcd'`

### FunctionValidatorExample

```javascript
const Error = require('track-view-model/validators/error');
const checkHoge = function(value, resolve, reject) {
  if (value != 'hoge') {
    reject(new Error('is not Hoge.'));
  } else {
    resolve();
  }
};

validate('hoge', {function: {validate: checkHoge}})
```
