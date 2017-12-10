import Model from 'ember-cli-models/model/backed';

const forward = key => function() {
  let storage = this.get('storage');
  return storage[key].call(storage, ...arguments);
}

export default Model.extend({

  save:   forward('save'),
  load:   forward('load'),
  reload: forward('reload'),
  delete: forward('delete')

});
