import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import Stores from 'ember-cli-models/stores';

module('stores');

test('it exists', function(assert) {
  assert.ok(this.stores);
});

test('require storeOptionsForIdentifier', function(assert) {
  this.register('models:stores', Stores);
  let stores = this.stores;
  try {
    stores.store('foo');
  } catch(err) {
    assert.deepEqual(err.toJSON(), {
      "error": "assertion",
      "reason": "override storeOptionsForIdentifier"
    });
  }
});
