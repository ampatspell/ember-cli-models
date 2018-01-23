# Computed properties

## stores, store, database

Lookup stack instances by identifiers:

``` javascript
import { stores, store, database } from 'ember-cli-models/computed';

export default EmberObject.extend({

  stores: stores(),
  store: store('remote'),
  database: database('remote', 'main'),

});
```

Lookup current backed model store and database:

``` javascript
import Model from 'ember-cli-models/model/backed';
import { store, database } from 'ember-cli-models/computed';

export default Model.extend({

  store: store(),
  database: database(),

  main: database('main')

});
```

## model

Creates transient model, owned by parent object. Model is destroyed along with parent:

``` javascript
import { model } from 'ember-cli-models/computed';
import { database } from 'ember-cli-models/computed';

export default EmberObject.extend({

  database: database('remote', 'main'),

  beanstalk: model('database', function() {
    return {
      database: this.get('database'),
      name: 'beanstalk',
      props: {
        identifier: 'hello'
      }
    };
  }),

});
```

Extended example:

``` javascript
// models/beanstalk.js
import Model from 'ember-cli-models/model/transient';
import { model } from 'ember-cli-models/computed';
import { getDatabase } from 'ember-cli-models/util';
import { prop, getKey, getValue } from 'ember-cli-models/prop';

export const beanstalk = opts => {
  opts = assign({ identifier: prop('identifier') }, opts);
  return model(getKey(opts.identifier), function() {
    return {
      database: getDatabase('remote', 'main'),
      name: 'beanstalk',
      props: {
        identifier: getValue(this, opts.identifier)
      }
    }
  });
};

export default Model.extend({

  identifier: null

});
```

``` javascript
import { beanstalk } from './models/beanstalk';
import { prop } from 'ember-cli-models/prop';

export default EmberObject.extend({

  identifier: 'hello',

  beanstalk: beanstalk({ identifier: prop('identifier') }),

});
```

## find, filter

Lookups first or all matching models in stores/store/database identity (also any observable array is supported as a source):

Basic example:

``` javascript
export default EmberObject.extend({

  id: 'zeeba',

  person: find('database', function() {
    return {
      source: this.get('database'),
      owner: [ 'id' ],
      model: [ 'id' ],
      matches(model, owner) {
        let { id, modelType } = model.getProperties('id', 'modelType');
        return modelType === 'person' && id === owner.get('id');
      }
    };
  }),

  people: find('database', function() {
    return {
      source: this.get('database'),
      owner: [],
      model: [ 'id' ],
      matches(model, owner) {
        return model.get('modelType') === 'person';
      }
    }
  })

});
```

Find by id example:

``` javascript
export const findById = opts => {
  opts = assign({ id: prop('id'), database: prop('database') }, opts);
  return find(getKey(opts.database), function() {
    let database = getKey(opts.database);
    if(!database) {
      return;
    }

    return {
      database,
      owner: [ getKey(opts.id) ],
      model: [ 'id' ],
      matches(model, owner) {
        return model.get('id') === getValue(this, opts.id);
      }
    }
  });
};
```

## loader

Loads and autoloads models

``` javascript
export default EmberObject.extend({

  id: 'foof',

  database: database('remote', 'main'),

  loader: loader('database', function() {
    return {
      recurrent: false,
      owner: [ 'id' ],
      async perform(state, owner) {
        let database = this.get('database');
        let models = await database.first({ id });
        // useful for { recurrent: true } including pagination
        return {
          isMore: false,
          meta: undefined
        };
      }
    }
  }),

  model: find(function() {
    return {
      owner: [ 'id' ],
      model: [ 'id' ],
      matches(model, owner) {
        return model.get('id') === owner.get('id');
      }
    }
  })

});
```

# Model

## Backed

## Transient

# Stores

# Adapter

## Store
## Database

# Stack

* Register stores
* Register adapter(s)
