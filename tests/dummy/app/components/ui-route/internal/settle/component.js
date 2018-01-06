import Component from '@ember/component';
import layout from './template';
import { view, filterByType } from 'dummy/models/-computed-remote';

export default Component.extend({
  classNameBindings: [ ':ui-route-internal-settle' ],
  layout,

  authorsLoader: view({ ddoc: 'main', view: 'by-type', key: 'author' }),
  authors: filterByType({ type: 'author', new: false }),

  blogsLoader: view({ ddoc: 'main', view: 'by-type', key: 'blog' }),
  blogs: filterByType({ type: 'blog', new: false }),

});
