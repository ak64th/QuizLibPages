HomeView = Backbone.View.extend
  className: 'home-view-container'
  template: require('templates/home')
  render: ->
    @$el.html @template()
    return @

module.exports = HomeView
