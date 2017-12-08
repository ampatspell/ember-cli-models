import ArrayProxy from '@ember/array/proxy';
import createTransform from '../util/create-array-transform-mixin';
import ModelsError from '../util/error';

const TransformMixin = createTransform({
  internal() {
    throw new ModelsError({ error: 'internal', reason: 'immutable array' });
  },
  public(internal) {
    return internal && internal.model(true);
  }
});

export default ArrayProxy.extend(TransformMixin);
