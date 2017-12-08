import EmberObject, { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { Stores } from 'documents';

const createStores = manager => Stores.extend({
  storeOptionsForIdentifier: identifier => manager.storeOptionsForIdentifier(identifier)
});

export default EmberObject.extend({

  documents: computed(function() {
    let owner = getOwner(this);
    owner.register('documents:stores', createStores(this));
    return owner.lookup('documents:stores');
  }).readOnly(),

  models: computed(function() {
    return getOwner(this).lookup('models:stores');
  }).readOnly(),

  storeOptionsForIdentifier(identifier) {
    let store = this.get('models').store(identifier);
    return store.get('adapter.options.documents');
  }

});
