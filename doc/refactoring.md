## Structure

* State
* Session
* Author
* Collection
* Roll
* Image

### Models

* Loaded models which are created from payload
* Models created with props, to be saved
* Transient models used only locally _but_ serialized from fastboot server to the client
* Transient models can be long lived or component/route/.. bound, destroyed when parent is destroyed

``` javascript
// models/state.js
export default Model.extend({

  session: model(function() {
    let store = this.get('store');
    return {
      id:   'singleton',
      name: 'session',
      props: { store }
    };
  }),

});

// models/session.js
export default Model.extend({

  store: null,

  session: readOnly('store.database.store.session'),
  isAuthenticated: readOnly('session.isAuthenticated'),
  name: readOnly('session.name'),

  author: model(function() {
    return {
      store: this.get('store'),
      owner: [ 'name' ],
      id() {
        let { name, isAuthenticated } = this.getProperties('name', 'isAuthenticated');
        if(!isAuthenticated) {
          return;
        }
        return `author:${name}`;
      },
      create() {
        if(!this.get('isAuthenticated')) {
          return;
        }
        return {
          name: 'author',
          props: {}
        };
      }
    }
  }),

  async restore() {
    let session = this.get('session');
    await session.restore();
    if(!this.get('isAuthenticated')) {
      return;
    }
    await this.get('author').load();
    return this;
  },

});

// models/author.js
export default Model.extend({

  store: null,
  id: readOnly('storage.id'),

  name: readOnly('storage.name'),

  loader: loader('store', function() {
    return {
      type: 'first',
      store: this.get('store'),
      owner: [ 'id', 'storage.isLoaded' ],
      isLoadable() {
        return !!this.get('id');
      },
      isLoaded() {
        return this.get('storage.isLoaded');
      },
      query() {
        let id = this.get('id');
        return { id };
      }
    }
  })

});
```

### Base

``` javascript
export const state = model(function() {
  return {
    store: getStore('remote'),
    owner: [],
    id() {
      return 'state:singleton';
    },
    create() {
      return {
        name: 'state',
        props: {}
      };
    }
  }
});
```

``` javascript
// routes/application.js
return Route.extend({

  state: state(),

  async model() {
    await this.get('state').restore();
  }
});
```
