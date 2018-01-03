import State from './state';
import { assign } from '@ember/polyfills';

const defaults = {
  isLoadable: false,
  isLoaded:   false,
  isLoading:  false,
  isMore:     false,
  isError:    false,
  error:      null
};

export const keys = Object.keys(defaults);

export default class LoaderState extends State {

  constructor(state) {
    super();
    assign(this, defaults, state);
  }

  onCreated(changed) {
    this._update({ isDeleted: false }, changed);
  }

  onDeleted(changed) {
    this._update({ isDeleted: true }, changed);
  }

}
