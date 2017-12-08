import Stores from 'ember-cli-models/stores';
import environment from './config/environment';

const COUCHDB_URL = environment.COUCHDB_URL;

export default Stores.extend({
  storeOptionsForIdentifier(identifier) {
    if(identifier === 'local') {
      return {
        adapter: 'local'
      };
    } else if(identifier === 'remote') {
      return {
        adapter: 'documents',
        documents: {
          adapter: 'couch',
          url: COUCHDB_URL,
          databaseNameForIdentifier(identifier) {
            if(identifier === 'main') {
              return 'ember-cli-models';
            }
            return identifier;
          }
        }
      };
    }
  }
});
