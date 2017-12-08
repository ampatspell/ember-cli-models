import ArrayProxy from '@ember/array/proxy';
import TransformMixin from '../util/immutable-model-array-transform-mixin';
import createArrayUnify from '../util/create-array-unify-mixin';

const UnifyMixin = createArrayUnify({
  root: {
    array: '_context.databases.all',
    key: '_context.internalModelIdentity._identity.all'
  },
  content: 'content'
});

export default ArrayProxy.extend(UnifyMixin, TransformMixin, {

  _context: null

});
