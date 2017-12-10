import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import Stores from 'ember-cli-models/stores';
import Model from 'ember-cli-models/model/transient';

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

test('identity is singleton', function(assert) {
  assert.ok(!this.stores._context._identity);
  assert.ok(this.stores._context.identity === this.stores._context.identity);
  assert.ok(this.stores._context._identity);
});

test('stores model shortcut', function(assert) {
  this.register('model:duck', Model.extend());
  assert.ok(this.stores.model('default', 'main', 'duck')._internal.database === this.store.database('main'));
});
