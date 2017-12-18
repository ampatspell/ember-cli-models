import Model from 'ember-cli-models/model/transient';
import { database, filter } from 'ember-cli-models/model/computed';
import { assign } from '@ember/polyfills';

const byType = opts => {
  opts = assign({ source: 'database', new: null, type: null }, opts);
  return filter(opts.source, function() {
    let source = this.get(opts.source);
    if(!source) {
      return;
    }
    let modelType = opts.type;
    return {
      source,
      owner: [],
      model: [ 'modelType', 'isNew' ],
      matches(model) {
        if(opts.new === false && model.get('isNew') === true) {
          return;
        }
        return model.get('modelType') === modelType;
      }
    };
  });
};

export default Model.extend({

  database: database(),

  authors: byType({ type: 'author' }),

  // temporary
  loadAllAuthors() {
    return this.get('database').find({ ddoc: 'author', view: 'by-id' });
  },

  // temporary
  loadAuthorByPermalink(id) {
    let docId = `author:${id}`;
    return this.get('database').find({ id: docId });
  },

  // temporary
  buildAuthor() {
    return this.get('database').model('author', { name: 'Unnamed' });
  }

});
