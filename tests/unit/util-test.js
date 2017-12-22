import EmberObject from '@ember/object';
import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import { getStores, getStore, getDatabase } from 'ember-cli-models/util';

module('util', {
  beforeEach() {
    this.subject = () => {
      this.register('thing:main', EmberObject.extend());
      return this.lookup('thing:main');
    }
  }
});

test('getStores, store and database', function(assert) {
  let subject = this.subject();
  assert.ok(getStores(subject) === this.stores);
  assert.ok(getStore(subject, 'default') === this.store);
  assert.ok(getDatabase(subject, 'default', 'main') === this.database);
});
