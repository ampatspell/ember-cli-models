import Storage from '../stack/local/storage';
import StoreAdapter from '../stack/local/store';
import DatabaseAdapter from '../stack/local/database';

export default {
  name: 'dummy:adapter-local',
  initialize(app) {
    app.register('models:stack/local/storage', Storage);
    app.register('models:stack/local/store/adapter', StoreAdapter);
    app.register('models:stack/local/database/adapter', DatabaseAdapter);
  }
}
