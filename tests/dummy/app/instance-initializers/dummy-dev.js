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
    let local = stores.store('local');
    let remote = stores.store('remote');

    app.inject('component', 'router', 'router:main');

    if(Ember.testing) {
      return;
    }

    window.stores = stores;
    window.local = local;
    window.remote = remote;
    window.docs = remote.database('main').get('adapter.documents');
  }
};
