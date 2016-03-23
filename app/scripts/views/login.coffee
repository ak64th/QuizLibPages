LoginView = Backbone.View.extend
  className: 'login-view-container'
  template: require('templates/login')
  events: 'click button[type=submit]': 'login'
  render: ->
    @$el.html @template()
    return @
  login: (e) ->
    e.preventDefault()
    data = Backbone.Syphon.serialize(this);
    # Todo: send ajax request
    console.log data
    cb = _.bind (-> @commands.execute('forwardBack')), @
    setTimeout(cb, 1000)

module.exports = LoginView
