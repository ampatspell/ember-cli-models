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
