import Ember from 'ember';
import { Promise } from 'rsvp';
import Stores from 'ember-cli-models/stores';
import StoreAdapter from 'ember-cli-models/adapter/store';
import DatabaseAdapter from 'ember-cli-models/adapter/database';

const LocalStoreAdapter = StoreAdapter.extend();

const LocalDatabaseAdapter = DatabaseAdapter.extend();

const DummyStores = Stores.extend({
  storeOptionsForIdentifier(identifier) {
    if(identifier === 'local') {
      return {
        adapter: 'local'
      };
    }
  }
});

export default {
  name: 'dummy:dev',
  initialize(app) {
    window.Promise = Promise;

    app.register('models:adapter/local/store', LocalStoreAdapter);
    app.register('models:adapter/local/database', LocalDatabaseAdapter);
    app.register('models:stores', DummyStores);

    let stores = app.lookup('models:stores');
    let store = stores.store('local');
    let database = store.database('main');

    app.inject('component', 'router', 'router:main');

    if(Ember.testing) {
      return;
    }

    window.stores = stores;
    window.store = store;
    window.database = database;
  }
};
