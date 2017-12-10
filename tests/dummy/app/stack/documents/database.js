import Database from 'ember-cli-models/database';
import { forward } from './util';

export default Database.extend({

  changes: forward('changes')

});
