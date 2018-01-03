# Loader

* one-shot loader
* paginated loader

``` javascript
export default Model.extend({

  loader: loader(function(owner, stores) {
    return {
      database: stores.database('remote', 'main'),
      owner: [],
      query(owner, state) { // also multiple queries
        return { ddoc: 'author', view: 'by-id-with-blogs' };
      },
      loaded(state_, results) { // paginated
        return {
          isMore: false,
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

* isPaginated

* isLoaded
* isLoading
* isMore (paginated)

* load()
* loadMore() (paginated)
* reload()
