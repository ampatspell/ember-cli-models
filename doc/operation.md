# Operation

* one-shot loader
* paginated loader (recurrent)

``` javascript
// operation
export default EmberObject.extend({

  type: null, // single, recurrent, invoked

  isRunnable: false,
  isRunning:  false,
  isFinished: false,
  isError:    false,
  error:      null,

  invoke() {}, // load
  restart() {}, // reload

});

// operation-instance
export default EmberObject.extend({

});
```

``` javascript
export default Model.extend({

  loader: operation(function(owner, stores) {
    return {
      type: 'single', // single, recurrent, invoked
      owner: [],
      perform() {
        let db = stores.database('remote', 'main');
        return db.find({ ddoc: 'author', view: 'by-id-with-blogs' }).then(() => {
          return {
            state
          };
        });
      },
    };
  }),

  save: operation(function(owner, stores) {
    return {
      perform(args) {

      }
    }
  }),

});
```

``` javascript
let model = this.get('model');
let operation = model.get('save');
await operation.invoke({ ok: true });
```

``` html
{{if model.loader.auto.isRunning}}
  {{model.loader.isRunning}}
{{/if}}
```
