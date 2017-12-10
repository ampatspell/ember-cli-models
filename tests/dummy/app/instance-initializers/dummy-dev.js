import Ember from 'ember';
import { Promise } from 'rsvp';

export default {
  name: 'dummy:dev',
  after: [
    'dummy:adapter-documents',
    'dummy:adapter-local',
    'dummy:stores'
  ],
  initialize(app) {
    window.Promise = Promise;

    let stores = app.lookup('models:stores');

    let state = stores.model('remote', 'main', 'state');
    app.register('service:state', state, { instantiate: false });

    app.inject('component', 'router', 'router:main');

    if(Ember.testing) {
      return;
    }

    window.stores = stores;
    window.local = stores.store('local');
    window.remote = stores.store('remote');
    window.docs = remote.database('main').get('adapter.documents');
  }
};
