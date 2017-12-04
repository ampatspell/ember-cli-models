import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';

module('model-factory', {
  beforeEach() {
    this.factory = this.store._modelFactory;
  }
});

test('it exists', function(assert) {
  assert.ok(this.factory);
});

test('lookup returns extended factory', function(assert) {
});

test('lookup throws for unregistered factory', function(assert) {
});
