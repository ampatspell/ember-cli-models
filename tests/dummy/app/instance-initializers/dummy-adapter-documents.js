import { makeRegisterStackInitializer } from 'ember-cli-models/util';
import Stores from '../stack/documents/-private/stores';
import Store from '../stack/documents/-private/store';
import Database from '../stack/documents/-private/database';
import StoreAdapter from '../stack/documents/-private/adapter/store';
import DatabaseAdapter from '../stack/documents/-private/adapter/database';

const initialize = makeRegisterStackInitializer('documents', {
  Stores,
  Store,
  Database,
  StoreAdapter,
  DatabaseAdapter
});

export default {
  name: 'dummy:adapter-documents',
  initialize
}
