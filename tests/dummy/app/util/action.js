export const maybeInvokeAction = (target, name, ...args)  => {
  let action = target.get(name);
  if(!action) {
    return;
  }
  return action(...args);
};
