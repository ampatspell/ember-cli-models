import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

  this.route('authors', function() {
    this.route('new');
    this.route('author', { path: '/:author_id' }, function() {
      this.route('edit');
    });
  });

  this.route('wip');

});

export default Router;
