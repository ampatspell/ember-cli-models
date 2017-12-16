import { assign } from '@ember/polyfills';
import { run } from '@ember/runloop';
import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import Model, { database, model } from 'ember-cli-models/model/transient';

module('computed-transient-model', {
  beforeEach() {
    this.register('model:changeset', Model.extend());
    this.subject = opts => {
      opts = assign({ database: 'database', name: 'changeset' }, opts);
      this.register('model:duck', Model.extend({
        database: database(),
        changeset: model(opts.database, function() {
          if(opts.noop) {
            return;
          }
          return {
            database: this.get(opts.database),
            name: opts.name,
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

test('no database throws', function(assert) {
  let duck = this.subject({ database: 'missing' });
  try {
    duck.get('changeset');
  } catch(err) {
    assert.deepEqual(err.toJSON(), {
      "error": "assertion",
      "reason": "result.database must be database"
    });
  }
});

test('no result does not throw', function(assert) {
  let duck = this.subject({ noop: true });
  let changeset = duck.get('changeset');
  assert.ok(changeset === undefined);
});

test('missing name throws', function(assert) {
  let duck = this.subject({ name: null });
  try {
    duck.get('changeset');
  } catch(err) {
    assert.deepEqual(err.toJSON(), {
      "error": "assertion",
      "reason": "result.name must be string"
    });
  }
});
