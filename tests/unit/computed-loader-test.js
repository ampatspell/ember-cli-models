import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import EmberObject from '@ember/object';
import { loader } from 'ember-cli-models/computed';
import { resolve } from 'rsvp';

module('computed-loader', {
  beforeEach() {
    let ctx = this;
    this.load = () => {
      console.log('test load');
      return resolve();
    };
    this.subject = () => {
      this.register('app:subject', EmberObject.extend({
        loader: loader(function() {
          return {
            recurrent: false,
            owner: [],
            perform() {
              return ctx.load();
            }
          };
        })
      }));
      return this.lookup('app:subject');
    };
  }
});

test('it exists', function(assert) {
  let subject = this.subject();
  let loader = subject.get('loader');
  assert.ok(loader);
});

test('load state', async function(assert) {
  let subject = this.subject();
  let loader = subject.get('loader');

  assert.deepEqual(loader.get('state'), {
    "error": null,
    "isError": false,
    "isLoadable": true,
    "isLoaded": false,
    "isLoading": false,
    "isMore": false
  });

  let promise = loader.load();

  assert.deepEqual(loader.get('state'), {
    "error": null,
    "isError": false,
    "isLoadable": true,
    "isLoaded": false,
    "isLoading": true,
    "isMore": false
  });

  await promise;

  assert.deepEqual(loader.get('state'), {
    "error": null,
    "isError": false,
    "isLoadable": true,
    "isLoaded": true,
    "isLoading": false,
    "isMore": false
  });
});
