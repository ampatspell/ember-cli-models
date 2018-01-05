import module from '../helpers/module-for-stores';
import { test } from '../helpers/qunit';
import EmberObject from '@ember/object';
import { loader } from 'ember-cli-models/computed';
import { resolve } from 'rsvp';
import { next } from 'ember-cli-models/-private/util/promise';

module('computed-loader', {
  beforeEach() {
    this.log = [];
    let log = this.log;
    this.subject = () => {
      this.register('app:subject', EmberObject.extend({
        id: 'duck',
        loader: loader(function() {
          return {
            recurrent: false,
            owner: [ 'id' ],
            perform() {
              let id = this.get('id');
              log.push(`load ${id}`);
              return next().then(() => {});
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

  await next();

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
