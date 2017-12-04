import { getOwner } from '@ember/application';

export default (owner, name) => getOwner(owner).factoryFor(name);
