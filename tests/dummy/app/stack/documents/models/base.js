import Model from 'ember-cli-models/model/backed';
import StateMixin from './-state-mixin';
import { alias, readOnly } from '@ember/object/computed';

const forward = key => function() {
  let storage = this.get('storage');
  return storage[key].call(storage, ...arguments);
}

export const attr = key => alias(`storage.${key}`);
export const reads = key => readOnly(`storage.${key}`);

export default Model.extend(StateMixin, {

  id:  attr('id'),
  rev: attr('rev'),

  state: reads('state'),

  serialized: reads('serialized'),

  load:   forward('load'),
  reload: forward('reload'),
  delete: forward('delete'),

  willCreate() {
  },

  willSave() {
  },

  async save() {
    if(this.get('isNew')) {
      await this.willCreate();
    } else {
      await this.willSave();
    }
    return await this.get('storage').save();
  },

});
