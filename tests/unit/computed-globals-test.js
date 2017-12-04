import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import EmberObject from '@ember/object';
import { stores, store, database } from 'ember-cli-models/computed';

module('computed-globals', {
  beforeEach() {
    this.register('app:subject', EmberObject.extend({
      stores: stores(),
      store: store('default'),
      database: database('default', 'main')
    }));
    this.subject = this.lookup('app:subject');
  }
});

test('stores', function(assert) {
  let subject = this.subject;
  let stores = subject.get('stores');
  assert.ok(stores);
  assert.ok(stores === this.stores);
});

test('store', function(assert) {
  let subject = this.subject;
  let store = subject.get('store');
  assert.ok(store);
  assert.ok(store === this.stores.store('default'));
});

test('database', function(assert) {
  let subject = this.subject;
  let database = subject.get('database');
  assert.ok(database);
  assert.ok(database === this.stores.store('default').database('main'));
});
