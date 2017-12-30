export default class Internal {

  constructor(context, opts) {
    this.context = context;
    this.opts = opts;
    this.isDestroyed = false;
  }

  destroy() {
    this.isDestroyed = true;
  }

}
