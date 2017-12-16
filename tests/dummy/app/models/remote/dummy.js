import Model, { database } from 'ember-cli-models/model/transient';
import createTransientModel from 'ember-cli-models/-private/computed/transient-model';
import LifecycleMixin from '../-lifecycle-mixin';

export const dummy = () => createTransientModel((owner, stores) => ({
  database: stores.database('remote', 'main'),
  name: 'dummy'
}));

export default Model.extend(LifecycleMixin, {
});
