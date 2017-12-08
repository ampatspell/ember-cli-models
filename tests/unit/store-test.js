import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';

module('store');

test('it exists', function(assert) {
  assert.ok(this.store);
});

test('toString includes identifier', function(assert) {
  assert.ok(this.store.toString().endsWith('default>'));
});
