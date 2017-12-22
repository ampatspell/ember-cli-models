const maybeRegister = (app, adapterName, modelName, factory) => {
  if(!factory) {
    return;
  }
  app.register(`models:stack/${adapterName}/${modelName}`, factory);
};

export const registerStack = (app, name, object) => {
  let { Stores, Store, Database, StoreAdapter, DatabaseAdapter } = object;

  maybeRegister(app, name, 'stores',           Stores);
  maybeRegister(app, name, 'store',            Store);
  maybeRegister(app, name, 'database',         Database);
  maybeRegister(app, name, 'store/adapter',    StoreAdapter);
  maybeRegister(app, name, 'database/adapter', DatabaseAdapter);
};

export const makeRegisterStackInitializer = (name, object) => {
  return app => registerStack(app, name, object);
};
