import DatabaseAdapter from 'ember-cli-models/adapter/database';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { assign } from '@ember/polyfills';

const designDocument = {
  observe: [],
  name: () => 'design-document'
};

const model = {
  observe: [ 'type' ],
  name: storage => storage.get('type')
};

const documents = () => computed(function() {
  let store = this.get('adapter.documents');
  let identifier = this.get('database.identifier');
  return store.database(identifier);
}).readOnly();

export default DatabaseAdapter.extend({

  documents: documents(),
  content: readOnly('documents.documentsIdentity'),

  modelDefinitionForStorage(storage) {
    let id = storage.get('id');
    if(id && id.startsWith('_design/')) {
      return designDocument;
    }
    return model;
  },

  build(modelName, props) {
    return this.get('documents').doc(assign({}, props, { type: modelName }));
  },

  find() {
    return this.get('documents').find(...arguments);
  },

  first() {
    return this.get('documents').first(...arguments);
  }

});
