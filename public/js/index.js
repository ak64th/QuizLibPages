(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App, UIMixin, app;

UIMixin = require('ui-mixin');

App = require('app');

app = new App;

_.extend(app, UIMixin);

$(function() {
  app.layout.activate();
  app.pushMenu.activate();
  app.tree();
  return Backbone.history.start();
});


},{"app":3,"ui-mixin":4}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
var App, HomeView, LoginView;

HomeView = require('views/home');

LoginView = require('views/login');

App = Backbone.Router.extend({
  container: $('.content-wrapper'),
  commands: new Backbone.Wreqr.Commands,
  routes: {
    "": "home",
    "resetPwd": "resetPassword",
    "accounts": "accountManage",
    "login": "login",
    'denied': 'denied'
  },
  handlers: {
    'forwardBack': 'forwardBack'
  },
  initialize: function(options) {
    this.setCommandHandler();
    return this.setErrorHandler();
  },
  setCommandHandler: function() {
    var cb, handler, name, ref, results;
    ref = this.handlers;
    results = [];
    for (name in ref) {
      handler = ref[name];
      cb = this[handler];
      results.push(this.commands.setHandler(name, cb, this));
    }
    return results;
  },
  setErrorHandler: function() {
    var self;
    self = this;
    return $.ajaxSetup({
      statusCode: {
        401: function() {
          self.originUrl = window.location;
          return window.location.replace('/#login');
        },
        403: function() {
          return window.location.replace('/#denied');
        }
      }
    });
  },
  forwardBack: function() {
    var url;
    url = this.originUrl || '';
    return window.location.replace(url);
  },
  loadView: function(view) {
    if (this.view) {
      if (this.view.close) {
        this.view.close();
      } else {
        this.view.remove();
      }
    }
    view.commands = this.commands;
    this.view = view;
    this.container.html('');
    return this.container.append(view.render().$el);
  },
  home: function() {
    return this.loadView(new HomeView);
  },
  login: function() {
    return this.loadView(new LoginView);
  },
  denied: function() {
    return console.log('denied');
  }
});

