import { run } from '@ember/runloop';
import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import Model from 'ember-cli-models/model/transient';
import { database, find } from 'ember-cli-models/model/computed';
import FilterFirst from 'ember-cli-models/-private/model/filter-first';

module('computed-find', {
  beforeEach() {
    this.register('model:duck', Model.extend());
    this.register('model:hamster', Model.extend());
    this.subject = () => {

      let config = function() {
        return  {
          source: this.get('database'),
          owner: [ 'type' ],
          model: [ 'type' ],
          matches(model, owner) {
            return model.get('type') === owner.get('type');
          }
        };
      };

      this.register('model:state', Model.extend({
        database: database(),
        type: 'duck',
        duck: find('database', config)
      }));

      return this.database.model('state');
    };
  }
});

test('state exists', function(assert) {
  let state = this.subject();
  assert.ok(state);
  assert.ok(state.get('database'));
  let one = this.database.model('duck', { id: 'one' });
  let identity = this.database.get('identity');
  assert.ok(identity.includes(one));
});

test('find exists', function(assert) {
  let state = this.subject();
  let duck = state.get('duck');
  assert.ok(duck);
  assert.ok(FilterFirst.detectInstance(duck));

  let internal = duck._internal;
  assert.ok(internal);
  assert.ok(internal._model === duck);

  run(() => duck.destroy());

  assert.ok(internal.isDestroyed);
  assert.ok(!internal._model);
});
