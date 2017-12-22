import { makeRegisterStackInitializer } from 'ember-cli-models/util';
import Storage from '../stack/local/storage';
import StoreAdapter from '../stack/local/store';
import DatabaseAdapter from '../stack/local/database';

const initialize = makeRegisterStackInitializer('local', {
  Storage,
  StoreAdapter,
  DatabaseAdapter
});

export default {
  name: 'dummy:adapter-local',
  initialize
}
