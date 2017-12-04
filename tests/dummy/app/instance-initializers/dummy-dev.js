import Ember from 'ember';
import { Promise } from 'rsvp';
import Stores from 'ember-cli-models/stores';
import Adapter from 'ember-cli-models/adapter';

const LocalAdapter = Adapter.extend();

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

    app.register('models:adapter/local', LocalAdapter);
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
