import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import Model from 'ember-cli-models/model/transient';

module('store');

test('it exists', function(assert) {
  assert.ok(this.store);
});

test('toString includes identifier', function(assert) {
  assert.ok(this.store.toString().endsWith('default>'));
});

test('identity is singleton', function(assert) {
  assert.ok(!this.store._context._identity);
  assert.ok(this.store._context.identity === this.store._context.identity);
  assert.ok(this.store._context._identity);
});

test('store model shortcut', function(assert) {
  this.register('model:duck', Model.extend());
  assert.ok(this.store.model('main', 'duck')._internal.database === this.store.database('main'));
});
