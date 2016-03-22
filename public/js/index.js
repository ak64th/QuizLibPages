(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var UIMixin, app;

UIMixin = require('./ui-mixin');

app = {};

_.extend(app, UIMixin);

$(function() {
  app.layout.activate();
  app.pushMenu.activate();
  return app.tree();
});


},{"./ui-mixin":2}],2:[function(require,module,exports){
var UIMixin;

UIMixin = {
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

module.exports = UIMixin;


},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2VsbWVyeS9QeWNoYXJtUHJvamVjdHMvUXVpekxpYlBhZ2VzL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9lbG1lcnkvUHljaGFybVByb2plY3RzL1F1aXpMaWJQYWdlcy9zY3JpcHRzL2luZGV4LmNvZmZlZSIsIi9ob21lL2VsbWVyeS9QeWNoYXJtUHJvamVjdHMvUXVpekxpYlBhZ2VzL3NjcmlwdHMvdWktbWl4aW4uY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBVSU1peGluLCBhcHA7XG5cblVJTWl4aW4gPSByZXF1aXJlKCcuL3VpLW1peGluJyk7XG5cbmFwcCA9IHt9O1xuXG5fLmV4dGVuZChhcHAsIFVJTWl4aW4pO1xuXG4kKGZ1bmN0aW9uKCkge1xuICBhcHAubGF5b3V0LmFjdGl2YXRlKCk7XG4gIGFwcC5wdXNoTWVudS5hY3RpdmF0ZSgpO1xuICByZXR1cm4gYXBwLnRyZWUoKTtcbn0pO1xuXG4iLCJ2YXIgVUlNaXhpbjtcblxuVUlNaXhpbiA9IHtcbiAgbGF5b3V0OiB7XG4gICAgYWN0aXZhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGY7XG4gICAgICBzZWxmID0gdGhpcztcbiAgICAgIHNlbGYuZml4KCk7XG4gICAgICByZXR1cm4gJCh3aW5kb3csIFwiLndyYXBwZXJcIikucmVzaXplKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc2VsZi5maXgoKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZml4OiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBuZWcsIHNpZGViYXJfaGVpZ2h0LCB3aW5kb3dfaGVpZ2h0O1xuICAgICAgbmVnID0gJChcIi5tYWluLWhlYWRlclwiKS5vdXRlckhlaWdodCgpICsgJChcIi5tYWluLWZvb3RlclwiKS5vdXRlckhlaWdodCgpO1xuICAgICAgd2luZG93X2hlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcbiAgICAgIHNpZGViYXJfaGVpZ2h0ID0gJChcIi5zaWRlYmFyXCIpLmhlaWdodCgpO1xuICAgICAgaWYgKHdpbmRvd19oZWlnaHQgPj0gc2lkZWJhcl9oZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuICQoXCIuY29udGVudC13cmFwcGVyXCIpLmNzcyhcIm1pbi1oZWlnaHRcIiwgd2luZG93X2hlaWdodCAtIG5lZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJChcIi5jb250ZW50LXdyYXBwZXJcIikuY3NzKFwibWluLWhlaWdodFwiLCBzaWRlYmFyX2hlaWdodCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBwdXNoTWVudToge1xuICAgIGFjdGl2YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICQoJyNjb2xsYXBzZVRvZ2dsZScpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+ICg3NjggLSAxKSkge1xuICAgICAgICAgIGlmICgkKFwiYm9keVwiKS5oYXNDbGFzcyhcInNpZGViYXItY29sbGFwc2VcIikpIHtcbiAgICAgICAgICAgIHJldHVybiAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcInNpZGViYXItY29sbGFwc2VcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAkKFwiYm9keVwiKS5hZGRDbGFzcyhcInNpZGViYXItY29sbGFwc2VcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICgkKFwiYm9keVwiKS5oYXNDbGFzcyhcInNpZGViYXItb3BlblwiKSkge1xuICAgICAgICAgICAgcmV0dXJuICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwic2lkZWJhci1vcGVuXCIpLnJlbW92ZUNsYXNzKFwic2lkZWJhci1jb2xsYXBzZVwiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICQoXCJib2R5XCIpLmFkZENsYXNzKFwic2lkZWJhci1vcGVuXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gJChcIi5jb250ZW50LXdyYXBwZXJcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8PSAoNzY4IC0gMSkgJiYgJChcImJvZHlcIikuaGFzQ2xhc3MoXCJzaWRlYmFyLW9wZW5cIikpIHtcbiAgICAgICAgICByZXR1cm4gJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJzaWRlYmFyLW9wZW5cIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcbiAgdHJlZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFuaW1hdGlvblNwZWVkLCBzZWxmO1xuICAgIHNlbGYgPSB0aGlzO1xuICAgIGFuaW1hdGlvblNwZWVkID0gNTAwO1xuICAgIHJldHVybiAkKCdib2R5Jykub24oXCJjbGlja1wiLCBcIi5zaWRlYmFyIGxpIGFcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgdmFyICR0aGlzLCBjaGVja0VsZW1lbnQsIHBhcmVudCwgcGFyZW50X2xpLCB1bDtcbiAgICAgICR0aGlzID0gJCh0aGlzKTtcbiAgICAgIGNoZWNrRWxlbWVudCA9ICR0aGlzLm5leHQoKTtcbiAgICAgIGlmICgoY2hlY2tFbGVtZW50LmlzKFwiLnRyZWV2aWV3LW1lbnVcIikpICYmIChjaGVja0VsZW1lbnQuaXMoXCI6dmlzaWJsZVwiKSkpIHtcbiAgICAgICAgY2hlY2tFbGVtZW50LnNsaWRlVXAoYW5pbWF0aW9uU3BlZWQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBjaGVja0VsZW1lbnQucmVtb3ZlQ2xhc3MoXCJtZW51LW9wZW5cIik7XG4gICAgICAgIH0pO1xuICAgICAgICBzZWxmLmxheW91dC5maXgoKTtcbiAgICAgICAgY2hlY2tFbGVtZW50LnBhcmVudChcImxpXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgfSBlbHNlIGlmIChjaGVja0VsZW1lbnQuaXMoXCIudHJlZXZpZXctbWVudVwiKSkge1xuICAgICAgICBwYXJlbnQgPSAkdGhpcy5wYXJlbnRzKFwidWxcIikuZmlyc3QoKTtcbiAgICAgICAgdWwgPSBwYXJlbnQuZmluZChcInVsOnZpc2libGVcIikuc2xpZGVVcChhbmltYXRpb25TcGVlZCk7XG4gICAgICAgIHVsLnJlbW92ZUNsYXNzKFwibWVudS1vcGVuXCIpO1xuICAgICAgICBwYXJlbnRfbGkgPSAkdGhpcy5wYXJlbnQoXCJsaVwiKTtcbiAgICAgICAgY2hlY2tFbGVtZW50LnNsaWRlRG93bihhbmltYXRpb25TcGVlZCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2hlY2tFbGVtZW50LmFkZENsYXNzKFwibWVudS1vcGVuXCIpO1xuICAgICAgICAgIHBhcmVudC5maW5kKFwibGkuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAgIHBhcmVudF9saS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgICByZXR1cm4gc2VsZi5sYXlvdXQuZml4KCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGNoZWNrRWxlbWVudC5pcyhcIi50cmVldmlldy1tZW51XCIpKSB7XG4gICAgICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVUlNaXhpbjtcblxuIl19
