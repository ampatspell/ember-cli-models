import Collection from './-collection';

export default Collection.extend({

  type: 'author',

  // temporary
  loadAll() {
    return this.get('database').find({ ddoc: 'author', view: 'by-id-with-blogs' });
  },

  // temporary
  loadByPermalink(id) {
    let docId = `author:${id}`;
    return this.get('database').find({ id: docId });
  },

  // temporary
  build() {
    return this.get('database').model('author', { name: 'Unnamed' });
  }

});
