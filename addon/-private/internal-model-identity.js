import EmberObject from '@ember/object';
import { A } from '@ember/array';

export default EmberObject.extend({

  _identity: null,

  init() {
    this._super(...arguments);
    this._identity = {
      all: A()
    };
  },

  registerNewInternalModel(internal) {
    this._identity.all.addObject(internal);
  },

  unregisterInternalModel(internal) {
    this._identity.all.removeObject(internal);
  }

});
