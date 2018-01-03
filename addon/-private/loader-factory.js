import EmberObject from '@ember/object';
import factoryFor from './util/factory-for';

export default EmberObject.extend({

  _context: null,

  createLoaderModel(_internal) {
    let factory = factoryFor(this, `models:loader`);
    return factory.create({ _internal });
  }

});
