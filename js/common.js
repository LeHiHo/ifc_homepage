//check browser
var isie = /msie/i.test(navigator.userAgent); //ie
var isie6 = /msie 6/i.test(navigator.userAgent); //ie 6
var isie7 = /msie 7/i.test(navigator.userAgent); //ie 7
var isie8 = /msie 8/i.test(navigator.userAgent); //ie 8
var isie9 = /msie 9/i.test(navigator.userAgent); //ie 9
var isie10 = /msie 10/i.test(navigator.userAgent); //ie 9
var isfirefox = /firefox/i.test(navigator.userAgent); //firefox
var isapple = /applewebkit/i.test(navigator.userAgent); //safari,chrome
var isopera = /opera/i.test(navigator.userAgent); //opera
var isios = /(ipod|iphone|ipad)/i.test(navigator.userAgent); //ios
var isipad = /(ipad)/i.test(navigator.userAgent); //ipad
var isandroid = /android/i.test(navigator.userAgent); //android
var device;
//if(isie7 || isie8 || isie9){ isie6=false;}
//if(isie9){ isie=false;}
//if(isapple || isios || isipad || isandroid){}else{}

function con(l, t) {
  if ("console" in window) {
    var log = t == undefined ? l : t + l;
    console.log(log);
  }
}

function pageInfo(pNum, sNum, tNum) {
  var pageNum = pNum;
  var subNum = sNum;
  var threeNum = tNum;
  var lnbUl = $("#lnb .lnb_inner > ul");
  var snbUl = $(".lst_tab_cont .inner > ul");
  //var snb2Ul = $(".snb .depth3 > ul");

  if (pageNum > 0 && pageNum <= lnbUl.find(">li").length) {
    lnbUl.find(" > li.m" + pageNum).addClass("on");
    var lnb1img = lnbUl.find(" > li.m" + pageNum).find(">a>img");
    if (lnb1img.length > 0) {
      lnb1img.imgConversion(true);
    }
  }

  if (subNum > 0 && subNum <= snbUl.find(">li").length) {
    snbUl.find(" > li.m" + subNum).addClass("on");
  }

  /*if(threeNum > 0 && threeNum <= snb2Ul.find(">li").length){
       snbUl.find(" > li.s"+subNum+" .depth3").css("display","block").find("> ul > li.s"+threeNum).addClass("on");
   }*/

  lnbUl.find(">li").on("mouseenter mouseleave", function (e) {
    if (!$(this).hasClass("on")) {
      if (e.type == "mouseenter") {
        $(this).find(">a>img").imgConversion(true);
      } else {
        $(this).find(">a>img").imgConversion(false);
      }
    }

    if ($(this).index() < 7) {
      var myclass = $(this).attr("class").slice(0, 2);
      $(this)
        .siblings()
        .find(">.underLine")
        .removeClass("on")
        .end()
        .end()
        .find(">.underLine")
        .addClass("on");
      $("#lnb_depth2 .lnb_depth2_inner>." + myclass)
        .siblings()
        .hide()
        .end()
        .show();
      $("#lnb_depth2").slideDown(300);
    }
  });

  $("header").on("mouseleave", function (e) {
    $("#lnb_depth2").slideUp(300);
    $("#lnb .lnb_inner > ul > li .underLine.on").removeClass("on");
  });
} //pageInfo

(function (w) {
  // version check
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  /*if (msie > 0 && parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10) <= 7) {*/
  //   alert((/msie 7 Trident/i).test(navigator.userAgent));
  if (isie6) {
    //alert(ua);

    location.href = "/NoticeIE6.html";
  }
})(window);

function setCookie(name, value, expiredays) {
  var today = new Date();
  today.setDate(today.getDate() + expiredays);
  document.cookie =
    name +
    "=" +
    escape(value) +
    "; path=/; expires=" +
    today.toGMTString() +
    ";";
}

function getCookie(name) {
  var nameOfCookie = name + "=";
  var x = 0;
  while (x <= document.cookie.length) {
    var y = x + nameOfCookie.length;
    if (document.cookie.substring(x, y) == nameOfCookie) {
      if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
        endOfCookie = document.cookie.length;
      return unescape(document.cookie.substring(y, endOfCookie));
    }
    x = document.cookie.indexOf(" ", x) + 1;
    if (x == 0) break;
  }
  return "";
}

