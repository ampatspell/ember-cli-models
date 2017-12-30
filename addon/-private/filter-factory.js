import EmberObject from '@ember/object';
import factoryFor from './util/factory-for';

export default EmberObject.extend({

  _context: null,

  createFindModel(_internal) {
    let factory = factoryFor(this, `models:filter-find`);
    let content = _internal.content(true);
    return factory.create({ _internal, content });
  }

});
