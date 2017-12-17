import EmberObject, { get, computed } from '@ember/object';
import { BaseMixin } from './base';

const constructorProp = key => computed(function() {
  return get(this.constructor, key);
}).readOnly();

const modelName = () => constructorProp('modelName');
const modelType = () => constructorProp('modelType');

const Model = EmberObject.extend(BaseMixin, {

  _internal: null,

  modelName: modelName(),
  modelType: modelType()

});

Model.reopenClass({
  modelName: null,
  modelType: 'base'
});

export default Model;
