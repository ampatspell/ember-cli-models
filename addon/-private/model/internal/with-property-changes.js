const noop = () => {};

const context = (internal, notify=true) => {
  let model;
  let changed = noop;
  if(notify) {
    model = internal.model(false);
    if(model) {
      changed = key => model.notifyPropertyChange(key);
    }
  }
  return { model, changed };
};

export default (internal, notify, cb) => {
  let { model, changed } = context(internal, notify);

  if(model) {
    model.beginPropertyChanges();
  }

  cb(changed);

  if(model) {
    model.endPropertyChanges();
  }
};
