import EmberObject from '@ember/object';
import { assign } from '@ember/polyfills';
import { run } from '@ember/runloop';
import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import Model from 'ember-cli-models/model/backed';
import StoreAdapter from 'ember-cli-models/adapter/store';
import DatabaseAdapter from 'ember-cli-models/adapter/database';

const MockStoreAdapter = StoreAdapter.extend({
});

const MockDatabaseAdapter = DatabaseAdapter.extend({

  createStorage(modelName, data) {
    let storage = EmberObject.create(assign({}, data, { type: modelName }));
    return { storage };
  }

});

const Duck = Model.extend();

module('backed-model', {
  beforeEach() {
    this.register('model:duck', Duck);
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
});

test('model destroy unsets internalModel._model', function(assert) {
  let model = this.database.model('duck');
  let internal = model._internal;
  assert.ok(internal._model === model);
  assert.ok(this.identity.all.includes(model._internal));
  run(() => model.destroy());
  assert.ok(internal._model === null);
  assert.ok(!this.identity.all.includes(model._internal));
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
