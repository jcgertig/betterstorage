import { autobind, decorate } from 'core-decorators';

@autobind
export default class BetterStorageAsync {
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
    return new Promise((accept, reject) => {
      this.store.getItem(key).then((data) => {
        try {
          accept(JSON.parse(data).value)
        } catch (e) {
          accept(data);
        }
      }).catch(reject);
    });
  }

  _doRemove(key) {
    return this.store.removeItem(key);
  }

  _doClear() {
    return this.store.clear();
  }

  _doLength() {
    return new Promise((accept, reject) => {
      this.keys.then((keys) => accept(keys.length)).catch(reject);
    });
  }

  _doFullLength() {
    return new Promise((accept, reject) => {
      this.fullKeys.then((keys) => accept(keys.length)).catch(reject);
    });
  }

  _doKey(n) {
    return new Promise((accept, reject) => {
      this.keys.then((keys) => accept(keys[n])).catch(reject);
    });
  }

  _doFullKey(n) {
    return new Promise((accept, reject) => {
      this.fullKeys.then((keys) => accept(keys[n])).catch(reject);
    });
  }

  _doHas(key) {
    return new Promise((accept, reject) => {
      this.fullKeys.then((keys) => accept(keys.indexOf(key) > -1)).catch(reject);
    });
  }

  getStoreKey(key = '', prefix) {
    prefix = prefix || this.prefix;
    if (prefix === '') { return key; }
    return `${prefix}-${key}`;
  }

  setPrefix(prefix = '', changeExisting = false) {
    return new Promise((accept, reject) => {
      if (changeExisting && this.prefix !== '' && this.keys.length > 0) {
        this.keys
        .then((keys) => {
          Promise.all(keys.map((key) => {
            return new Promise((acceptInner, rejectInner) => {
              this.store.getItem(this.getStoreKey(key))
              .then((value) => acceptInner({ key, value }))
              .catch(rejectInner);
            })
          }))
          .then((pairs) => {
            Promise.all(pairs.reduce((promises, data) => {
              promises.push(this.store.removeItem(this.getStoreKey(data.key)));
              promises.push(this.store.setItem(this.getStoreKey(data.key, prefix), data.value));
              return promises;
            }, []))
            .then(() => {
              this.prefix = prefix;
              accept();
            })
            .catch(reject);
          })
          .catch(reject);
        })
        .catch(reject);
      } else {
        this.prefix = prefix;
        accept();
      }
    });
  }

  setKind(kind, migrateData = false) {
    return new Promise((accept, reject) => {
      const newStore = typeof kind === 'string' ? window[`${kind}Storage`] : kind;
      if (migrateData && this.prefix !== '' && this.keys.length > 0) {
        this.keys
        .then((keys) => {
          Promise.all(keys.map((key) => {
            return new Promise((acceptInner, rejectInner) => {
              this.store.getItem(this.getStoreKey(key))
              .then((value) => acceptInner({ key, value }))
              .catch(rejectInner);
            })
          }))
          .then((pairs) => {
            Promise.all(pairs.reduce((promises, data) => {
              promises.push(this.store.removeItem(this.getStoreKey(data.key)));
              promises.push(newStore.setItem(this.getStoreKey(data.key), data.value));
              return promises;
            }, []))
            .then(() => {
              this.kind = kind;
              this.store = newStore;
              accept();
            })
            .catch(reject);
          })
          .catch(reject);
        })
        .catch(reject);
      } else {
        this.kind = kind;
        this.store = newStore;
        accept();
      }
    });
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
      return this.methods.doClear();
    }
    return new Promise((accept, reject) => {
      this.keys.then((keys) => {
        Promise.all(keys.map((key) => this.methods.doRemove(this.getStoreKey(key))))
        .then(accept).catch(reject);
      }).catch(reject);
    });
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
    return new Promise((resolve, reject) => {
      this.fullKeys.then((keys) => {
        resolve(
          keys
          .filter((item) => item.indexOf(`${this.prefix}-`) === 0)
          .map((item) => item.replace(`${this.prefix}-`, ''))
        );
      }).catch(reject);
    });
  }

  /*
   * List of all keys in store
   */
  get fullKeys() {
    return this.store.getAllKeys();
  }
}
