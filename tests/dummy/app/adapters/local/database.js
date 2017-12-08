import DatabaseAdapter from 'ember-cli-models/adapter/database';
import { getOwner } from '@ember/application';
import { assign } from '@ember/polyfills';

export default DatabaseAdapter.extend({

  _model(props) {
    return getOwner(this).factoryFor('models:adapter/local/storage').create(props);
  },

  createStorage(modelName, props) {
    return {
      storage: this._model(assign({}, props, { type: modelName })),
      model: {
        observe: [ 'type' ],
        name: storage => storage.get('type')
      }
    };
  },

  push(props) {
    let model = this._model(props);
    this.pushStorage(model);
  }

});
