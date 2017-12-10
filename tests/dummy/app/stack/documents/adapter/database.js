import Base from './-database';
import { assign } from '@ember/polyfills';

const definition = {
  observe: [ 'id', 'type' ],
  name(storage) {
    let { id, type } = storage.getProperties('id', 'type');
    if(id && id.startsWith('_design/')) {
      return 'design';
    }
    if(type) {
      return type;
    }
  }
};

export default Base.extend({

  modelDefinitionForStorage() {
    return definition;
  },

  modelName(name) {
    return `remote/${name}`;
  },

  build(name, props) {
    if(name === 'design') {
      return this.doc(props);
    }
    return this.doc(assign({}, props, { type: name }));
  }

});
