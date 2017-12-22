import Database from 'ember-cli-models/database';
import { property, forward } from './util';

export default Database.extend({

  documents: property('documents'),

  changes: forward('changes')

});
