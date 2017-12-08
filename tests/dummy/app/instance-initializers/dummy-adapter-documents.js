import Stores from '../adapters/documents/stores';
import StoreAdapter from '../adapters/documents/store';
import DatabaseAdapter from '../adapters/documents/database';

export default {
  name: 'dummy:adapter-documents',
  initialize(app) {
    app.register('models:adapter/documents/stores', Stores);
    app.register('models:adapter/documents/store', StoreAdapter);
    app.register('models:adapter/documents/database', DatabaseAdapter);
  }
}
