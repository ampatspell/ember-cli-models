import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import Stores from 'documents/stores';

const StoresImpl = Stores.extend({
  storeOptionsForIdentifier(identifier) {
    return {
      adapter: 'couch',
      url: 'http://127.0.0.1:5984'
    };
  }
});

module('documents-adapter');

test.skip('hello', async function(assert) {
  this.register('documents:stores', StoresImpl);
  let stores = this.lookup('documents:stores');
  assert.ok(stores);
  let store = stores.store('remote');
  assert.ok(store);
  let db = store.database('ember-cli-models');
  let info = await db.get('documents').info();
  assert.equal(info.db_name, 'ember-cli-models');
});
