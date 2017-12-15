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
      return {
        name: 'state/changes',
        store: 'remote', // or null if database is provided
        database: 'main', // or state.get('database')
        props: {
          state
        };
      }
    }
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
