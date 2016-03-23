HomeView = require('views/home')
LoginView = require('views/login')

App = Backbone.Router.extend
  container: $('.content-wrapper')
  commands: new Backbone.Wreqr.Commands
  routes:
    "": "home",
    "resetPwd": "resetPassword",
    "accounts": "accountManage",
    "login" : "login",
    'denied': 'denied'
  handlers:
    'forwardBack': 'forwardBack'
  initialize: (options) ->
    @setCommandHandler()
    @setErrorHandler()
  setCommandHandler: ->
    for name, handler of @handlers
      cb = @[handler]
      @commands.setHandler name, cb, @
  setErrorHandler: ->
    self = @
    $.ajaxSetup
      statusCode:
        401: ->
          self.originUrl = window.location
          window.location.replace '/#login'
        403: -> window.location.replace '/#denied'
  forwardBack: ->
    url = @originUrl or ''
    window.location.replace url
  loadView: (view) ->
    if @view
      if @view.close then @view.close() else @view.remove()
    view.commands = @commands
    @view = view
    @container.html ''
    @container.append view.render().$el
  home: -> @loadView new HomeView
  login: -> @loadView new LoginView
  denied: -> console.log 'denied'


module.exports = App
