# vladiator

A simple vladation framework.

## Usage

### validate(rules, value)

Returns validation object with isValid property and error property.

__Arguments__

* rules - array of test methods to apply on value.
* value - value to be evalutated.

__Example__

```javascript
var vladiator = require('vladiator');
var rules = [ 'required', [ 'length', 10 ]];

//returns { isValid: false, error: 'length' }
vladiator.validate(rules, "keesmann");
```

## License
Copyright (c) 2012 August Hovland
Licensed under the MIT license.