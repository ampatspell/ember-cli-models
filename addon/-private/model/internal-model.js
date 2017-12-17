import Internal from './internal';

export default class InternalModel extends Internal {

  get database() {
    return this.context.owner;
  }

  get store() {
    return this.database.store;
  }

  get stores() {
    return this.store.stores;
  }

  __createModel() {
    return this.context.modelFactory.createModel(this, ...arguments);
  }

  modelWillDestroyWithRecreate(recreate) {
    this.context.internalModelManager._internalModelWillDestroy(this, !recreate);
  }

}
