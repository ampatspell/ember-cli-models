import Model from 'ember-cli-models/model/transient';
import { store } from 'ember-cli-models/computed';
import { readOnly, alias } from '@ember/object/computed';

export default Model.extend({

  store: store(),
  session: readOnly('store.session'),
  url: readOnly('store.adapter.documents.documents.url'),

  isAuthenticated: readOnly('session.isAuthenticated'),

  name:            alias('session.name'),
  password:        alias('session.password'),

  save() {
    return this.get('session').save();
  },

  delete() {
    return this.get('session').delete();
  },

  actions: {
    save() {
      return this.save();
    },
    delete() {
      return this.delete();
    }
  }

});
