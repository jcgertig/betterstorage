import { autobind, decorate } from 'core-decorators';
import memoize from 'memoizerific';

@autobind
export default class BetterStorage {
  constructor(prefix = '', kind = 'local', overrides = {}) {
    this.prefix = prefix;
    this.kind = kind;
    this.store = typeof kind === 'string' ? window[`${kind}Storage`] : kind;

    this.methods = Object.assign({
      doSet: this._doSet,
      doGet: this._doGet,
      doRemove: this._doRemove,
      doClear: this._doClear,
      doLength: this._doLength,
      doFullLength: this._doFullLength,
      doKey: this._doKey,
      doFullKey: this._doFullKey,
      doHas: this._doHas
    }, overrides);
  }

  _doSet(key, data) {
    return this.store.setItem(key, JSON.stringify({ value: data }));
  }

  _doGet(key) {
    try {
      return JSON.parse(this.store.getItem(key)).value;
    } catch (e) {
      return this.store.getItem(key);
    }
  }

  _doRemove(key) {
    return this.store.removeItem(key);
  }

  _doClear() {
    return this.store.clear();
  }

  _doLength() {
    return this.keys.length;
  }

  _doFullLength() {
    return this.store.length;
  }

  _doKey(n) {
    return this.keys[n];
  }

  _doFullKey(n) {
    return this.store.key(n);
  }

  _doHas(key) {
    return this.fullKeys.indexOf(key) > -1;
  }

  @decorate(memoize(200))
  getStoreKey(key = '', prefix = this.prefix) {
    if (prefix === '') { return key; }
    return `${prefix}-${key}`;
  }

  setPrefix(prefix = '', changeExisting = false) {
    if (changeExisting && this.prefix !== '' && this.keys.length > 0) {
      this.keys.forEach((key) => {
        const val = this.store.getItem(this.getStoreKey(key));
        this.store.removeItem(this.getStoreKey(key));
        this.store.setItem(this.getStoreKey(key, prefix), val);
      });
    }
    this.prefix = prefix;
  }

  setKind(kind, migrateData = false) {
    const newStore = typeof kind === 'string' ? window[`${kind}Storage`] : kind;
    if (migrateData && this.prefix !== '' && this.keys.length > 0) {
      this.keys.forEach((key) => {
        const val = this.store.getItem(this.getStoreKey(key));
        this.store.removeItem(this.getStoreKey(key));
        newStore.setItem(this.getStoreKey(key), val);
      });
    }
    this.kind = kind;
    this.store = newStore;
  }

  /*
   * Set Item into Storage
   */
  set(key, value) {
    return this.methods.doSet(this.getStoreKey(key), value);
  }

  /*
   * Get Item from Storage
   */
  get(key) {
    return this.methods.doGet(this.getStoreKey(key));
  }

  /*
   * Removes an Item from Storage
   */
  remove(key) {
    return this.methods.doRemove(this.getStoreKey(key));
  }

  /*
   * If store has key
   */
  has(key) {
    return this.methods.doHas(this.getStoreKey(key));
  }

  /*
   * Clears the store
   */
  clear(full = false) {
    if (this.prefix === '' || full) {
      this.methods.doClear();
    } else {
      this.keys.forEach((key) => {
        this.methods.doRemove(this.getStoreKey(key));
      });
    }
  }

  /*
   * Number of items with prefix
   */
  getLength() {
    return this.methods.doLength();
  }

  /*
   * Number of items in the store
   */
  getFullLength() {
    return this.methods.doFullLength();
  }

  /*
   * Get prefix key at location
   */
  key(n) {
    return this.methods.doKey(n);
  }

  /*
   * Get key at location
   */
  fullKey(n) {
    return this.methods.doFullKey(n);
  }

  /*
   * List of prefixed keys in store
   */
  get keys() {
    if (this.prefix === '') { return this.fullKeys; }
    return Object.keys(this.store)
      .filter((item) => item.indexOf(`${this.prefix}-`) === 0)
      .map((item) => item.replace(`${this.prefix}-`, ''));
  }

  /*
   * List of all keys in store
   */
  get fullKeys() {
    return Object.keys(this.store);
  }
}
