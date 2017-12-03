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

test('it exists', function(assert) {
  let model = this.database.model('type');
  assert.ok(model);
});
