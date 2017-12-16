import Model, { database } from 'ember-cli-models/model/transient';

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
