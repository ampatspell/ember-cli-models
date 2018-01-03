# Loader

* one-shot loader
* paginated loader (recurrent)

``` javascript
export default Model.extend({

  loader: loader(function(owner, stores) {
    return {
      recurrent: false,
      owner: [],
      perform(state) {
        let db = stores.database('remote', 'main');
        return db.find({ ddoc: 'author', view: 'by-id-with-blogs' }).then(docs => {
          return {
            state: { ... }
          };
        });
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
