import EmberObject from '@ember/object';
import { assign } from '@ember/polyfills';
import { run } from '@ember/runloop';
import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import BackedModel from 'ember-cli-models/model/backed';
import TransientModel from 'ember-cli-models/model/transient';
import StoreAdapter from 'ember-cli-models/adapter/store';
import DatabaseAdapter from 'ember-cli-models/adapter/database';

const MockStoreAdapter = StoreAdapter.extend();

const MockDatabaseAdapter = DatabaseAdapter.extend({

  modelDefinitionForStorage() {
    return {
      observe: [ 'type' ],
      name: storage => storage.get('type')
    };
  },

  createStorage(modelName, data) {
    let storage = EmberObject.create(assign({}, data, { type: modelName }));
    return { storage };
  }

});

const Duck = BackedModel.extend();
const Thing = TransientModel.extend();
const YellowDuck = Duck.extend();
const GreenDuck = Duck.extend();

module('backed-model', {
  beforeEach() {
    this.register('model:thing', Thing);
    this.register('model:duck', Duck);
    this.register('model:yellow-duck', YellowDuck);
    this.register('model:green-duck', GreenDuck);
    this.registerAdapters('mock', MockStoreAdapter, MockDatabaseAdapter);
    this.adapter = 'mock';
  }
});

test('model is created with internal model', function(assert) {
  let model = this.database.model('duck');
  assert.ok(model);
  assert.ok(model._internal);
  assert.ok(model._internal._model === model);
  assert.ok(this.identity.all.includes(model._internal));
  assert.ok(this.identity.storage.get(model._internal.storage));
});

test('model destroy unsets internalModel._model', function(assert) {
  let model = this.database.model('duck');
  let internal = model._internal;

  assert.ok(internal._model === model);
  assert.ok(this.identity.all.includes(internal));
  assert.ok(this.identity.storage.get(internal.storage));

  run(() => model.destroy());

  assert.ok(internal._model === null);
  assert.ok(!this.identity.all.includes(internal));
  assert.ok(!this.identity.storage.get(internal.storage));
});

test('storage is accessible', function(assert) {
  let model = this.database.model('duck');
  assert.ok(model._internal.storage);
  assert.ok(model.get('storage') === model._internal.storage);
  assert.equal(model.get('storage.type'), 'duck');
});

test('model is created with storage and props provided by adapter', function(assert) {
  let model = this.database.model('duck', { id: 'duck:yellow' });
  let internal = model._internal;
  let storage = internal.storage;
  assert.ok(model);
  assert.ok(internal);
  assert.ok(storage);
  assert.equal(storage.get('id'), 'duck:yellow');
  assert.equal(storage.get('type'), 'duck');
});

test('model is recreated on type change', function(assert) {
  let model = this.database.model('duck');
  let internal = model._internal;

  assert.equal(model.get('storage.type'), 'duck');
  assert.ok(!model.isDestroyed);
  assert.ok(Duck.detectInstance(model));

  run(() => internal.storage.set('type', 'duck'));
  assert.ok(!model.isDestroyed);

  run(() => internal.storage.set('type', 'yellow-duck'));
  assert.ok(model.isDestroyed);
  assert.ok(!model._internal);
  model = internal.model(true);
  assert.ok(model);
  assert.ok(YellowDuck.detectInstance(model));

  run(() => internal.storage.set('type', 'green-duck'));
  assert.ok(model.isDestroyed);
  assert.ok(!model._internal);
  model = internal.model(true);
  assert.ok(model);
  assert.ok(GreenDuck.detectInstance(model));
});

test('model must be backed on recreate', function(assert) {
  let model = this.database.model('duck');
  let internal = model._internal;
  run(() => model.set('storage.type', 'thing'));
  try {
    internal.model(true);
  } catch(err) {
    assert.deepEqual(err.toJSON(), {
      "error": "assertion",
      "reason": "model 'thing' must be backed model"
    });
  }
});
