import { run } from '@ember/runloop';
import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import Model from 'ember-cli-models/model/transient';
import { database, filter } from 'ember-cli-models/model/computed';
import FilterFind from 'ember-cli-models/-private/model/filter-find';

const Duck = Model.extend({
  type: 'duck'
});

const Hamster = Model.extend({
  type: 'hamster'
});

module('computed-filter', {
  beforeEach() {
    this.register('model:duck', Duck);
    this.register('model:hamster', Hamster);
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
        ducks: filter('database', config),
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

test('filter exists', function(assert) {
  let state = this.subject();
  let ducks = state.get('ducks');
  assert.ok(ducks);
  assert.ok(FilterFind.detectInstance(ducks));

  let internal = ducks._internal;
  assert.ok(internal);
  assert.ok(internal._model === ducks);

  run(() => ducks.destroy());

  assert.ok(internal.isDestroyed);
  assert.ok(!internal._model);
});

test('filter contains pre-existing models', function(assert) {
  let yellow = this.database.model('duck', { id: 'yellow' });
  let green = this.database.model('duck', { id: 'green' });
  let hamster = this.database.model('hamster', { id: 'cute' });
  assert.deepEqual(this.database.get('identity').mapBy('id'), [ 'yellow', 'green', 'cute' ]);

  let state = this.subject();
  let ducks = state.get('ducks');
  assert.deepEqual(ducks.mapBy('id'), [ 'yellow', 'green' ]);
});
