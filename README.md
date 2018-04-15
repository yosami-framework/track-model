# TrackModel
A model of view.

[![Build Status](https://travis-ci.org/yosami-framework/track-model.svg?branch=master)](https://travis-ci.org/yosami-framework/track-model)

## Installation

### npm

```shell
npm install track-view-model
```

## Usage

```javascript
const TrackModel = require('track-view-model');

class Hoge extends TrackModel {
  static definer() {
    name('hoge'); // Define model name. **Required**

    accessor('hoge'); // Define `hoge.hoge` and `hoge.hoge=`
    reader('fuga');   // Define `hoge.fuga`
    writer('piyo');   // Define `hoge.piyo=`

    // Define accessor with onchange callback.
    accessor('foo', {onchanage: ((newly, older) => alert(`change ${older} to ${newly}`))});

    // Define validation of #hoge.
    // (require value, and value.length <= 100)
    validates('hoge', {presence: true, length: {max: 100}});
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
const Error = require('track-model/validators/error');
const checkHoge = function(value, resolve, reject) {
  if (value != 'hoge') {
    reject(new Error('is not Hoge.'));
  } else {
    resolve();
  }
};

validate('hoge', {function: {validate: checkHoge}})
```
