import ModelMixin from './internal/model-mixin';

export default ModelMixin(class Internal {

  constructor(context, opts) {
    this.context = context;
    this.opts = opts;
    this.isDestroyed = false;
  }

  destroy() {
    this.isDestroyed = true;
  }

});
