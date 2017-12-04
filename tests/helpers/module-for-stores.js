import { run } from '@ember/runloop';
import { module } from 'qunit';
import { resolve } from 'rsvp';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import Stores from 'ember-cli-models/stores';
import StoreAdapter from 'ember-cli-models/adapter/store';
import DatabaseAdapter from 'ember-cli-models/adapter/database';

const getter = (object, name, fn) => Object.defineProperty(object, name, { get: () => fn() });

const createOpts = () => {
  let noop = { adapter: 'noop' };
  return {
    'default': noop,
    'local': noop,
    'remote': noop
  };
}

const createStores = owner => {
  const StoreNoopAdapter = StoreAdapter.extend();
  const DatabaseNoopAdapter = DatabaseAdapter.extend();
  const TestStores = Stores.extend({
    storeOptionsForIdentifier: identifier => owner.opts[identifier]
  });
  owner.register('models:stores', TestStores);
  owner.register('models:adapter/noop/store', StoreNoopAdapter);
  owner.register('models:adapter/noop/database', DatabaseNoopAdapter);
}

export default function(name, options={}) {
  module(name, {
    beforeEach() {
      this.application = startApp();
      this.instance = this.application.buildInstance();
      this.register = (name, factory) => this.instance.register(name, factory);
      this.lookup = name => this.instance.lookup(name);

      this.opts = createOpts();
      createStores(this);

      this.registerAdapter = (name, storeFactory, databaseFactory) => {
        this.register(`models:adapter/${name}/store`, storeFactory);
        this.register(`models:adapter/${name}/database`, databaseFactory)
      };

      this.setAdapter = (storeName, adapterName) => this.opts[storeName] = { adapter: adapterName };

      getter(this, 'stores', () => this.lookup('models:stores'));
      getter(this, 'store', () => this.stores.store('default'));
      getter(this, 'database', () => this.store.database('main'));

      let beforeEach = options.beforeEach && options.beforeEach.apply(this, arguments);
      return resolve(beforeEach);
    },
    afterEach() {
      let afterEach = options.afterEach && options.afterEach.apply(this, arguments);
      return resolve(afterEach).then(() => {
        run(() => this.instance.destroy());
        destroyApp(this.application);
      });
    }
  });
}
