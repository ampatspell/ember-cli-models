* create transient model
* create array of transient models
* lookup single backed model
* lookup array of backed models

## Create transient

* owner destroys
* requires database where model should be created

``` javascript
// create transient model
export default Model.extend({

  database: database('remote', 'main'),

  // transient-model
  changes: model({
    owner: [ 'database' ],
    create(state) {
      let database = state.get('database');
      return {
        database,
        name: 'state/changes',
        props: {
          state
        };
      }
    }
  })

});
```

## Create transient models

``` javascript
// create transient models
export default Model.extend({

  blogs: null, // array

  // transient-models
  wrappedBlogs: models({

  })

});
```

## Lookup backed

``` javascript
// lookup backed model
export default Model.extend({

  id: 'thing:foo',

  // filter-first
  blog: model({
    source: {
      owner: [ 'database' ],
      array(owner) {
        return owner.get('database.identity');
      }
    },
    filter: {
      owner: [ 'id' ],
      model: [ 'id' ],
      matches(model, owner) {
        return owner.get('id') === model.get('id');
      }
    },
  })

});
```

``` javascript
stores.get('identity.firstObject') // => <dummy@models:model/remote/state::ember586>
stores.store('remote').get('identity.firstObject') // => <dummy@models:model/remote/state::ember586>
stores.store('remote').database('main').get('identity.firstObject') // => <dummy@models:model/remote/state::ember586>
```
