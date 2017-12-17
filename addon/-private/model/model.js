import EmberObject, { get, computed } from '@ember/object';

export const prop = name => computed(function() {
  return this._internal && this._internal[name];
});

export const state = name => computed(function() {
  return this._internal && this._internal.state[name];
});

const constructorProp = key => computed(function() {
  return get(this.constructor, key);
}).readOnly();

const modelName = () => constructorProp('modelName');
const modelType = () => constructorProp('modelType');

const Model = EmberObject.extend({

  _internal: null,

  modelName: modelName(),
  modelType: modelType(),

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
