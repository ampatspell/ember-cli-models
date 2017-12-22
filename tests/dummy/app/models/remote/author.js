import Model, { attr, prefixed, fallback } from './model';
import { filter } from 'ember-cli-models/model/computed';

const blogs = () => filter(function() {
  return {
    source: this.get('database'),
    owner: [],
    model: [ 'modelType', 'editors' ],
    matches(model, owner) {
      let { modelType, editors } = model.getProperties('modelType', 'editors');
      return modelType === 'blog' && editors.includes(owner);
    }
  };
});

export default Model.extend({

  id: prefixed('author:'),

  name: attr('name'),
  email: attr('email'),

  screenName: fallback('name', 'Unnamed'),

  blogs: blogs(),

  willCreate() {
    let id = this.get('name').toLowerCase().replace(/ /g, '-');
    this.set('storage.id', `author:${id}`);
  }

});
