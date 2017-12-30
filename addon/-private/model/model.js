import EmberObject, { get, computed } from '@ember/object';
import { BaseMixin, prop } from './base';

const constructorProp = key => computed(function() {
  return get(this.constructor, key);
}).readOnly();

const modelName = () => constructorProp('modelName');
const modelClassType = () => constructorProp('modelClassType');
const modelType = () => prop('modelType')

const Model = EmberObject.extend(BaseMixin, {

  modelName: modelName(),
  modelType: modelType(),
  modelClassType: modelClassType()

});

Model.reopenClass({
  modelName: null,
  modelClassType: 'base',
  debugColumns: [ 'modelName', 'modelType', 'modelClassType' ],

  toString() {
    return 'model';
  }

});

export default Model;
