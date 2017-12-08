import Stores from 'ember-cli-models/-private/stores';
import Store from 'ember-cli-models/-private/store';
import Database from 'ember-cli-models/-private/database';
import ClassFactory from 'ember-cli-models/-private/class-factory';
import ModelClassFactory from 'ember-cli-models/-private/model-class-factory';
import InternalModelFactory from 'ember-cli-models/-private/internal-model-factory';
import InternalModelManager from 'ember-cli-models/-private/internal-model-manager';
import InternalModelIdentity from 'ember-cli-models/-private/internal-model-identity';
import ModelFactory from 'ember-cli-models/-private/model-factory';
import DatabaseIdentity from 'ember-cli-models/-private/identity/database';
import StoreIdentity from 'ember-cli-models/-private/identity/store';
import StoresIdentity from 'ember-cli-models/-private/identity/stores';

export default {
  name: 'ember-cli-models:internal',
  initialize(container) {
    container.register('models:stores', Stores);
    container.register('models:store', Store);
    container.register('models:database', Database);
    container.register('models:class-factory', ClassFactory);
    container.register('models:model-class-factory', ModelClassFactory);
    container.register('models:internal-model-factory', InternalModelFactory);
    container.register('models:internal-model-manager', InternalModelManager);
    container.register('models:internal-model-identity', InternalModelIdentity);
    container.register('models:model-factory', ModelFactory);
    container.register('models:database-identity', DatabaseIdentity);
    container.register('models:store-identity', StoreIdentity);
    container.register('models:stores-identity', StoresIdentity);
  }
};
