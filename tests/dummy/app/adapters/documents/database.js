import { computed } from '@ember/object';
import DatabaseAdapter from 'ember-cli-models/adapter/database';

export default DatabaseAdapter.extend({

  documents: computed(function() {
    let store = this.get('adapter.documents');
    let identifier = this.get('database.identifier');
    return store.database(identifier);
  }).readOnly()

});
