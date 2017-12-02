import { run } from '@ember/runloop';
import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';

module('stores-store');

test('create store with identifier', function(assert) {
  let store = this.stores.store('remote');
  assert.ok(store);
  assert.ok(store.get('stores') === this.stores);
  assert.ok(store.get('identifier') === 'remote');
});

test('stores are cached', function(assert) {
  let remote1 = this.stores.store('remote');
  let remote2 = this.stores.store('remote');
  let local1 = this.stores.store('local');
  let local2 = this.stores.store('local');

  assert.ok(remote1);
  assert.ok(remote2);
  assert.ok(local1);
  assert.ok(local2);

  assert.ok(remote1 === remote2);
  assert.ok(local1 === local2);

  assert.ok(local1 !== remote1);
});

test('stores destroy destroys cached stores', function(assert) {
  let store = this.stores.store('remote');
  run(() => this.stores.destroy());
  assert.ok(this.stores.isDestroyed);
  assert.ok(store.isDestroyed);
});
