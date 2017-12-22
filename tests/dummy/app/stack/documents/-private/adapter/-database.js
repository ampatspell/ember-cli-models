import DatabaseAdapter from 'ember-cli-models/adapter/database';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

const documents = () => computed(function() {
  let store = this.get('adapter.documents');
  let identifier = this.get('database.identifier');
  return store.database(identifier);
}).readOnly();

export const property = key => readOnly(`documents.${key}`);

export const forward = key => function() {
  let documents = this.get('documents');
  return documents[key].call(documents, ...arguments);
}

export default DatabaseAdapter.extend({

  documents: documents(),
  content: property('documentsIdentity'),

  doc: forward('doc'),

  find: forward('find'),
  first: forward('first')

});
