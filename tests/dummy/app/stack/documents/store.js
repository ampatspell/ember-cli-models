import Store from 'ember-cli-models/store';
import { property, forward } from './util';

export default Store.extend({

  session: property('session'),

  changes: forward('changes')

});
