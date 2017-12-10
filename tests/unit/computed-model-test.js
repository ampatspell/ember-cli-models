import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import Model, { stores, store, database } from 'ember-cli-models/model/backed';

module('computed-model', {
  beforeEach() {
    this.subject = (opts={}) => {
      this.register('model:duck', Model.extend({
        stores: stores(),
        store: store(opts.store),
        database: database(opts.database)
      }));
      return this.database.model('duck');
    };
  }
});

test('lookup works', function(assert) {
  let duck = this.subject();
  assert.ok(duck.get('stores') === this.stores);
  assert.ok(duck.get('store') === this.store);
  assert.ok(duck.get('database') === this.database);
});

test('lookup another database', function(assert) {
  let duck = this.subject({ database: 'another' });
  assert.ok(duck.get('database') === this.store.database('another'));
});

test('lookup another store', function(assert) {
  let duck = this.subject({ store: 'remote' });
  assert.ok(duck.get('store') === this.stores.store('remote'));
});
