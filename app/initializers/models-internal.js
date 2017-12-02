import Stores from 'ember-cli-models/-private/stores';
import Store from 'ember-cli-models/-private/store';
import Database from 'ember-cli-models/-private/database';

export default {
  name: 'ember-cli-models:internal',
  initialize(container) {
    container.register('models:stores', Stores);
    container.register('models:store', Store);
    container.register('models:database', Database);
  }
};
