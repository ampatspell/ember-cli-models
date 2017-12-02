import Ember from 'ember';
import { Promise } from 'rsvp';

export default {
  name: 'dummy:dev',
  initialize(app) {
    window.Promise = Promise;

    let stores = app.lookup('models:stores');
    let store = stores.store('remote');
    let database = store.database('main');

    app.register('service:store', store, { instantiate: false });
    app.register('service:database', database, { instantiate: false });

    [ 'route', 'component' ].forEach(name => {
      app.inject(name, 'stores', 'models:stores');
      app.inject(name, 'store', 'service:store');
      app.inject(name, 'database', 'service:database');
    });

    app.inject('component', 'router', 'router:main');

    if(Ember.testing) {
      return;
    }

    window.stores = stores;
    window.store = store;
    window.database = database;
  }
};
