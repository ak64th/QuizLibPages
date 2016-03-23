UIMixin = require('ui-mixin')
App = require('app')

app = new App
_.extend app, UIMixin

$ ->
  app.layout.activate()
  app.pushMenu.activate()
  app.tree()
  Backbone.history.start()
