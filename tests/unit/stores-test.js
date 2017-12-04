import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';

module('stores');

test('it exists', function(assert) {
  assert.ok(this.stores);
});

test('require storeOptionsForIdentifier', function(assert) {
  let stores = this.lookup('models:stores');
  try {
    stores.store('foo');
  } catch(err) {
    assert.deepEqual(err.toJSON(), {
      "error": "assertion",
      "reason": "override storeOptionsForIdentifier"
    });
  }
});