function setCookie01(name, value, expireDate) {
  var date_expire = new Date();
  date_expire.setDate(date_expire.getDate() + expireDate);

  var cookieStr =
    name +
    "=" +
    escape(value) +
    "; domain=" +
    escape(".auri.oktomato.net") +
    "; path=/" +
    (expireDate == null ? "" : "; expires=" + date_expire.toGMTString());

  // alert(cookieStr);

  document.cookie = cookieStr;
}

$.fn.extend({
  imgConversion: function (s, type) {
    var xt = $(this).attr("src").lastIndexOf(".") + 1;
    xt = $(this).attr("src").substr(xt);
    if (s)
      $(this).attr(
        "src",
        $(this)
          .attr("src")
          .replace("off." + xt, type != "hover" ? "on." + xt : "hover." + xt)
      );
    else
      $(this).attr(
        "src",
        $(this)
          .attr("src")
          .replace(type != "hover" ? "on." + xt : "hover." + xt, "off." + xt)
      );
    return $(this);
  },
});

(function (a) {
  function d(b) {
    var c = b || window.event,
      d = [].slice.call(arguments, 1),
      e = 0,
      f = !0,
      g = 0,
      h = 0;
    return (
      (b = a.event.fix(c)),
      (b.type = "mousewheel"),
      c.wheelDelta && (e = c.wheelDelta / 120),
      c.detail && (e = -c.detail / 3),
      (h = e),
      c.axis !== undefined &&
        c.axis === c.HORIZONTAL_AXIS &&
        ((h = 0), (g = -1 * e)),
      c.wheelDeltaY !== undefined && (h = c.wheelDeltaY / 120),
      c.wheelDeltaX !== undefined && (g = (-1 * c.wheelDeltaX) / 120),
      d.unshift(b, e, g, h),
      (a.event.dispatch || a.event.handle).apply(this, d)
    );
  }
  var b = ["DOMMouseScroll", "mousewheel"];
  if (a.event.fixHooks)
    for (var c = b.length; c; ) a.event.fixHooks[b[--c]] = a.event.mouseHooks;
  (a.event.special.mousewheel = {
    setup: function () {
      if (this.addEventListener)
        for (var a = b.length; a; ) this.addEventListener(b[--a], d, !1);
      else this.onmousewheel = d;
    },
    teardown: function () {
      if (this.removeEventListener)
        for (var a = b.length; a; ) this.removeEventListener(b[--a], d, !1);
      else this.onmousewheel = null;
    },
  }),
    a.fn.extend({
      mousewheel: function (a) {
        return a ? this.bind("mousewheel", a) : this.trigger("mousewheel");
      },
      unmousewheel: function (a) {
        return this.unbind("mousewheel", a);
      },
    });
})(jQuery);
(function ($) {
  "use strict";

  $.srSmoothscroll = function (options) {
    var self = $.extend(
      {
        step: 55,
        speed: 400,
        t: 0,
        ease: "swing",
      },
      options || {}
    );

    // private fields & init
    var win = $(window),
      doc = $(document),
      top = self.t,
      step = self.step,
      speed = self.speed,
      viewport = win.height(),
      body =
        navigator.userAgent.indexOf("AppleWebKit") !== -1
          ? $("body")
          : $("html"),
      wheel = false;

    // events
    $("body").mousewheel(function (event, delta) {
      wheel = true;

      if (delta < 0)
        // down
        top = top + viewport >= doc.height() ? top : (top += step);
      // up
      else top = top <= 0 ? 0 : (top -= step);

      body.stop().animate({ scrollTop: top }, speed, self.ease, function () {
        wheel = false;
      });

      return false;
    });

    win
      .on("resize", function (e) {
        viewport = win.height();
      })
      .on("scroll", function (e) {
        if (!wheel) top = win.scrollTop();
      });
  };
})(jQuery);

function chkEmail(email) {
  var regex =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  if (regex.test(email) === false) {
    return false;
  } else {
    return true;
  }
}
