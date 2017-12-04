import Stores from 'ember-cli-models/-private/stores';
import Store from 'ember-cli-models/-private/store';
import Database from 'ember-cli-models/-private/database';
import ClassFactory from 'ember-cli-models/-private/class-factory';
import ModelClassFactory from 'ember-cli-models/-private/model-class-factory';
import InternalModelFactory from 'ember-cli-models/-private/internal-model-factory';

export default {
  name: 'ember-cli-models:internal',
  initialize(container) {
    container.register('models:stores', Stores);
    container.register('models:store', Store);
    container.register('models:database', Database);
    container.register('models:class-factory', ClassFactory);
    container.register('models:model-class-factory', ModelClassFactory);
    container.register('models:internal-model-factory', InternalModelFactory);
  }
};
