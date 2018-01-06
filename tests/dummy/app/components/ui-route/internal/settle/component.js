import Component from '@ember/component';
import layout from './template';
import { view, filterByType } from 'dummy/models/-computed-remote';
import { getStores } from 'ember-cli-models/util';
import { info } from 'ember-cli-models/-private/util/logger';

export default Component.extend({
  classNameBindings: [ ':ui-route-internal-settle' ],
  layout,

  authorsLoader: view({ ddoc: 'main', view: 'by-type', key: 'author' }),
  authors: filterByType({ type: 'author', new: false }),

  blogsLoader: view({ ddoc: 'main', view: 'by-type', key: 'blog' }),
  blogs: filterByType({ type: 'blog', new: false }),

  init() {
    this._super(...arguments);
    let stores = getStores(this);
    stores.settle().then(() => {
      info('authors', this.$('[data-test-authors]').data('test-authors'));
      info('blogs', this.$('[data-test-blogs]').data('test-blogs'));
    });
  }

});
