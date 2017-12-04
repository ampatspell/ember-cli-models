import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';

module('database');

test('it exists', function(assert) {
  assert.ok(this.database);
});

test('toString includes identifier', function(assert) {
  assert.ok(this.database.toString().endsWith('default/main>'));
});
