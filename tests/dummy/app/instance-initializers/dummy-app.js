import { Promise } from 'rsvp';

export default {
  name: 'dummy:app',
  after: [
    'dummy:adapter-documents',
    'dummy:adapter-local',
    'dummy:stores'
  ],
  initialize(app) {
    window.Promise = Promise;
    app.inject('component', 'router', 'router:main');
  }
};
