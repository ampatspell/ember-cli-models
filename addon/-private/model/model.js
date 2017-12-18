import EmberObject, { get, computed } from '@ember/object';
import { BaseMixin, prop } from './base';

const constructorProp = key => computed(function() {
  return get(this.constructor, key);
}).readOnly();

const modelName = () => constructorProp('modelName');
const modelType = () => prop('modelType');
const modelClassType = () => constructorProp('modelClassType');

const Model = EmberObject.extend(BaseMixin, {

  modelName: modelName(),
  modelType: modelType(),
  modelClassType: modelClassType()

});

Model.reopenClass({
  modelName: null,
  modelClassType: 'base'
});

export default Model;
