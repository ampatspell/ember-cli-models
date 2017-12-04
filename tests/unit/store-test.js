import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';

module('store');

test('it exists', function(assert) {
  assert.ok(this.store);
});

test('store has model factory', function(assert) {
  assert.ok(this.store._modelFactory);
});

test('toString includes identifier', function(assert) {
  assert.ok(this.store.toString().endsWith('default>'));
});
