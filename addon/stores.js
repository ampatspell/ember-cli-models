import EmberObject from '@ember/object';
import { getOwner } from '@ember/application';

export default EmberObject.extend({

  store(identifier) {
    return getOwner(this).factoryFor('models:store').create({ stores: this, identifier });
  }

});
