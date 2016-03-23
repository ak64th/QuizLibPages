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
  app.setErrorHandler();
  return Backbone.history.start();
});


},{"app":3,"ui-mixin":4}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
var App, LoginView;

LoginView = require('views/login');

App = Backbone.Router.extend({
  container: $('.content-wrapper'),
  routes: {
    "": "home",
    "resetPwd": "resetPassword",
    "accounts": "accountManage",
    "login": "login",
    'denied': 'denied'
  },
  setErrorHandler: function() {
    return $.ajaxSetup({
      statusCode: {
        401: function() {
          return window.location.replace('/#login');
        },
        403: function() {
          return window.location.replace('/#denied');
        }
      }
    });
  },
  loadView: function(view) {
    if (this.view) {
      if (this.view.close) {
        this.view.close();
      } else {
        this.view.remove();
      }
    }
    this.view = view;
    this.container.html('');
    return this.container.append(view.render().$el);
  },
  login: function() {
    return this.loadView(new LoginView);
  },
  denied: function() {
    return console.log('denied');
  }
});

module.exports = App;


},{"views/login":5}],4:[function(require,module,exports){
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
  login: function() {
    return console.log('login');
  }
});

module.exports = LoginView;


},{"templates/login":6}],6:[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<section class=\"content-header\"><h1>登陆</h1></section><section class=\"content\"><div class=\"row col-xs-12 col-sm-6\"><p class=\"login-box-msg\">请登陆</p><form><div class=\"form-group has-feedback\"><input placeholder=\"帐号\" type=\"text\" class=\"form-control\"/><span class=\"glyphicon glyphicon-user form-control-feedback\"></span></div><div class=\"form-group has-feedback\"><input placeholder=\"密码\" type=\"password\" class=\"form-control\"/><span class=\"glyphicon glyphicon-lock form-control-feedback\"></span></div><div class=\"row\"><div class=\"col-xs-6 col-md-4\"><button type=\"submit\" class=\"btn btn-primary btn-block\">登陆</button></div><div class=\"col-xs-6 col-md-4\"><button type=\"reset\" class=\"btn btn-warning btn-block\">重置</button></div></div></form></div></section>");;return buf.join("");
};
},{"jade/runtime":7}],7:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2VsbWVyeS9QeWNoYXJtUHJvamVjdHMvUXVpekxpYlBhZ2VzL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9lbG1lcnkvUHljaGFybVByb2plY3RzL1F1aXpMaWJQYWdlcy9hcHAvc2NyaXB0cy9pbmRleC5jb2ZmZWUiLCIvaG9tZS9lbG1lcnkvUHljaGFybVByb2plY3RzL1F1aXpMaWJQYWdlcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwiYXBwL3NjcmlwdHMvYXBwLmNvZmZlZSIsImFwcC9zY3JpcHRzL3VpLW1peGluLmNvZmZlZSIsImFwcC9zY3JpcHRzL3ZpZXdzL2xvZ2luLmNvZmZlZSIsImFwcC90ZW1wbGF0ZXMvbG9naW4uamFkZSIsIm5vZGVfbW9kdWxlcy9qYWRlL3J1bnRpbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBBcHAsIFVJTWl4aW4sIGFwcDtcblxuVUlNaXhpbiA9IHJlcXVpcmUoJ3VpLW1peGluJyk7XG5cbkFwcCA9IHJlcXVpcmUoJ2FwcCcpO1xuXG5hcHAgPSBuZXcgQXBwO1xuXG5fLmV4dGVuZChhcHAsIFVJTWl4aW4pO1xuXG4kKGZ1bmN0aW9uKCkge1xuICBhcHAubGF5b3V0LmFjdGl2YXRlKCk7XG4gIGFwcC5wdXNoTWVudS5hY3RpdmF0ZSgpO1xuICBhcHAudHJlZSgpO1xuICBhcHAuc2V0RXJyb3JIYW5kbGVyKCk7XG4gIHJldHVybiBCYWNrYm9uZS5oaXN0b3J5LnN0YXJ0KCk7XG59KTtcblxuIixudWxsLCJ2YXIgQXBwLCBMb2dpblZpZXc7XG5cbkxvZ2luVmlldyA9IHJlcXVpcmUoJ3ZpZXdzL2xvZ2luJyk7XG5cbkFwcCA9IEJhY2tib25lLlJvdXRlci5leHRlbmQoe1xuICBjb250YWluZXI6ICQoJy5jb250ZW50LXdyYXBwZXInKSxcbiAgcm91dGVzOiB7XG4gICAgXCJcIjogXCJob21lXCIsXG4gICAgXCJyZXNldFB3ZFwiOiBcInJlc2V0UGFzc3dvcmRcIixcbiAgICBcImFjY291bnRzXCI6IFwiYWNjb3VudE1hbmFnZVwiLFxuICAgIFwibG9naW5cIjogXCJsb2dpblwiLFxuICAgICdkZW5pZWQnOiAnZGVuaWVkJ1xuICB9LFxuICBzZXRFcnJvckhhbmRsZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAkLmFqYXhTZXR1cCh7XG4gICAgICBzdGF0dXNDb2RlOiB7XG4gICAgICAgIDQwMTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKCcvI2xvZ2luJyk7XG4gICAgICAgIH0sXG4gICAgICAgIDQwMzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKCcvI2RlbmllZCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG4gIGxvYWRWaWV3OiBmdW5jdGlvbih2aWV3KSB7XG4gICAgaWYgKHRoaXMudmlldykge1xuICAgICAgaWYgKHRoaXMudmlldy5jbG9zZSkge1xuICAgICAgICB0aGlzLnZpZXcuY2xvc2UoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmlldy5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy52aWV3ID0gdmlldztcbiAgICB0aGlzLmNvbnRhaW5lci5odG1sKCcnKTtcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXIuYXBwZW5kKHZpZXcucmVuZGVyKCkuJGVsKTtcbiAgfSxcbiAgbG9naW46IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmxvYWRWaWV3KG5ldyBMb2dpblZpZXcpO1xuICB9LFxuICBkZW5pZWQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjb25zb2xlLmxvZygnZGVuaWVkJyk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcDtcblxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGxheW91dDoge1xuICAgIGFjdGl2YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmO1xuICAgICAgc2VsZiA9IHRoaXM7XG4gICAgICBzZWxmLmZpeCgpO1xuICAgICAgcmV0dXJuICQod2luZG93LCBcIi53cmFwcGVyXCIpLnJlc2l6ZShmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHNlbGYuZml4KCk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGZpeDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgbmVnLCBzaWRlYmFyX2hlaWdodCwgd2luZG93X2hlaWdodDtcbiAgICAgIG5lZyA9ICQoXCIubWFpbi1oZWFkZXJcIikub3V0ZXJIZWlnaHQoKSArICQoXCIubWFpbi1mb290ZXJcIikub3V0ZXJIZWlnaHQoKTtcbiAgICAgIHdpbmRvd19oZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XG4gICAgICBzaWRlYmFyX2hlaWdodCA9ICQoXCIuc2lkZWJhclwiKS5oZWlnaHQoKTtcbiAgICAgIGlmICh3aW5kb3dfaGVpZ2h0ID49IHNpZGViYXJfaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiAkKFwiLmNvbnRlbnQtd3JhcHBlclwiKS5jc3MoXCJtaW4taGVpZ2h0XCIsIHdpbmRvd19oZWlnaHQgLSBuZWcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICQoXCIuY29udGVudC13cmFwcGVyXCIpLmNzcyhcIm1pbi1oZWlnaHRcIiwgc2lkZWJhcl9oZWlnaHQpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgcHVzaE1lbnU6IHtcbiAgICBhY3RpdmF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAkKCcjY29sbGFwc2VUb2dnbGUnKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPiAoNzY4IC0gMSkpIHtcbiAgICAgICAgICBpZiAoJChcImJvZHlcIikuaGFzQ2xhc3MoXCJzaWRlYmFyLWNvbGxhcHNlXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJzaWRlYmFyLWNvbGxhcHNlXCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJChcImJvZHlcIikuYWRkQ2xhc3MoXCJzaWRlYmFyLWNvbGxhcHNlXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoJChcImJvZHlcIikuaGFzQ2xhc3MoXCJzaWRlYmFyLW9wZW5cIikpIHtcbiAgICAgICAgICAgIHJldHVybiAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcInNpZGViYXItb3BlblwiKS5yZW1vdmVDbGFzcyhcInNpZGViYXItY29sbGFwc2VcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAkKFwiYm9keVwiKS5hZGRDbGFzcyhcInNpZGViYXItb3BlblwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuICQoXCIuY29udGVudC13cmFwcGVyXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gKDc2OCAtIDEpICYmICQoXCJib2R5XCIpLmhhc0NsYXNzKFwic2lkZWJhci1vcGVuXCIpKSB7XG4gICAgICAgICAgcmV0dXJuICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwic2lkZWJhci1vcGVuXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sXG4gIHRyZWU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhbmltYXRpb25TcGVlZCwgc2VsZjtcbiAgICBzZWxmID0gdGhpcztcbiAgICBhbmltYXRpb25TcGVlZCA9IDUwMDtcbiAgICByZXR1cm4gJCgnYm9keScpLm9uKFwiY2xpY2tcIiwgXCIuc2lkZWJhciBsaSBhXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciAkdGhpcywgY2hlY2tFbGVtZW50LCBwYXJlbnQsIHBhcmVudF9saSwgdWw7XG4gICAgICAkdGhpcyA9ICQodGhpcyk7XG4gICAgICBjaGVja0VsZW1lbnQgPSAkdGhpcy5uZXh0KCk7XG4gICAgICBpZiAoKGNoZWNrRWxlbWVudC5pcyhcIi50cmVldmlldy1tZW51XCIpKSAmJiAoY2hlY2tFbGVtZW50LmlzKFwiOnZpc2libGVcIikpKSB7XG4gICAgICAgIGNoZWNrRWxlbWVudC5zbGlkZVVwKGFuaW1hdGlvblNwZWVkLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gY2hlY2tFbGVtZW50LnJlbW92ZUNsYXNzKFwibWVudS1vcGVuXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5sYXlvdXQuZml4KCk7XG4gICAgICAgIGNoZWNrRWxlbWVudC5wYXJlbnQoXCJsaVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hlY2tFbGVtZW50LmlzKFwiLnRyZWV2aWV3LW1lbnVcIikpIHtcbiAgICAgICAgcGFyZW50ID0gJHRoaXMucGFyZW50cyhcInVsXCIpLmZpcnN0KCk7XG4gICAgICAgIHVsID0gcGFyZW50LmZpbmQoXCJ1bDp2aXNpYmxlXCIpLnNsaWRlVXAoYW5pbWF0aW9uU3BlZWQpO1xuICAgICAgICB1bC5yZW1vdmVDbGFzcyhcIm1lbnUtb3BlblwiKTtcbiAgICAgICAgcGFyZW50X2xpID0gJHRoaXMucGFyZW50KFwibGlcIik7XG4gICAgICAgIGNoZWNrRWxlbWVudC5zbGlkZURvd24oYW5pbWF0aW9uU3BlZWQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNoZWNrRWxlbWVudC5hZGRDbGFzcyhcIm1lbnUtb3BlblwiKTtcbiAgICAgICAgICBwYXJlbnQuZmluZChcImxpLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgICBwYXJlbnRfbGkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICAgcmV0dXJuIHNlbGYubGF5b3V0LmZpeCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChjaGVja0VsZW1lbnQuaXMoXCIudHJlZXZpZXctbWVudVwiKSkge1xuICAgICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59O1xuXG4iLCJ2YXIgTG9naW5WaWV3O1xuXG5Mb2dpblZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG4gIGNsYXNzTmFtZTogJ2xvZ2luLXZpZXctY29udGFpbmVyJyxcbiAgdGVtcGxhdGU6IHJlcXVpcmUoJ3RlbXBsYXRlcy9sb2dpbicpLFxuICBldmVudHM6IHtcbiAgICAnY2xpY2sgYnV0dG9uW3R5cGU9c3VibWl0XSc6ICdsb2dpbidcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRlbC5odG1sKHRoaXMudGVtcGxhdGUoKSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIGxvZ2luOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gY29uc29sZS5sb2coJ2xvZ2luJyk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExvZ2luVmlldztcblxuIiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG5cbmJ1Zi5wdXNoKFwiPHNlY3Rpb24gY2xhc3M9XFxcImNvbnRlbnQtaGVhZGVyXFxcIj48aDE+55m76ZmGPC9oMT48L3NlY3Rpb24+PHNlY3Rpb24gY2xhc3M9XFxcImNvbnRlbnRcXFwiPjxkaXYgY2xhc3M9XFxcInJvdyBjb2wteHMtMTIgY29sLXNtLTZcXFwiPjxwIGNsYXNzPVxcXCJsb2dpbi1ib3gtbXNnXFxcIj7or7fnmbvpmYY8L3A+PGZvcm0+PGRpdiBjbGFzcz1cXFwiZm9ybS1ncm91cCBoYXMtZmVlZGJhY2tcXFwiPjxpbnB1dCBwbGFjZWhvbGRlcj1cXFwi5biQ5Y+3XFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PHNwYW4gY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tdXNlciBmb3JtLWNvbnRyb2wtZmVlZGJhY2tcXFwiPjwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwIGhhcy1mZWVkYmFja1xcXCI+PGlucHV0IHBsYWNlaG9sZGVyPVxcXCLlr4bnoIFcXFwiIHR5cGU9XFxcInBhc3N3b3JkXFxcIiBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIi8+PHNwYW4gY2xhc3M9XFxcImdseXBoaWNvbiBnbHlwaGljb24tbG9jayBmb3JtLWNvbnRyb2wtZmVlZGJhY2tcXFwiPjwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPjxkaXYgY2xhc3M9XFxcImNvbC14cy02IGNvbC1tZC00XFxcIj48YnV0dG9uIHR5cGU9XFxcInN1Ym1pdFxcXCIgY2xhc3M9XFxcImJ0biBidG4tcHJpbWFyeSBidG4tYmxvY2tcXFwiPueZu+mZhjwvYnV0dG9uPjwvZGl2PjxkaXYgY2xhc3M9XFxcImNvbC14cy02IGNvbC1tZC00XFxcIj48YnV0dG9uIHR5cGU9XFxcInJlc2V0XFxcIiBjbGFzcz1cXFwiYnRuIGJ0bi13YXJuaW5nIGJ0bi1ibG9ja1xcXCI+6YeN572uPC9idXR0b24+PC9kaXY+PC9kaXY+PC9mb3JtPjwvZGl2Pjwvc2VjdGlvbj5cIik7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfWcuamFkZSA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNZXJnZSB0d28gYXR0cmlidXRlIG9iamVjdHMgZ2l2aW5nIHByZWNlZGVuY2VcbiAqIHRvIHZhbHVlcyBpbiBvYmplY3QgYGJgLiBDbGFzc2VzIGFyZSBzcGVjaWFsLWNhc2VkXG4gKiBhbGxvd2luZyBmb3IgYXJyYXlzIGFuZCBtZXJnaW5nL2pvaW5pbmcgYXBwcm9wcmlhdGVseVxuICogcmVzdWx0aW5nIGluIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gKiBAcGFyYW0ge09iamVjdH0gYlxuICogQHJldHVybiB7T2JqZWN0fSBhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24gbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IG1lcmdlKGF0dHJzLCBhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xuICB9XG4gIHZhciBhYyA9IGFbJ2NsYXNzJ107XG4gIHZhciBiYyA9IGJbJ2NsYXNzJ107XG5cbiAgaWYgKGFjIHx8IGJjKSB7XG4gICAgYWMgPSBhYyB8fCBbXTtcbiAgICBiYyA9IGJjIHx8IFtdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhYykpIGFjID0gW2FjXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYmMpKSBiYyA9IFtiY107XG4gICAgYVsnY2xhc3MnXSA9IGFjLmNvbmNhdChiYykuZmlsdGVyKG51bGxzKTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSAhPSAnY2xhc3MnKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIEZpbHRlciBudWxsIGB2YWxgcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG51bGxzKHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsICE9PSAnJztcbn1cblxuLyoqXG4gKiBqb2luIGFycmF5IGFzIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5qb2luQ2xhc3NlcyA9IGpvaW5DbGFzc2VzO1xuZnVuY3Rpb24gam9pbkNsYXNzZXModmFsKSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheSh2YWwpID8gdmFsLm1hcChqb2luQ2xhc3NlcykgOlxuICAgICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpID8gT2JqZWN0LmtleXModmFsKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdmFsW2tleV07IH0pIDpcbiAgICBbdmFsXSkuZmlsdGVyKG51bGxzKS5qb2luKCcgJyk7XG59XG5cbi8qKlxuICogUmVuZGVyIHRoZSBnaXZlbiBjbGFzc2VzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGNsYXNzZXNcbiAqIEBwYXJhbSB7QXJyYXkuPEJvb2xlYW4+fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuY2xzID0gZnVuY3Rpb24gY2xzKGNsYXNzZXMsIGVzY2FwZWQpIHtcbiAgdmFyIGJ1ZiA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZXNjYXBlZCAmJiBlc2NhcGVkW2ldKSB7XG4gICAgICBidWYucHVzaChleHBvcnRzLmVzY2FwZShqb2luQ2xhc3NlcyhbY2xhc3Nlc1tpXV0pKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJ1Zi5wdXNoKGpvaW5DbGFzc2VzKGNsYXNzZXNbaV0pKTtcbiAgICB9XG4gIH1cbiAgdmFyIHRleHQgPSBqb2luQ2xhc3NlcyhidWYpO1xuICBpZiAodGV4dC5sZW5ndGgpIHtcbiAgICByZXR1cm4gJyBjbGFzcz1cIicgKyB0ZXh0ICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn07XG5cblxuZXhwb3J0cy5zdHlsZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh2YWwpLm1hcChmdW5jdGlvbiAoc3R5bGUpIHtcbiAgICAgIHJldHVybiBzdHlsZSArICc6JyArIHZhbFtzdHlsZV07XG4gICAgfSkuam9pbignOycpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWw7XG4gIH1cbn07XG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWxcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXNjYXBlZFxuICogQHBhcmFtIHtCb29sZWFufSB0ZXJzZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5leHBvcnRzLmF0dHIgPSBmdW5jdGlvbiBhdHRyKGtleSwgdmFsLCBlc2NhcGVkLCB0ZXJzZSkge1xuICBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgdmFsID0gZXhwb3J0cy5zdHlsZSh2YWwpO1xuICB9XG4gIGlmICgnYm9vbGVhbicgPT0gdHlwZW9mIHZhbCB8fCBudWxsID09IHZhbCkge1xuICAgIGlmICh2YWwpIHtcbiAgICAgIHJldHVybiAnICcgKyAodGVyc2UgPyBrZXkgOiBrZXkgKyAnPVwiJyArIGtleSArICdcIicpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9IGVsc2UgaWYgKDAgPT0ga2V5LmluZGV4T2YoJ2RhdGEnKSAmJiAnc3RyaW5nJyAhPSB0eXBlb2YgdmFsKSB7XG4gICAgaWYgKEpTT04uc3RyaW5naWZ5KHZhbCkuaW5kZXhPZignJicpICE9PSAtMSkge1xuICAgICAgY29uc29sZS53YXJuKCdTaW5jZSBKYWRlIDIuMC4wLCBhbXBlcnNhbmRzIChgJmApIGluIGRhdGEgYXR0cmlidXRlcyAnICtcbiAgICAgICAgICAgICAgICAgICAnd2lsbCBiZSBlc2NhcGVkIHRvIGAmYW1wO2AnKTtcbiAgICB9O1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbC50b0lTT1N0cmluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc29sZS53YXJuKCdKYWRlIHdpbGwgZWxpbWluYXRlIHRoZSBkb3VibGUgcXVvdGVzIGFyb3VuZCBkYXRlcyBpbiAnICtcbiAgICAgICAgICAgICAgICAgICAnSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArIFwiPSdcIiArIEpTT04uc3RyaW5naWZ5KHZhbCkucmVwbGFjZSgvJy9nLCAnJmFwb3M7JykgKyBcIidcIjtcbiAgfSBlbHNlIGlmIChlc2NhcGVkKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgZXhwb3J0cy5lc2NhcGUodmFsKSArICdcIic7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ0phZGUgd2lsbCBzdHJpbmdpZnkgZGF0ZXMgaW4gSVNPIGZvcm0gYWZ0ZXIgMi4wLjAnKTtcbiAgICB9XG4gICAgcmV0dXJuICcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJztcbiAgfVxufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZXMgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7T2JqZWN0fSBlc2NhcGVkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydHMuYXR0cnMgPSBmdW5jdGlvbiBhdHRycyhvYmosIHRlcnNlKXtcbiAgdmFyIGJ1ZiA9IFtdO1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcblxuICBpZiAoa2V5cy5sZW5ndGgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldXG4gICAgICAgICwgdmFsID0gb2JqW2tleV07XG5cbiAgICAgIGlmICgnY2xhc3MnID09IGtleSkge1xuICAgICAgICBpZiAodmFsID0gam9pbkNsYXNzZXModmFsKSkge1xuICAgICAgICAgIGJ1Zi5wdXNoKCcgJyArIGtleSArICc9XCInICsgdmFsICsgJ1wiJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuYXR0cihrZXksIHZhbCwgZmFsc2UsIHRlcnNlKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1Zi5qb2luKCcnKTtcbn07XG5cbi8qKlxuICogRXNjYXBlIHRoZSBnaXZlbiBzdHJpbmcgb2YgYGh0bWxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBodG1sXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgamFkZV9lbmNvZGVfaHRtbF9ydWxlcyA9IHtcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG4gICdcIic6ICcmcXVvdDsnXG59O1xudmFyIGphZGVfbWF0Y2hfaHRtbCA9IC9bJjw+XCJdL2c7XG5cbmZ1bmN0aW9uIGphZGVfZW5jb2RlX2NoYXIoYykge1xuICByZXR1cm4gamFkZV9lbmNvZGVfaHRtbF9ydWxlc1tjXSB8fCBjO1xufVxuXG5leHBvcnRzLmVzY2FwZSA9IGphZGVfZXNjYXBlO1xuZnVuY3Rpb24gamFkZV9lc2NhcGUoaHRtbCl7XG4gIHZhciByZXN1bHQgPSBTdHJpbmcoaHRtbCkucmVwbGFjZShqYWRlX21hdGNoX2h0bWwsIGphZGVfZW5jb2RlX2NoYXIpO1xuICBpZiAocmVzdWx0ID09PSAnJyArIGh0bWwpIHJldHVybiBodG1sO1xuICBlbHNlIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFJlLXRocm93IHRoZSBnaXZlbiBgZXJyYCBpbiBjb250ZXh0IHRvIHRoZVxuICogdGhlIGphZGUgaW4gYGZpbGVuYW1lYCBhdCB0aGUgZ2l2ZW4gYGxpbmVub2AuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZW5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBsaW5lbm9cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucmV0aHJvdyA9IGZ1bmN0aW9uIHJldGhyb3coZXJyLCBmaWxlbmFtZSwgbGluZW5vLCBzdHIpe1xuICBpZiAoIShlcnIgaW5zdGFuY2VvZiBFcnJvcikpIHRocm93IGVycjtcbiAgaWYgKCh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnIHx8ICFmaWxlbmFtZSkgJiYgIXN0cikge1xuICAgIGVyci5tZXNzYWdlICs9ICcgb24gbGluZSAnICsgbGluZW5vO1xuICAgIHRocm93IGVycjtcbiAgfVxuICB0cnkge1xuICAgIHN0ciA9IHN0ciB8fCByZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYyhmaWxlbmFtZSwgJ3V0ZjgnKVxuICB9IGNhdGNoIChleCkge1xuICAgIHJldGhyb3coZXJyLCBudWxsLCBsaW5lbm8pXG4gIH1cbiAgdmFyIGNvbnRleHQgPSAzXG4gICAgLCBsaW5lcyA9IHN0ci5zcGxpdCgnXFxuJylcbiAgICAsIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gY29udGV4dCwgMClcbiAgICAsIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgY29udGV4dCk7XG5cbiAgLy8gRXJyb3IgY29udGV4dFxuICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKXtcbiAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/ICcgID4gJyA6ICcgICAgJylcbiAgICAgICsgY3VyclxuICAgICAgKyAnfCAnXG4gICAgICArIGxpbmU7XG4gIH0pLmpvaW4oJ1xcbicpO1xuXG4gIC8vIEFsdGVyIGV4Y2VwdGlvbiBtZXNzYWdlXG4gIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8ICdKYWRlJykgKyAnOicgKyBsaW5lbm9cbiAgICArICdcXG4nICsgY29udGV4dCArICdcXG5cXG4nICsgZXJyLm1lc3NhZ2U7XG4gIHRocm93IGVycjtcbn07XG5cbmV4cG9ydHMuRGVidWdJdGVtID0gZnVuY3Rpb24gRGVidWdJdGVtKGxpbmVubywgZmlsZW5hbWUpIHtcbiAgdGhpcy5saW5lbm8gPSBsaW5lbm87XG4gIHRoaXMuZmlsZW5hbWUgPSBmaWxlbmFtZTtcbn1cblxufSx7XCJmc1wiOjJ9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcblxufSx7fV19LHt9LFsxXSkoMSlcbn0pO1xufSkuY2FsbCh0aGlzLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiXX0=
