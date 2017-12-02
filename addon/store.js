import EmberObject from '@ember/object';
import { getOwner } from '@ember/application';

export default EmberObject.extend({

  stores: null,
  identifier: null,

  database(identifier) {
    return getOwner(this).factoryFor('models:database').create({ store: this, identifier });
  },

  toStringExtension() {
    return this.get('identifier');
  }

});
