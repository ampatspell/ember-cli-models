import Ember from 'ember';
import { Promise } from 'rsvp';

export default {
  name: 'dummy:dev',
  initialize(app) {
    window.Promise = Promise;

    let stores = app.lookup('models:stores');
    let store = stores.store('remote');
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
