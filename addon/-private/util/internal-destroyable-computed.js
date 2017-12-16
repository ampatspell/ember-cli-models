import destroyable from './destroyable-computed';

export default (...args) => {
  let fn = args.pop();
  return destroyable(...args, {
    create() {
      return fn.call(this, ...arguments);
    },
    get(internal) {
      return internal.model(true);
    },
    destroy(internal) {
      internal.destroy();
    }
  })
}
