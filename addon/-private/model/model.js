import EmberObject, { computed } from '@ember/object';

export const prop = name => computed(function() {
  return this._internal && this._internal[name];
}).readOnly();

const Model = EmberObject.extend({

  _internal: null,

  willDestroy() {
    this._internal.modelWillDestroy(this);
    this._super();
  }

});

Model.reopenClass({
  modelName: null,
  modelType: 'base'
});

export default Model;
