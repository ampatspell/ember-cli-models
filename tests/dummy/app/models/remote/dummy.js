import Model, { model } from 'ember-cli-models/model/transient';
import LifecycleMixin from '../-lifecycle-mixin';

export const dummy = () => model((owner, stores) => ({
  database: stores.database('remote', 'main'),
  name: 'dummy'
}));

export default Model.extend(LifecycleMixin, {
});
