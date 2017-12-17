import Model from 'ember-cli-models/model/transient';
import { database } from 'ember-cli-models/model/computed';

export default Model.extend({

  database: database(),

  // temporary
  loadAllAuthors() {
    return this.get('database').find({ ddoc: 'author', view: 'by-id' });
  },

  // temporary
  loadAuthorByPermalink(id) {
    let docId = `author:${id}`;
    return this.get('database').find({ id: docId });
  }

});
