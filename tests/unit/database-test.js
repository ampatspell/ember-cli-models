import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';

module('database');

test('it exists', function(assert) {
  assert.ok(this.database);
});
