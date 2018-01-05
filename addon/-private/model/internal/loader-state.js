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

  constructor(loader) {
    super();
    this._loader = loader;
    assign(this, defaults);
  }

  get isLoadable() {
    return true;
    // return this._loader.isLoadable;
  }

  onLoadScheduled(changed) {
    this._update({ isLoading: true }, changed);
  }

  onLoading(changed) {
    this._update({
      isLoading: true,
      isError: false,
      error: null
    }, changed);
  }

  onLoaded(changed, isMore) {
    this._update({
      isLoading: false,
      isLoaded: true,
      isError: false,
      error: null,
      isMore
     }, changed);
  }

  onError(changed, error) {
    this._update({
      isLoading: false,
      isError: true,
      error
     }, changed);
  }

  toJSON() {
    return keys.reduce((json, key) => {
      json[key] = this[key];
      return json;
    }, {});
  }

}
