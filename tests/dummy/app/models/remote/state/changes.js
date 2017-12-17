import Model from 'ember-cli-models/model/transient';
import { database } from 'ember-cli-models/model/computed';

export default Model.extend({

  database: database(),

  async start() {
    let changes = this.get('database').changes({ feed: [ 'continuous', 'event-source', 'long-polling' ] });
    this.feed = changes;
    changes.start();
    return this;
  },

  willDestroy() {
    this.feed && this.feed.destroy();
    this._super(...arguments);
  },

});
