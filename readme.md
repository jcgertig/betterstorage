# BetterStorage

[![Downloads][npm-dm]][package-url]
[![Downloads][npm-dt]][package-url]
[![NPM Version][npm-v]][package-url]
[![Dependencies][deps]][package-url]
[![Dev Dependencies][dev-deps]][package-url]
[![License][license]][package-url]
[![Build Status](https://travis-ci.org/jcgertig/betterstorage.svg?branch=master)](https://travis-ci.org/jcgertig/bbetterstorage)
[![Code Climate](https://codeclimate.com/github/jcgertig/betterstorage/badges/gpa.svg)](https://codeclimate.com/github/jcgertig/betterstorage)
[![Test Coverage](https://codeclimate.com/github/jcgertig/betterstorage/badges/coverage.svg)](https://codeclimate.com/github/jcgertig/betterstorage/coverage)

__A better storage wrapper__

This library adds a nice api wrapper for many storage methods.

This library now defaults to promise based returns for all methods. Synchronous methods are available via `import { BetterStroage } from 'betterstorage'`.

## Basic Usage

```javascript
import BetterStorage from 'betterstorage';

const BasicStore = new BetterStorage();
BasicStore.set('Test', { test: 'test' }).then(() =>{
  BasicStore.has('Test').then((has) => {
    if (has) {
      BasicStore.get('Test').then((value) => {
        console.log(value); // { test: 'test' }
      });
    }
  });
});
```

## You can prefix your items in the store

```javascript
import { BetterStorage } from 'betterstorage';
const AwesomeStore = new BetterStorage('Awesome');
AwesomeStore.set('Test', { test: 'test' });
AwesomeStore.has('Test') // true
AwesomeStore.get('Test'); // { test: 'test' }
```

This will prefix `Test` with `Awesome` like so `Awesome-Test`.

## Changing from local storage
By defualt the store uses local storage.
To change this pass the name or the object as the second parameter.

```javascript
import { BetterStorage } from 'betterstorage';
const AwesomeLocalStore = new BetterStorage('Awesome', 'local');
const AwesomeSessionStore = new BetterStorage('Awesome', 'session');
```

## All methods

__contructor__
`new BetterStorage(prefix = '', kind = 'local', overrides = {})`
See Overrides section for more details on that param

__setPrefix__
`setPrefix(prefix = '', changeExisting = false)`
Allows for changing the prefix of the store.
If `changeExisting` is true and you currently have a prefix all items that were prefixed
will have their prefix changed.

__setKind__
`setKind(kind, migrateData = false)`
This method allows you to change the type of storage that is being used.
This is the same as the second param in the constructor.
If `migrateData` is true and you currently have a prefix all items that were prefixed
will be moved to the new storage type.

__set__
`set(key, value)`
Sets a item into the store

__get__
`get(key)`
Gets an item from the store

__remove__
`remove(key)`
Removes an item from the store

__has__
`has(key)`
Checks if key exists in the store

__clear__
`clear(full = false)`
Clears the store of items you have set. If there is no prefix set or if `full` is
true then the entire store is cleared.

__getLength__
`getLength()`
This return the number of items with the set prefix.

__getFullLength__
`getFullLength()`
This returns the number of all items in the store.

__key__
`key(n)`
This returns the key at index out of prefixed items.

_fullKey__
`fullKey(n)`
This returns the key at index out of all items in the store.

## Overrides
You can pass in methods to override the default actions for betterstorage.
This is most useful if you need a different storage type then the default 'local' and 'session'.
When using the default async storage api then these methods must return promises.
When using synchronous these methods should not return promises

The methods that you can override are
 - `doSet`
 - `doGet`
 - `doRemove`
 - `doClear`
 - `doLength`
 - `doFullLength`
 - `doKey`
 - `doFullKey`
 - `doHas`

### Example:

```javascript
import BetterStorage from 'betterstorage';
import { setItem, getItem, removeItem, clear } from 'redux-effects-localStorage';

const ReduxEffectsStore = new BetterStorage('Effects', 'local', {
  doGet: (key) => dispatch(getItem(key)),
  doSet: (key, value) => dispatch(setItem(key, value)),
  doRemove: (key) => dispatch(removeItem(key)),
  doClear: () =>  dispatch(clear()),
});

ReduxEffectsStore.set('Test', { test: 'test' }).then(() => {
  ReduxEffectsStore.has('Test').then(has => {
    if (has) {
      ReduxEffectsStore.get('Test').then((data) => { console.log(data); });
    }
  });
});
```

[npm-dm]: https://img.shields.io/npm/dm/betterstorage.svg
[npm-dt]: https://img.shields.io/npm/dt/betterstorage.svg
[npm-v]: https://img.shields.io/npm/v/betterstorage.svg
[deps]: https://img.shields.io/david/jcgertig/betterstorage.svg
[dev-deps]: https://img.shields.io/david/dev/jcgertig/betterstorage.svg
[license]: https://img.shields.io/npm/l/betterstorage.svg
[package-url]: https://npmjs.com/package/betterstorage
