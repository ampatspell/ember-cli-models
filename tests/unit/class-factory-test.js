import EmberObject, { get } from '@ember/object';
import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';

const Duck = EmberObject.extend();

module('class-factory', {
  beforeEach() {
    this.register('model:duck', Duck);
    this.register('model:yellow-duck', Duck);
    this.factory = this.store._classFactory;
  }
});

test('it exists', function(assert) {
  assert.ok(this.factory);
});

test('lookup', function(assert) {
  let { normalizedName, factory: Model } = this.factory.lookup({
    prefix: 'model',
    name: 'duck',
    prepare: (Model, modelName) => {
      Model = Model.extend({ ok: true });
      Model.reopenClass({ modelName });
      return Model;
    }
  });
  assert.equal(normalizedName, 'duck');
  assert.ok(Model);
  assert.ok(!!Model.class);
  assert.ok(!!Model.create);
  let instance = Model.create();
  assert.equal(get(instance.constructor, 'modelName'), 'duck');
  assert.equal(instance.get('ok'), true);
  assert.ok(instance.toString().startsWith('<dummy@models:model/duck::'));
});

test('lookup returns same extended class', function(assert) {
  let { factory: Duck1 } = this.factory.lookup({
    prefix: 'model',
    name: 'duck',
    prepare: (Model, modelName) => {
      Model = Model.extend({ ok: true });
      Model.reopenClass({ modelName });
      return Model;
    }
  });

  let { factory: Duck2 } = this.factory.lookup({
    prefix: 'model',
    name: 'duck',
    prepare: () => {
      assert.ok(false, 'prepare called');
    }
  })

  assert.ok(Duck1 === Duck2);
});

test('lookup returns normalized name', function(assert) {
  let { normalizedName } = this.factory.lookup({
    prefix: 'model',
    name: 'YellowDuck',
    prepare: Model => Model
  });
  assert.equal(normalizedName, 'yellow-duck');
});
