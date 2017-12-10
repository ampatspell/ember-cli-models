import Ember from 'ember';

export default {
  name: 'dummy:dev',
  after: 'dummy:app',
  initialize(app) {
    if(Ember.testing) {
      return;
    }

    let stores = app.lookup('models:stores');

    window.stores = stores;
    window.local = stores.store('local');
    window.remote = stores.store('remote');
  }
};
