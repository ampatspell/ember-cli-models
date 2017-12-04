import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import Stores from 'ember-cli-models/stores';
import Adapter from 'ember-cli-models/adapter/store';

module('store-adapter', {
  beforeEach() {
    this.create = () => {
      const AdapterImpl = Adapter.extend();
      const StoresImpl = Stores.extend({
        storeOptionsForIdentifier(identifier) {
          if(identifier === 'local') {
            return {
              adapter: 'local'
            }
          } else if(identifier === 'no-adapter') {
            return {};
          }
        }
      });
      this.register('models:adapter/store/local', AdapterImpl);
      this.register('models:stores', StoresImpl);
      return this.lookup('models:stores');
    };
  }
});

test('it exists', function(assert) {
  let stores = this.create();
  assert.ok(stores);
});

test('adapter is set', function(assert) {
  let stores = this.create();
  let store = stores.store('local');
  assert.ok(store._adapter);
  assert.ok(store._adapter.store === store);
});

test('throws for missing opts', function(assert) {
  let stores = this.create();
  try {
    stores.store('something');
  } catch(err) {
    assert.deepEqual(err.toJSON(), {
      "error": "assertion",
      "reason": "options for 'something' store must be object"
    });
  }
});

test('throws for missing adapter', function(assert) {
  let stores = this.create();
  try {
    stores.store('no-adapter');
  } catch(err) {
    assert.deepEqual(err.toJSON(), {
      "error": "assertion",
      "reason": "store adapter for 'no-adapter' must be string"
    });
  }
});
