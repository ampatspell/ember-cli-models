import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { Stores } from 'documents';

export default Stores.extend({

  models: computed(function() {
    return getOwner(this).lookup('models:stores');
  }).readOnly(),

  storeOptionsForIdentifier(identifier) {
    let store = this.get('models').store(identifier);
    return store.get('adapter.options.documents');
  }

});
