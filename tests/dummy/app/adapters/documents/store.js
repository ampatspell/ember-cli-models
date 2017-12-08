import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import StoreAdapter from 'ember-cli-models/adapter/store';

export default StoreAdapter.extend({

  manager: computed(function() {
    return getOwner(this).lookup('models:adapter/documents/manager');
  }).readOnly(),

  documents: computed(function() {
    let identifier = this.get('store.identifier');
    return this.get('manager.documents').store(identifier);
  }).readOnly()

});
