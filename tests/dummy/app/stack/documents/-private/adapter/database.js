import Base from './-database';
import { assign } from '@ember/polyfills';

const definition = {
  observe: [ 'id', 'type' ],
  type(storage) {
    let { id, type } = storage.getProperties('id', 'type');
    if(id && id.startsWith('_design/')) {
      return 'design';
    }
    if(type) {
      return type;
    }
  }
};

const types = {
  blogs: [ 'blog', 'author' ]
};

export default Base.extend({

  modelDefinitionForStorage() {
    return definition;
  },

  modelNameForType(type) {
    if(types.blogs.includes(type)) {
      return `blogs/${type}`;
    }
    return type;
  },

  build(type, props) {
    if(type === 'design') {
      return this.doc(props);
    }
    return this.doc(assign({}, props, { type }));
  }

});
