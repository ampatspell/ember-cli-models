import EmberObject, { get, computed } from '@ember/object';
import { BaseMixin } from './base';

const constructorProp = key => computed(function() {
  return get(this.constructor, key);
}).readOnly();

const modelName = () => constructorProp('modelName');
const modelClassType = () => constructorProp('modelClassType');

const Model = EmberObject.extend(BaseMixin, {

  _internal: null,

  modelName: modelName(),
  modelClassType: modelClassType()

});

Model.reopenClass({
  modelName: null,
  modelClassType: 'base'
});

export default Model;
