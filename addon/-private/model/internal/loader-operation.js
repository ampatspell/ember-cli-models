import Operation from '../../util/operation/operation';

export default class LoaderOperation extends Operation {

  constructor(loader, type) {
    super();
    this.type = type;
    this.loader = loader;
  }

  perform() {
    let opts = this.loader.opts;
    let { object } = opts.owner;
    let { state, perform } = opts.operation;
    return perform(state, object);
  }

}
