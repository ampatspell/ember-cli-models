import { run } from '@ember/runloop';
import { module } from 'qunit';
import { resolve } from 'rsvp';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

const getter = (object, name, fn) => Object.defineProperty(object, name, { get: () => fn() });

export default function(name, options={}) {
  module(name, {
    beforeEach() {
      this.application = startApp();
      this.instance = this.application.buildInstance();
      getter(this, 'stores', () => this.instance.lookup('models:stores'));
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
