import EmberObject, { get } from '@ember/object';
import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import Model from 'ember-cli-models/model';

const Duck = Model.extend();
const Random = EmberObject.extend();

module('model-class-factory', {
  beforeEach() {
    this.register('model:duck', Duck);
    this.register('model:random', Random);
    this.factory = this.store._modelClassFactory;
  }
});

test('it exists', function(assert) {
  assert.ok(this.factory);
});

test('lookup returns extended factory', function(assert) {
  let Model = this.factory.lookup('duck');
  assert.ok(Model);
  assert.equal(get(Model.class, 'modelName'), 'duck');
});

test('lookup throws for unregistered factory', function(assert) {
  try {
    this.factory.lookup('hamster');
  } catch(err) {
    assert.deepEqual(err.toJSON(), {
      "error": "assertion",
      "reason": "class for name 'model:hamster' is not registered"
    });
  }
});

test('lookup throws for non-model', function(assert) {
  try {
    this.factory.lookup('random');
  } catch(err) {
    assert.deepEqual(err.toJSON(), {
      "error": "assertion",
      "reason": "model 'random' must be ember-cli-models/model"
    });
  }
});
