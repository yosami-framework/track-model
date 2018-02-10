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
    validate('hoge', [
      {validator: 'Presence'},
      {validator: 'Length', options: {max: 100}},
    ]);
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

### Build-in validators

- PresenceValidator
  - `ex) {validator: 'Presence'}`
    - `ng) null undefined ''`
- LengthValidator
  - `ex) {validator: 'Length', options: {max: 10, min: 5}}`
    - `ng) 'abcd' 'abcdefghijk'`
- NumericalValidator
  - `ex) {validator: 'Numerical', options: {max: 10, min: 5}}`
    - `ng) 4 11 'abc'`
- FormatValidator
  - `ex) {validator: 'Format', options: {regex: /.+@.+/}}`
    - `ng) 'abcd'`
