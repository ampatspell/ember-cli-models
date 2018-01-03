# Loader

* one-shot loader
* paginated loader

``` javascript
export default Model.extend({

  loader: loader(function(owner, stores) {
    return {
      recurrent: false,
      database: stores.database('remote', 'main'),
      owner: [],
      query(owner, state) { // also array of queries
        return { ddoc: 'author', view: 'by-id-with-blogs' };
      },
      loaded(state_, results) { // recurrent
        return {
          more: false,
          state: { ... }
        }
      }
    };
  })

});
```

``` html
{{#if model.loader.autoload.isLoading}}
  {{model.loader.isLoading}}
{{/if}}

{{#if model.loader.isLoading}}
  {{model.loader.isLoading}}
{{/if}}
```

``` javascript
export default Loader.extend({

  isRecurrent: false,

  state: state(),

  // state
  isLoadable: true,
  isLoaded:  false,
  isLoading: false,
  isMore:    false, // recurrent
  isError:   false,
  error:     null,

  load() {},
  reload() {},

  loadMore() {}, // recurrent

  autoload: autoload(),

});
```

``` javascript
export default Autoload.extend({

  state(),

  // state
  isLoadable: true,
  isLoaded:  false,
  isLoading: false,
  isMore:    false, // recurrent
  isError:   false,
  error:     null,

});
```
