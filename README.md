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
  attributes(attr) {
    attr.accessor('hoge'); // Define `hoge.hoge` and `hoge.hoge=`
    attr.reader('fuga');   // Define `hoge.fuga`
    attr.writer('piyo');   // Define `hoge.piyo=`

    // Can define multiple.
    attr.accessor('foo', 'bar');
  }

  validations(column) {
    column.validate('hoge', [
      {validator: 'Presence'},
      {validator: 'Length', options: {max: 100}},
    ]);
  }
}
```

```javascript
const hoge = new Hoge({piyo: 'PIYO'});

hoge.validate('hoge'); // => falsey
hoge.errors('hoge');   // => Error {type: 'blank'}

hoge.hoge = 'abcdefg';
hoge.validate('hoge'); // => truthy
hoge.errors('hoge');   // => null, undefined (falsey)

hoge.toObject(); // => Object {hoge: 'abcdefg'}
```

### Build-in validators

- PresenceValidator
  - `ex) {validator: 'Presence'}`
    - `ng) null undefined ''`
- LengthValidator
  - `ex) {validator: 'Length', {max: 10, min: 5}}`
    - `ng) 'abcd' 'abcdefghijk'`
- NumericalValidator
  - `ex) {validator: 'Numerical', {max: 10, min: 5}}`
    - `ng) 4 11 'abc'`
- FormatValidator
  - `ex) {validator: 'Format', {regex: /.+@.+/}}`
    - `ng) 'abcd'`
