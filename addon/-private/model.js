import EmberObject from '@ember/object';

const Model = EmberObject.extend({

  _internal: null,

  willDestroy() {
    this._internal.modelWillDestroy();
    this._super();
  }

});

Model.reopenClass({
  modelName: null
});

export default Model;
