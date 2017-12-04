import { run } from '@ember/runloop';
import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import Model from 'ember-cli-models/model';
import Adapter from 'ember-cli-models/adapter/store';

const MockAdapter = Adapter.extend({

  build(opts) {
    return {
      props: opts,
      storage: { type: 'storage' }
    };
  }

});

const Duck = Model.extend();

module('model', {
  beforeEach() {
    this.register('model:duck', Duck);
    this.registerAdapter('mock', MockAdapter);
    this.setAdapter('default', 'mock');
    this.identity = this.database._internalModelIdentity._identity;
  }
});

test('store has mock adapter', function(assert) {
  assert.ok(MockAdapter.detectInstance(this.store._adapter));
});

test('model is created with internal model', function(assert) {
  let model = this.database.model('duck');
  assert.ok(model);
  assert.ok(model._internal);
  assert.ok(model._internal._model.instance === model);
  assert.ok(this.identity.all.includes(model._internal));
});

test('model destroy unsets internalModel._model', function(assert) {
  let model = this.database.model('duck');
  let internal = model._internal;
  assert.ok(internal._model.instance === model);
  assert.ok(this.identity.all.includes(model._internal));
  run(() => model.destroy());
  assert.ok(internal._model.instance === null);
  assert.ok(!this.identity.all.includes(model._internal));
});

test('model is created with storage and props provided by adapter', function(assert) {
  let model = this.database.model('duck', { type: 'props' });
  let internal = model._internal;
  let storage = internal.storage;
  assert.ok(model);
  assert.ok(internal);
  assert.ok(storage);
  assert.equal(model.get('type'), 'props');
  assert.equal(storage.type, 'storage');
});
