import { run } from '@ember/runloop';
import { module } from 'qunit';
import { resolve } from 'rsvp';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import Stores from 'ember-cli-models/stores';
import Adapter from 'ember-cli-models/adapter';

const getter = (object, name, fn) => Object.defineProperty(object, name, { get: () => fn() });

const NoopAdapter = Adapter.extend();

const TestStores = Stores.extend({
  storeOptionsForIdentifier(identifier) {
    if([ 'default', 'local', 'remote' ].includes(identifier)) {
      return {
        adapter: 'noop'
      };
    }
  }
});

const createStores = ({ register }) => {
  register('models:stores', TestStores);
  register('models:adapter/noop', NoopAdapter);
}

export default function(name, options={}) {
  module(name, {
    beforeEach() {
      this.application = startApp();
      this.instance = this.application.buildInstance();
      this.register = (name, factory) => this.instance.register(name, factory);
      this.lookup = name => this.instance.lookup(name);
      createStores(this);
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
