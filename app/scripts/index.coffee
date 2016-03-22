UIMixin = require('./ui-mixin')

app = {}
_.extend(app, UIMixin);

$ ->
  app.layout.activate()
  app.pushMenu.activate()
  app.tree()
