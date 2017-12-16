import { run } from '@ember/runloop';
import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import Model, { database, model } from 'ember-cli-models/model/transient';

module('computed-transient-model', {
  beforeEach() {
    this.register('model:changeset', Model.extend());
    this.subject = () => {
      this.register('model:duck', Model.extend({
        database: database(),
        changeset: model('database', function() {
          return {
            database: this.get('database'),
            name: 'changeset',
            props: {
              duck: this
            }
          };
        })
      }));
      return this.database.model('duck');
    };
  }
});

test('duck exists', function(assert) {
  let duck = this.subject();
  assert.ok(duck);
});

test('duck has changeset', function(assert) {
  let duck = this.subject();
  let changeset = duck.get('changeset');
  assert.ok(changeset);
  assert.ok(changeset.get('duck') === duck);
});

test('changeset is destroyed with duck', function(assert) {
  let duck = this.subject();
  let changeset = duck.get('changeset');

  run(() => duck.destroy());

  assert.ok(changeset.isDestroyed);
});

test('destroyed changeset is not recreated', function(assert) {
  let duck = this.subject();
  let changeset = duck.get('changeset');
  let internal = changeset._internal;

  run(() => changeset.destroy());

  assert.ok(changeset.isDestroyed);
  assert.ok(internal.isDestroyed);
  assert.ok(!changeset._internal);

  let next = duck.get('changeset');
  assert.ok(next === changeset);
});
