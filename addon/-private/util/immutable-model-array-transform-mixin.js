import createTransform from './create-array-transform-mixin';
import ModelsError from './error';

export default createTransform({
  internal() {
    throw new ModelsError({ error: 'internal', reason: 'immutable array' });
  },
  public(internal) {
    return internal && internal.model(true);
  }
});
