import Model from 'ember-cli-models/model/transient';
import { model } from 'ember-cli-models/model/computed';
import LifecycleMixin from '../-lifecycle-mixin';

// temporary

export const dummy = () => model((owner, stores) => ({
  database: stores.database('remote', 'main'),
  name: 'dummy'
}));

export default Model.extend(LifecycleMixin, {
});
