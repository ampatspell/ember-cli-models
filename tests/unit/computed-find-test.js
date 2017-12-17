import { run } from '@ember/runloop';
import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import Model from 'ember-cli-models/model/transient';
import { database, find } from 'ember-cli-models/model/computed';

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
  let two = this.database.model('duck', { id: 'two' });

  let identity = this.database.get('identity');
  assert.ok(identity.includes(one));
  assert.ok(identity.includes(two));
});

test('find exists', function(assert) {
  let state = this.subject();
  let ducks = state.get('duck');
  assert.ok(ducks);
  let internal = ducks._internal;
  assert.ok(internal);
  assert.ok(internal._model === ducks);

  run(() => ducks.destroy());

  assert.ok(internal.isDestroyed);
  assert.ok(!internal._model);
});
