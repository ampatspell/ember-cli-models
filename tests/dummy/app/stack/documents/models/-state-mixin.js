import Mixin from '@ember/object/mixin';
import { readOnly } from '@ember/object/computed';

let keys = [ 'isNew', 'isLoading', 'isLoaded', 'isDirty', 'isSaving', 'isDeleted', 'isError', 'error' ];

let make = key => readOnly(`storage.${key}`);

let props = {};
keys.forEach(key => props[key] = make(key));

export default Mixin.create(props);
