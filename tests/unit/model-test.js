import { run } from '@ember/runloop';
import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import Model from 'ember-cli-models/model';

const Duck = Model.extend({

});

module('model', {
  beforeEach() {
    this.register('model:duck', Duck);
  }
});

test('model is created with internal model', function(assert) {
  let model = this.database.model('duck');
  assert.ok(model);
  assert.ok(model._internal);
  assert.ok(model._internal._model.instance === model);
});

test('model destroy unsets internalModel._model', function(assert) {
  let model = this.database.model('duck');
  let internal = model._internal;
  assert.ok(internal._model.instance === model);
  run(() => model.destroy());
  assert.ok(internal._model.instance === null);
});
