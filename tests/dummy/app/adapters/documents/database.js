import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import DatabaseAdapter from 'ember-cli-models/adapter/database';

export default DatabaseAdapter.extend({

  documents: computed(function() {
    let store = this.get('adapter.documents');
    let identifier = this.get('database.identifier');
    return store.database(identifier);
  }).readOnly(),

  _identity: readOnly('documents.documentsIdentity'),

  _identityObserverOptions() {
    return {
      willChange: this._identityWillChange,
      didChange: this._identityDidChange
    };
  },

  start() {
    this._super();
    this.get('_identity').addEnumerableObserver(this, this._identityObserverOptions());
  },

  stop() {
    this._super();
    this.get('_identity').removeEnumerableObserver(this, this._identityObserverOptions());
  },

  _identityWillChange(array, removing) {
    removing.forEach(doc => this.delete(doc));
  },

  _identityDidChange(array, removeCount, adding) {
    adding.forEach(doc => this.push(doc));
  },

  //

  modelDefinitionForStorage(storage) {
    return {
      observe: [ 'type' ],
      name: storage => storage.get('type')
    };
  },

  createStorage(modelName, props) {
    let storage = this.get('documents').doc(assign({}, props, { type: modelName }));
    return {
      storage
    };
  }

});
