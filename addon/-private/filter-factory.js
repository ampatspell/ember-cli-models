import EmberObject from '@ember/object';
import factoryFor from './util/factory-for';

export default EmberObject.extend({

  _context: null,

  _create(name, props) {
    let factory = factoryFor(this, `models:filter-${name}`);
    return factory.create(props);
  },

  createFindModel(_internal) {
    let content = _internal.content(true);
    return this._create('find', { _internal, content });
  },

  createFirstModel(_internal) {
    let content = _internal.content(true);
    return this._create('first', { _internal, content });
  }

});
