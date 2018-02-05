const noop = () => {};

const context = (internal, skip, notify=true) => {
  let model;
  let changed = noop;
  if(notify) {
    model = internal.model(false);
    if(model) {
      let properties = [];
      changed = key => {
        if(!properties.includes(key)) {
          properties.push(key);
        }
        if(skip && skip.includes(key)) {
          return;
        }
        model.notifyPropertyChange(key);
      };
      changed.properties = properties;
    }
  }
  return { model, changed };
};

export default (internal, notify, cb, skip) => {
  let { model, changed } = context(internal, skip, notify);

  if(model) {
    model.beginPropertyChanges();
  }

  cb(changed);

  if(model) {
    model.endPropertyChanges();
  }
};
