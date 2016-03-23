LoginView = require('views/login')

App = Backbone.Router.extend
  container: $('.content-wrapper')
  routes:
    "": "home",
    "resetPwd": "resetPassword",
    "accounts": "accountManage",
    "login" : "login",
    'denied': 'denied',
  setErrorHandler: ->
    $.ajaxSetup
      statusCode:
        401: -> window.location.replace '/#login'
        403: -> window.location.replace '/#denied'
  loadView: (view) ->
    if @view
      if @view.close then @view.close() else @view.remove()
    @view = view
    @container.html ''
    @container.append view.render().$el
  login: -> @loadView new LoginView
  denied: -> console.log 'denied'

module.exports = App