module.exports = App;


},{"views/home":5,"views/login":6}],4:[function(require,module,exports){
module.exports = {
  layout: {
    activate: function() {
      var self;
      self = this;
      self.fix();
      return $(window, ".wrapper").resize(function() {
        return self.fix();
      });
    },
    fix: function() {
      var neg, sidebar_height, window_height;
      neg = $(".main-header").outerHeight() + $(".main-footer").outerHeight();
      window_height = $(window).height();
      sidebar_height = $(".sidebar").height();
      if (window_height >= sidebar_height) {
        return $(".content-wrapper").css("min-height", window_height - neg);
      } else {
        return $(".content-wrapper").css("min-height", sidebar_height);
      }
    }
  },
  pushMenu: {
    activate: function() {
      $('#collapseToggle').on("click", function(e) {
        e.preventDefault();
        if ($(window).width() > (768 - 1)) {
          if ($("body").hasClass("sidebar-collapse")) {
            return $("body").removeClass("sidebar-collapse");
          } else {
            return $("body").addClass("sidebar-collapse");
          }
        } else {
          if ($("body").hasClass("sidebar-open")) {
            return $("body").removeClass("sidebar-open").removeClass("sidebar-collapse");
          } else {
            return $("body").addClass("sidebar-open");
          }
        }
      });
      return $(".content-wrapper").click(function() {
        if ($(window).width() <= (768 - 1) && $("body").hasClass("sidebar-open")) {
          return $("body").removeClass("sidebar-open");
        }
      });
    }
  },
  tree: function() {
    var animationSpeed, self;
    self = this;
    animationSpeed = 500;
    return $('body').on("click", ".sidebar li a", function(e) {
      var $this, checkElement, parent, parent_li, ul;
      $this = $(this);
      checkElement = $this.next();
      if ((checkElement.is(".treeview-menu")) && (checkElement.is(":visible"))) {
        checkElement.slideUp(animationSpeed, function() {
          return checkElement.removeClass("menu-open");
        });
        self.layout.fix();
        checkElement.parent("li").removeClass("active");
      } else if (checkElement.is(".treeview-menu")) {
        parent = $this.parents("ul").first();
        ul = parent.find("ul:visible").slideUp(animationSpeed);
        ul.removeClass("menu-open");
        parent_li = $this.parent("li");
        checkElement.slideDown(animationSpeed, function() {
          checkElement.addClass("menu-open");
          parent.find("li.active").removeClass("active");
          parent_li.addClass("active");
          return self.layout.fix();
        });
      }
      if (checkElement.is(".treeview-menu")) {
        return e.preventDefault();
      }
    });
  }
};


},{}],5:[function(require,module,exports){
var HomeView;

HomeView = Backbone.View.extend({
  className: 'home-view-container',
  template: require('templates/home'),
  render: function() {
    this.$el.html(this.template());
    return this;
  }
});

module.exports = HomeView;


},{"templates/home":7}],6:[function(require,module,exports){
var LoginView;

LoginView = Backbone.View.extend({
  className: 'login-view-container',
  template: require('templates/login'),
  events: {
    'click button[type=submit]': 'login'
  },
  render: function() {
    this.$el.html(this.template());
    return this;
  },
  login: function(e) {
    var cb, data;
    e.preventDefault();
    data = Backbone.Syphon.serialize(this);
    console.log(data);
    cb = _.bind((function() {
      return this.commands.execute('forwardBack');
    }), this);
    return setTimeout(cb, 1000);
  }
});

module.exports = LoginView;


},{"templates/login":8}],7:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<section class=\"content-header\"><h1>欢迎</h1></section><section class=\"content\"><div class=\"row col-xs-12\"><p>| 欢迎使用题库管理系统，点击左侧边栏跳转到指定功能</p></div></section>");;return buf.join("");
};
},{"jade/runtime":9}],8:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<section class=\"content-header\"><h1>登陆</h1></section><section class=\"content\"><div class=\"row col-xs-12 col-sm-6\"><p class=\"login-box-msg\">请登陆</p><form><div class=\"form-group has-feedback\"><input placeholder=\"帐号\" type=\"text\" name=\"username\" class=\"form-control\"/><span class=\"glyphicon glyphicon-user form-control-feedback\"></span></div><div class=\"form-group has-feedback\"><input placeholder=\"密码\" type=\"password\" name=\"password\" class=\"form-control\"/><span class=\"glyphicon glyphicon-lock form-control-feedback\"></span></div><div class=\"row\"><div class=\"col-xs-6 col-md-4\"><button type=\"submit\" class=\"btn btn-primary btn-block\">登陆</button></div><div class=\"col-xs-6 col-md-4\"><button type=\"reset\" class=\"btn btn-warning btn-block\">重置</button></div></div></form></div></section>");;return buf.join("");
};
},{"jade/runtime":9}],9:[function(require,module,exports){
(function (global){
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jade = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = merge(attrs, a[i]);
    }
    return attrs;
  }
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {
  return (Array.isArray(val) ? val.map(joinClasses) :
    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
    [val]).filter(nulls).join(' ');
}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {
  var buf = [];
  for (var i = 0; i < classes.length; i++) {
    if (escaped && escaped[i]) {
      buf.push(exports.escape(joinClasses([classes[i]])));
    } else {
      buf.push(joinClasses(classes[i]));
    }
  }
  var text = joinClasses(buf);
  if (text.length) {
    return ' class="' + text + '"';
  } else {
    return '';
  }
};


exports.style = function (val) {
  if (val && typeof val === 'object') {
    return Object.keys(val).map(function (style) {
      return style + ':' + val[style];
    }).join(';');
  } else {
    return val;
  }
};
/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {
  if (key === 'style') {
    val = exports.style(val);
  }
  if ('boolean' == typeof val || null == val) {
    if (val) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    } else {
      return '';
    }
  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
    if (JSON.stringify(val).indexOf('&') !== -1) {
      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                   'will be escaped to `&amp;`');
    };
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will eliminate the double quotes around dates in ' +
                   'ISO form after 2.0.0');
    }
    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
  } else if (escaped) {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + exports.escape(val) + '"';
  } else {
    if (val && typeof val.toISOString === 'function') {
      console.warn('Jade will stringify dates in ISO form after 2.0.0');
    }
    return ' ' + key + '="' + val + '"';
  }
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){
  var buf = [];

  var keys = Object.keys(obj);

  if (keys.length) {
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('class' == key) {
        if (val = joinClasses(val)) {
          buf.push(' ' + key + '="' + val + '"');
        }
      } else {
        buf.push(exports.attr(key, val, false, terse));
      }
    }
  }

  return buf.join('');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var jade_encode_html_rules = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
};
var jade_match_html = /[&<>"]/g;

function jade_encode_char(c) {
  return jade_encode_html_rules[c] || c;
}

exports.escape = jade_escape;
function jade_escape(html){
  var result = String(html).replace(jade_match_html, jade_encode_char);
  if (result === '' + html) return html;
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || require('fs').readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

exports.DebugItem = function DebugItem(lineno, filename) {
  this.lineno = lineno;
  this.filename = filename;
}

},{"fs":2}],2:[function(require,module,exports){

},{}]},{},[1])(1)
});
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"fs":2}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2VsbWVyeS9QeWNoYXJtUHJvamVjdHMvUXVpekxpYlBhZ2VzL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9lbG1lcnkvUHljaGFybVByb2plY3RzL1F1aXpMaWJQYWdlcy9hcHAvc2NyaXB0cy9pbmRleC5jb2ZmZWUiLCIvaG9tZS9lbG1lcnkvUHljaGFybVByb2plY3RzL1F1aXpMaWJQYWdlcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwiYXBwL3NjcmlwdHMvYXBwLmNvZmZlZSIsImFwcC9zY3JpcHRzL3VpLW1peGluLmNvZmZlZSIsImFwcC9zY3JpcHRzL3ZpZXdzL2hvbWUuY29mZmVlIiwiYXBwL3NjcmlwdHMvdmlld3MvbG9naW4uY29mZmVlIiwiYXBwL3RlbXBsYXRlcy9ob21lLmphZGUiLCJhcHAvdGVtcGxhdGVzL2xvZ2luLmphZGUiLCJub2RlX21vZHVsZXMvamFkZS9ydW50aW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQXBwLCBVSU1peGluLCBhcHA7XG5cblVJTWl4aW4gPSByZXF1aXJlKCd1aS1taXhpbicpO1xuXG5BcHAgPSByZXF1aXJlKCdhcHAnKTtcblxuYXBwID0gbmV3IEFwcDtcblxuXy5leHRlbmQoYXBwLCBVSU1peGluKTtcblxuJChmdW5jdGlvbigpIHtcbiAgYXBwLmxheW91dC5hY3RpdmF0ZSgpO1xuICBhcHAucHVzaE1lbnUuYWN0aXZhdGUoKTtcbiAgYXBwLnRyZWUoKTtcbiAgcmV0dXJuIEJhY2tib25lLmhpc3Rvcnkuc3RhcnQoKTtcbn0pO1xuXG4iLG51bGwsInZhciBBcHAsIEhvbWVWaWV3LCBMb2dpblZpZXc7XG5cbkhvbWVWaWV3ID0gcmVxdWlyZSgndmlld3MvaG9tZScpO1xuXG5Mb2dpblZpZXcgPSByZXF1aXJlKCd2aWV3cy9sb2dpbicpO1xuXG5BcHAgPSBCYWNrYm9uZS5Sb3V0ZXIuZXh0ZW5kKHtcbiAgY29udGFpbmVyOiAkKCcuY29udGVudC13cmFwcGVyJyksXG4gIGNvbW1hbmRzOiBuZXcgQmFja2JvbmUuV3JlcXIuQ29tbWFuZHMsXG4gIHJvdXRlczoge1xuICAgIFwiXCI6IFwiaG9tZVwiLFxuICAgIFwicmVzZXRQd2RcIjogXCJyZXNldFBhc3N3b3JkXCIsXG4gICAgXCJhY2NvdW50c1wiOiBcImFjY291bnRNYW5hZ2VcIixcbiAgICBcImxvZ2luXCI6IFwibG9naW5cIixcbiAgICAnZGVuaWVkJzogJ2RlbmllZCdcbiAgfSxcbiAgaGFuZGxlcnM6IHtcbiAgICAnZm9yd2FyZEJhY2snOiAnZm9yd2FyZEJhY2snXG4gIH0sXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB0aGlzLnNldENvbW1hbmRIYW5kbGVyKCk7XG4gICAgcmV0dXJuIHRoaXMuc2V0RXJyb3JIYW5kbGVyKCk7XG4gIH0sXG4gIHNldENvbW1hbmRIYW5kbGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2IsIGhhbmRsZXIsIG5hbWUsIHJlZiwgcmVzdWx0cztcbiAgICByZWYgPSB0aGlzLmhhbmRsZXJzO1xuICAgIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKG5hbWUgaW4gcmVmKSB7XG4gICAgICBoYW5kbGVyID0gcmVmW25hbWVdO1xuICAgICAgY2IgPSB0aGlzW2hhbmRsZXJdO1xuICAgICAgcmVzdWx0cy5wdXNoKHRoaXMuY29tbWFuZHMuc2V0SGFuZGxlcihuYW1lLCBjYiwgdGhpcykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSxcbiAgc2V0RXJyb3JIYW5kbGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZjtcbiAgICBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gJC5hamF4U2V0dXAoe1xuICAgICAgc3RhdHVzQ29kZToge1xuICAgICAgICA0MDE6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYub3JpZ2luVXJsID0gd2luZG93LmxvY2F0aW9uO1xuICAgICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSgnLyNsb2dpbicpO1xuICAgICAgICB9LFxuICAgICAgICA0MDM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucmVwbGFjZSgnLyNkZW5pZWQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICBmb3J3YXJkQmFjazogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHVybDtcbiAgICB1cmwgPSB0aGlzLm9yaWdpblVybCB8fCAnJztcbiAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnJlcGxhY2UodXJsKTtcbiAgfSxcbiAgbG9hZFZpZXc6IGZ1bmN0aW9uKHZpZXcpIHtcbiAgICBpZiAodGhpcy52aWV3KSB7XG4gICAgICBpZiAodGhpcy52aWV3LmNsb3NlKSB7XG4gICAgICAgIHRoaXMudmlldy5jbG9zZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52aWV3LnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICB2aWV3LmNvbW1hbmRzID0gdGhpcy5jb21tYW5kcztcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xuICAgIHRoaXMuY29udGFpbmVyLmh0bWwoJycpO1xuICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5hcHBlbmQodmlldy5yZW5kZXIoKS4kZWwpO1xuICB9LFxuICBob21lOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5sb2FkVmlldyhuZXcgSG9tZVZpZXcpO1xuICB9LFxuICBsb2dpbjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMubG9hZFZpZXcobmV3IExvZ2luVmlldyk7XG4gIH0sXG4gIGRlbmllZDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNvbnNvbGUubG9nKCdkZW5pZWQnKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwO1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgbGF5b3V0OiB7XG4gICAgYWN0aXZhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGY7XG4gICAgICBzZWxmID0gdGhpcztcbiAgICAgIHNlbGYuZml4KCk7XG4gICAgICByZXR1cm4gJCh3aW5kb3csIFwiLndyYXBwZXJcIikucmVzaXplKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc2VsZi5maXgoKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZml4OiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBuZWcsIHNpZGViYXJfaGVpZ2h0LCB3aW5kb3dfaGVpZ2h0O1xuICAgICAgbmVnID0gJChcIi5tYWluLWhlYWRlclwiKS5vdXRlckhlaWdodCgpICsgJChcIi5tYWluLWZvb3RlclwiKS5vdXRlckhlaWdodCgpO1xuICAgICAgd2luZG93X2hlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgIHNpZGViYXJfaGVpZ2h0ID0gJChcIi5zaWRlYmFyXCIpLmhlaWdodCgpO1xuICAgICAgaWYgKHdpbmRvd19oZWlnaHQgPj0gc2lkZWJhcl9oZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuICQoXCIuY29udGVudC13cmFwcGVyXCIpLmNzcyhcIm1pbi1oZWlnaHRcIiwgd2luZG93X2hlaWdodCAtIG5lZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJChcIi5jb250ZW50LXdyYXBwZXJcIikuY3NzKFwibWluLWhlaWdodFwiLCBzaWRlYmFyX2hlaWdodCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBwdXNoTWVudToge1xuICAgIGFjdGl2YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICQoJyNjb2xsYXBzZVRvZ2dsZScpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+ICg3NjggLSAxKSkge1xuICAgICAgICAgIGlmICgkKFwiYm9keVwiKS5oYXNDbGFzcyhcInNpZGViYXItY29sbGFwc2VcIikpIHtcbiAgICAgICAgICAgIHJldHVybiAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcInNpZGViYXItY29sbGFwc2VcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAkKFwiYm9keVwiKS5hZGRDbGFzcyhcInNpZGViYXItY29sbGFwc2VcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICgkKFwiYm9keVwiKS5oYXNDbGFzcyhcInNpZGViYXItb3BlblwiKSkge1xuICAgICAgICAgICAgcmV0dXJuICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwic2lkZWJhci1vcGVuXCIpLnJlbW92ZUNsYXNzKFwic2lkZWJhci1jb2xsYXBzZVwiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICQoXCJib2R5XCIpLmFkZENsYXNzKFwic2lkZWJhci1vcGVuXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gJChcIi5jb250ZW50LXdyYXBwZXJcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSAoNzY4IC0gMSkgJiYgJChcImJvZHlcIikuaGFzQ2xhc3MoXCJzaWRlYmFyLW9wZW5cIikpIHtcbiAgICAgICAgICByZXR1cm4gJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJzaWRlYmFyLW9wZW5cIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgdHJlZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFuaW1hdGlvblNwZWVkLCBzZWxmO1xuICAgIHNlbGYgPSB0aGlzO1xuICAgIGFuaW1hdGlvblNwZWVkID0gNTAwO1xuICAgIHJldHVybiAkKCdib2R5Jykub24oXCJjbGlja1wiLCBcIi5zaWRlYmFyIGxpIGFcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgdmFyICR0aGlzLCBjaGVja0VsZW1lbnQsIHBhcmVudCwgcGFyZW50X2xpLCB1bDtcbiAgICAgICR0aGlzID0gJCh0aGlzKTtcbiAgICAgIGNoZWNrRWxlbWVudCA9ICR0aGlzLm5leHQoKTtcbiAgICAgIGlmICgoY2hlY2tFbGVtZW50LmlzKFwiLnRyZWV2aWV3LW1lbnVcIikpICYmIChjaGVja0VsZW1lbnQuaXMoXCI6dmlzaWJsZVwiKSkpIHtcbiAgICAgICAgY2hlY2tFbGVtZW50LnNsaWRlVXAoYW5pbWF0aW9uU3BlZWQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBjaGVja0VsZW1lbnQucmVtb3ZlQ2xhc3MoXCJtZW51LW9wZW5cIik7XG4gICAgICAgIH0pO1xuICAgICAgICBzZWxmLmxheW91dC5maXgoKTtcbiAgICAgICAgY2hlY2tFbGVtZW50LnBhcmVudChcImxpXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgfSBlbHNlIGlmIChjaGVja0VsZW1lbnQuaXMoXCIudHJlZXZpZXctbWVudVwiKSkge1xuICAgICAgICBwYXJlbnQgPSAkdGhpcy5wYXJlbnRzKFwidWxcIikuZmlyc3QoKTtcbiAgICAgICAgdWwgPSBwYXJlbnQuZmluZChcInVsOnZpc2libGVcIikuc2xpZGVVcChhbmltYXRpb25TcGVlZCk7XG4gICAgICAgIHVsLnJlbW92ZUNsYXNzKFwibWVudS1vcGVuXCIpO1xuICAgICAgICBwYXJlbnRfbGkgPSAkdGhpcy5wYXJlbnQoXCJsaVwiKTtcbiAgICAgICAgY2hlY2tFbGVtZW50LnNsaWRlRG93bihhbmltYXRpb25TcGVlZCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2hlY2tFbGVtZW50LmFkZENsYXNzKFwibWVudS1vcGVuXCIpO1xuICAgICAgICAgIHBhcmVudC5maW5kKFwibGkuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAgIHBhcmVudF9saS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgICByZXR1cm4gc2VsZi5sYXlvdXQuZml4KCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGNoZWNrRWxlbWVudC5pcyhcIi50cmVldmlldy1tZW51XCIpKSB7XG4gICAgICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbiIsInZhciBIb21lVmlldztcblxuSG9tZVZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gIGNsYXNzTmFtZTogJ2hvbWUtdmlldy1jb250YWluZXInLFxuICB0ZW1wbGF0ZTogcmVxdWlyZSgndGVtcGxhdGVzL2hvbWUnKSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhvbWVWaWV3O1xuXG4iLCJ2YXIgTG9naW5WaWV3O1xuXG5Mb2dpblZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gIGNsYXNzTmFtZTogJ2xvZ2luLXZpZXctY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJ3RlbXBsYXRlcy9sb2dpbicpLFxuICBldmVudHM6IHtcbiAgICAnY2xpY2sgYnV0dG9uW3R5cGU9c3VibWl0XSc6ICdsb2dpbidcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIGxvZ2luOiBmdW5jdGlvbihlKSB7XG4gICAgdmFyIGNiLCBkYXRhO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBkYXRhID0gQmFja2JvbmUuU3lwaG9uLnNlcmlhbGl6ZSh0aGlzKTtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICBjYiA9IF8uYmluZCgoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb21tYW5kcy5leGVjdXRlKCdmb3J3YXJkQmFjaycpO1xuICAgIH0pLCB0aGlzKTtcbiAgICByZXR1cm4gc2V0VGltZW91dChjYiwgMTAwMCk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvZ2luVmlldztcblxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPHNlY3Rpb24gY2xhc3M9XFxcImNvbnRlbnQtaGVhZGVyXFxcIj48aDE+5qyi6L+OPC9oMT48L3NlY3Rpb24+PHNlY3Rpb24gY2xhc3M9XFxcImNvbnRlbnRcXFwiPjxkaXYgY2xhc3M9XFxcInJvdyBjb2wteHMtMTJcXFwiPjxwPnwg5qyi6L+O5L2/55So6aKY5bqT566h55CG57O757uf77yM54K55Ye75bem5L6n6L655qCP6Lez6L2s5Yiw5oyH5a6a5Yqf6IO9PC9wPjwvZGl2Pjwvc2VjdGlvbj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPHNlY3Rpb24gY2xhc3M9XFxcImNvbnRlbnQtaGVhZGVyXFxcIj48aDE+55m76ZmGPC9oMT48L3NlY3Rpb24+PHNlY3Rpb24gY2xhc3M9XFxcImNvbnRlbnRcXFwiPjxkaXYgY2xhc3M9XFxcInJvdyBjb2wteHMtMTIgY29sLXNtLTZcXFwiPjxwIGNsYXNzPVxcXCJsb2dpbi1ib3gtbXNnXFxcIj7or7fnmbvpmYY8L3A+PGZvcm0+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cCBoYXMtZmVlZGJhY2tcXFwiPjxpbnB1dCBwbGFjZWhvbGRlcj1cXFwi5biQ5Y+3XFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBuYW1lPVxcXCJ1c2VybmFtZVxcXCIgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIvPjxzcGFuIGNsYXNzPVxcXCJnbHlwaGljb24gZ2x5cGhpY29uLXVzZXIgZm9ybS1jb250cm9sLWZlZWRiYWNrXFxcIj48L3NwYW4+PC9kaXY+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cCBoYXMtZmVlZGJhY2tcXFwiPjxpbnB1dCBwbGFjZWhvbGRlcj1cXFwi5a+G56CBXFxcIiB0eXBlPVxcXCJwYXNzd29yZFxcXCIgbmFtZT1cXFwicGFzc3dvcmRcXFwiIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiLz48c3BhbiBjbGFzcz1cXFwiZ2x5cGhpY29uIGdseXBoaWNvbi1sb2NrIGZvcm0tY29udHJvbC1mZWVkYmFja1xcXCI+PC9zcGFuPjwvZGl2PjxkaXYgY2xhc3M9XFxcInJvd1xcXCI+PGRpdiBjbGFzcz1cXFwiY29sLXhzLTYgY29sLW1kLTRcXFwiPjxidXR0b24gdHlwZT1cXFwic3VibWl0XFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1ibG9ja1xcXCI+55m76ZmGPC9idXR0b24+PC9kaXY+PGRpdiBjbGFzcz1cXFwiY29sLXhzLTYgY29sLW1kLTRcXFwiPjxidXR0b24gdHlwZT1cXFwicmVzZXRcXFwiIGNsYXNzPVxcXCJidG4gYnRuLXdhcm5pbmcgYnRuLWJsb2NrXFxcIj7ph43nva48L2J1dHRvbj48L2Rpdj48L2Rpdj48L2Zvcm0+PC9kaXY+PC9zZWN0aW9uPlwiKTs7cmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xufTsiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4oZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9Zy5qYWRlID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1lcmdlIHR3byBhdHRyaWJ1dGUgb2JqZWN0cyBnaXZpbmcgcHJlY2VkZW5jZVxuICogdG8gdmFsdWVzIGluIG9iamVjdCBgYmAuIENsYXNzZXMgYXJlIHNwZWNpYWwtY2FzZWRcbiAqIGFsbG93aW5nIGZvciBhcnJheXMgYW5kIG1lcmdpbmcvam9pbmluZyBhcHByb3ByaWF0ZWx5XG4gKiByZXN1bHRpbmcgaW4gYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFcbiAqIEBwYXJhbSB7T2JqZWN0fSBiXG4gKiBAcmV0dXJuIHtPYmplY3R9IGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMubWVyZ2UgPSBmdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIGF0dHJzID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGF0dHJzID0gbWVyZ2UoYXR0cnMsIGFbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gYXR0cnM7XG4gIH1cbiAgdmFyIGFjID0gYVsnY2xhc3MnXTtcbiAgdmFyIGJjID0gYlsnY2xhc3MnXTtcblxuICBpZiAoYWMgfHwgYmMpIHtcbiAgICBhYyA9IGFjIHx8IFtdO1xuICAgIGJjID0gYmMgfHwgW107XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFjKSkgYWMgPSBbYWNdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShiYykpIGJjID0gW2JjXTtcbiAgICBhWydjbGFzcyddID0gYWMuY29uY2F0KGJjKS5maWx0ZXIobnVsbHMpO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGIpIHtcbiAgICBpZiAoa2V5ICE9ICdjbGFzcycpIHtcbiAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYTtcbn07XG5cbi8qKlxuICogRmlsdGVyIG51bGwgYHZhbGBzLlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbnVsbHModmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwgIT09ICcnO1xufVxuXG4vKipcbiAqIGpvaW4gYXJyYXkgYXMgY2xhc3Nlcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmpvaW5DbGFzc2VzID0gam9pbkNsYXNzZXM7XG5mdW5jdGlvbiBqb2luQ2xhc3Nlcyh2YWwpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwubWFwKGpvaW5DbGFzc2VzKSA6XG4gICAgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JykgPyBPYmplY3Qua2V5cyh2YWwpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiB2YWxba2V5XTsgfSkgOlxuICAgIFt2YWxdKS5maWx0ZXIobnVsbHMpLmpvaW4oJyAnKTtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gY2xhc3Nlc1xuICogQHBhcmFtIHtBcnJheS48Qm9vbGVhbj59IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5jbHMgPSBmdW5jdGlvbiBjbHMoY2xhc3NlcywgZXNjYXBlZCkge1xuICB2YXIgYnVmID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlc2NhcGVkICYmIGVzY2FwZWRbaV0pIHtcbiAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuZXNjYXBlKGpvaW5DbGFzc2VzKFtjbGFzc2VzW2ldXSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLnB1c2goam9pbkNsYXNzZXMoY2xhc3Nlc1tpXSkpO1xuICAgIH1cbiAgfVxuICB2YXIgdGV4dCA9IGpvaW5DbGFzc2VzKGJ1Zik7XG4gIGlmICh0ZXh0Lmxlbmd0aCkge1xuICAgIHJldHVybiAnIGNsYXNzPVwiJyArIHRleHQgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJztcbiAgfVxufTtcblxuXG5leHBvcnRzLnN0eWxlID0gZnVuY3Rpb24gKHZhbCkge1xuICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHZhbCkubWFwKGZ1bmN0aW9uIChzdHlsZSkge1xuICAgICAgcmV0dXJuIHN0eWxlICsgJzonICsgdmFsW3N0eWxlXTtcbiAgICB9KS5qb2luKCc7Jyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbDtcbiAgfVxufTtcbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBhdHRyaWJ1dGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHBhcmFtIHtCb29sZWFufSBlc2NhcGVkXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRlcnNlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0ciA9IGZ1bmN0aW9uIGF0dHIoa2V5LCB2YWwsIGVzY2FwZWQsIHRlcnNlKSB7XG4gIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICB2YWwgPSBleHBvcnRzLnN0eWxlKHZhbCk7XG4gIH1cbiAgaWYgKCdib29sZWFuJyA9PSB0eXBlb2YgdmFsIHx8IG51bGwgPT0gdmFsKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuICcgJyArICh0ZXJzZSA/IGtleSA6IGtleSArICc9XCInICsga2V5ICsgJ1wiJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoMCA9PSBrZXkuaW5kZXhPZignZGF0YScpICYmICdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHtcbiAgICBpZiAoSlNPTi5zdHJpbmdpZnkodmFsKS5pbmRleE9mKCcmJykgIT09IC0xKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1NpbmNlIEphZGUgMi4wLjAsIGFtcGVyc2FuZHMgKGAmYCkgaW4gZGF0YSBhdHRyaWJ1dGVzICcgK1xuICAgICAgICAgICAgICAgICAgICd3aWxsIGJlIGVzY2FwZWQgdG8gYCZhbXA7YCcpO1xuICAgIH07XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBlbGltaW5hdGUgdGhlIGRvdWJsZSBxdW90ZXMgYXJvdW5kIGRhdGVzIGluICcgK1xuICAgICAgICAgICAgICAgICAgICdJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgXCI9J1wiICsgSlNPTi5zdHJpbmdpZnkodmFsKS5yZXBsYWNlKC8nL2csICcmYXBvczsnKSArIFwiJ1wiO1xuICB9IGVsc2UgaWYgKGVzY2FwZWQpIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyBleHBvcnRzLmVzY2FwZSh2YWwpICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwudG9JU09TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnNvbGUud2FybignSmFkZSB3aWxsIHN0cmluZ2lmeSBkYXRlcyBpbiBJU08gZm9ybSBhZnRlciAyLjAuMCcpO1xuICAgIH1cbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRycyA9IGZ1bmN0aW9uIGF0dHJzKG9iaiwgdGVyc2Upe1xuICB2YXIgYnVmID0gW107XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuXG4gIGlmIChrZXlzLmxlbmd0aCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgLCB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT0ga2V5KSB7XG4gICAgICAgIGlmICh2YWwgPSBqb2luQ2xhc3Nlcyh2YWwpKSB7XG4gICAgICAgICAgYnVmLnB1c2goJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmLnB1c2goZXhwb3J0cy5hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIHN0cmluZyBvZiBgaHRtbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciBqYWRlX2VuY29kZV9odG1sX3J1bGVzID0ge1xuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7JyxcbiAgJ1wiJzogJyZxdW90Oydcbn07XG52YXIgamFkZV9tYXRjaF9odG1sID0gL1smPD5cIl0vZztcblxuZnVuY3Rpb24gamFkZV9lbmNvZGVfY2hhcihjKSB7XG4gIHJldHVybiBqYWRlX2VuY29kZV9odG1sX3J1bGVzW2NdIHx8IGM7XG59XG5cbmV4cG9ydHMuZXNjYXBlID0gamFkZV9lc2NhcGU7XG5mdW5jdGlvbiBqYWRlX2VzY2FwZShodG1sKXtcbiAgdmFyIHJlc3VsdCA9IFN0cmluZyhodG1sKS5yZXBsYWNlKGphZGVfbWF0Y2hfaHRtbCwgamFkZV9lbmNvZGVfY2hhcik7XG4gIGlmIChyZXN1bHQgPT09ICcnICsgaHRtbCkgcmV0dXJuIGh0bWw7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgamFkZSBpbiBgZmlsZW5hbWVgIGF0IHRoZSBnaXZlbiBgbGluZW5vYC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVub1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gZnVuY3Rpb24gcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmV0aHJvdyhlcnIsIG51bGwsIGxpbmVubylcbiAgfVxuICB2YXIgY29udGV4dCA9IDNcbiAgICAsIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKVxuICAgICwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSBjb250ZXh0LCAwKVxuICAgICwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyBjb250ZXh0KTtcblxuICAvLyBFcnJvciBjb250ZXh0XG4gIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyAgPiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ0phZGUnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxuZXhwb3J0cy5EZWJ1Z0l0ZW0gPSBmdW5jdGlvbiBEZWJ1Z0l0ZW0obGluZW5vLCBmaWxlbmFtZSkge1xuICB0aGlzLmxpbmVubyA9IGxpbmVubztcbiAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xufVxuXG59LHtcImZzXCI6Mn1dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuXG59LHt9XX0se30sWzFdKSgxKVxufSk7XG59KS5jYWxsKHRoaXMsdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KSJdfQ==
