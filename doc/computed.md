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
  changes: model('database', function() {
    let database = this.get('database');

    let name = 'state/changes';
    let props = {
      state: this
    };

    return {
      database,
      name,
      props
    }
  }),

});
```

``` javascript
new TransientInternalModel(context, 'state/changes', { state });
```

## Create transient models

* create based on array
* destroy removed
* requires database where each model should be created

``` javascript
// create transient models
export default Model.extend({

  blogs: null, // array

  // transient models array proxy
  blogModels: models('blogs', 'database', function() {
    let { blogs: source, database } = this.getProperties('blogs', 'database');

    let name = 'state/blogs';
    let props = { parent: this };

    return {
      source,
      database,
      name,
      props
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
  blog: model('database', function() {
    let database = this.get('database');
    return {
      database,
      owner: [ 'id' ],
      model: [ 'id' ],
      matches(model, owner) {
        return owner.get('id') === model.get('id');
      }
    };
  })

});
```

``` javascript
stores.get('identity.firstObject') // => <dummy@models:model/remote/state::ember586>
stores.store('remote').get('identity.firstObject') // => <dummy@models:model/remote/state::ember586>
stores.store('remote').database('main').get('identity.firstObject') // => <dummy@models:model/remote/state::ember586>
```
