import State from './state';

export default class BackedModelState extends State {

  constructor() {
    super();
    this.isDeleted = false;
  }

  onCreated(changed) {
    this._update({ isDeleted: false }, changed);
  }

  onDeleted(changed) {
    this._update({ isDeleted: true }, changed);
  }

}
