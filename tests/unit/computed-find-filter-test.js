import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import Model from 'ember-cli-models/model/transient';
import { database, filter } from 'ember-cli-models/model/computed';

module('computed-find-filter', {
  beforeEach() {
    this.register('model:duck', Model.extend());
    this.subject = () => {
      this.register('model:state', Model.extend({
        database: database(),
        ducks: filter('database', function() {

        }),
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
  let ducks = state.get('ducks');
  assert.ok(ducks);
});
