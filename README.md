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

    // Can define multiple.
    accessor('foo', 'bar');

    // Define validation of #hoge.
    // (require value, and value.length <= 100)
    validate('hoge', {presence: true, length: {max: 100}});
  }
}
```

```javascript
const hoge = new Hoge({piyo: 'PIYO'});

hoge.validate('hoge'); // => falsey
hoge.errors['hoge'];   // => Error {type: 'blank'}
hoge.errors['hoge'].t; // => Translated error message. @see `track-i18n`

hoge.hoge = 'abcdefg';
hoge.validate('hoge'); // => truthy
hoge.errors['hoge'];   // => null, undefined (falsey)



hoge.toObject(); // => Object {hoge: 'abcdefg'}
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
const checkHoge = function(value) {
  if (value != 'hoge') {
    return new Error('is not Hoge.');
  }
};

validate('hoge', {function: {validate: checkHoge}})
```
