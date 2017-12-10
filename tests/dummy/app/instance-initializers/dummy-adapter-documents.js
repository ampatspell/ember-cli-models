import Stores from '../stack/documents/stores';
import Store from '../stack/documents/store';
import Database from '../stack/documents/database';
import StoreAdapter from '../stack/documents/adapter/store';
import DatabaseAdapter from '../stack/documents/adapter/database';

export default {
  name: 'dummy:adapter-documents',
  initialize(app) {
    app.register('models:stack/documents/stores', Stores);
    app.register('models:stack/documents/store', Store);
    app.register('models:stack/documents/database', Database);
    app.register('models:stack/documents/store/adapter', StoreAdapter);
    app.register('models:stack/documents/database/adapter', DatabaseAdapter);
  }
}
