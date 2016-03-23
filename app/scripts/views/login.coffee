LoginView = Backbone.View.extend
  className: 'login-view-container'
  template: require('templates/login')
  events: 'click button[type=submit]': 'login'
  render: ->
    @$el.html @template()
    return @
  login: -> console.log('login')

module.exports = LoginView
