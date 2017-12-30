import Internal from './internal';
import ModelMixin from './internal/model-mixin';

export default class InternalModel extends ModelMixin(Internal) {

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

  modelWillDestroyPermanently() {
    this.context.internalModelManager._internalModelWillDestroy(this, true);
  }

}
