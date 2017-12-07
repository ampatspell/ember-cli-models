import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import Stores from 'documents/stores';
import environment from '../../config/environment';

const url = environment.COUCHDB_URL;
const databaseNameMapping = { main: 'ember-cli-models' };
const databaseNameForIdentifier = identifier => databaseNameMapping[identifier] || identifier;

const StoresImpl = Stores.extend({
  storeOptionsForIdentifier() {
    return {
      adapter: 'couch',
      url,
      databaseNameForIdentifier
    };
  }
});

module('documents-adapter');

test('hello', async function(assert) {
  this.register('documents:stores', StoresImpl);
  let stores = this.lookup('documents:stores');
  assert.ok(stores);
  let store = stores.store('remote');
  assert.ok(store);
  let db = store.database('main');
  let info = await db.get('documents').info();
  assert.equal(info.db_name, databaseNameMapping.main);
});
