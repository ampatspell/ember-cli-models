import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import StoreAdapter from 'ember-cli-models/adapter/store';

export default StoreAdapter.extend({

  stores: computed(function() {
    return getOwner(this).lookup('models:adapter/documents/stores');
  }).readOnly(),

  documents: computed(function() {
    let identifier = this.get('store.identifier');
    return this.get('stores').store(identifier);
  }).readOnly()

});
