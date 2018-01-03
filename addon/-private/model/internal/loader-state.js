import State from './state';
import { assign } from '@ember/polyfills';

const defaults = {
  isLoaded:   false,
  isLoading:  false,
  isMore:     false,
  isError:    false,
  error:      null
};

const aliases = [ 'isLoadable' ];

export const keys = [ ...Object.keys(defaults), ...aliases ];

export default class LoaderState extends State {

  constructor(loader, state) {
    super();
    this._loader = loader;
    assign(this, defaults, state);
  }

  get isLoadable() {
    return true;
  }

  onCreated(changed) {
    this._update({ isDeleted: false }, changed);
  }

  onDeleted(changed) {
    this._update({ isDeleted: true }, changed);
  }

}
