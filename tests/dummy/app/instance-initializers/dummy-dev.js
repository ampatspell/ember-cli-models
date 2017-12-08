import Ember from 'ember';
import EmberObject from '@ember/object';
import { getOwner } from '@ember/application';
import { Promise } from 'rsvp';
import Stores from 'ember-cli-models/stores';
import StoreAdapter from 'ember-cli-models/adapter/store';
import DatabaseAdapter from 'ember-cli-models/adapter/database';
import environment from '../config/environment';

const LocalStorage = EmberObject.extend();

const LocalStoreAdapter = StoreAdapter.extend();
const LocalDatabaseAdapter = DatabaseAdapter.extend({

  createStorage(props) {
    return {
      storage: getOwner(this).factoryFor('local:storage').create(props)
    };
  }

});

const DummyStores = Stores.extend({
  storeOptionsForIdentifier(identifier) {
    if(identifier === 'local') {
      return {
        adapter: 'local',
        url: environment.COUCHDB_URL
      };
    }
  }
});

export default {
  name: 'dummy:dev',
  initialize(app) {
    window.Promise = Promise;

    app.register('local:storage', LocalStorage);

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
