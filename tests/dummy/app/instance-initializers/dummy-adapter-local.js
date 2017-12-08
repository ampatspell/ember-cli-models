import Storage from '../adapters/local/storage';
import StoreAdapter from '../adapters/local/store';
import DatabaseAdapter from '../adapters/local/database';

export default {
  name: 'dummy:adapter-local',
  initialize(app) {
    app.register('models:adapter/local/storage', Storage);
    app.register('models:adapter/local/store', StoreAdapter);
    app.register('models:adapter/local/database', DatabaseAdapter);
  }
}
