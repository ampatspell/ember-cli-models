import { resolve } from 'rsvp';
import Operation from './operation';

export default class FunctionOperation extends Operation {

  constructor(fn, opts) {
    super();
    this.fn = fn;
    this.opts = opts;
  }

  perform() {
    return resolve(this.fn());
  }

}
