function onSampleReady() {
  alert("퍼블리싱 단계 입니다.\n준비중입니다.");
}

function goBack() {
  window.history.back();
}

function checkListMotion(obj) {
  if (obj == undefined) {
    var o = $(".lst_check");
  } else {
    var o = $(obj);
  }

  o.each(function () {
    //if($(this).hasClass("radio")){
    var $this = $(this);
    var prev;
    $this.find(">span").each(function () {
      if ($(this).find(" > input").prop("checked")) {
        $(this).addClass("on");
      }
    }); //each
    //}else{

    //}//if
  }); //each

  o.find(" > span > label")
    .off()
    .on("click", function () {
      if ($(this).parent().parent().hasClass("radio")) {
        $(this).parent().siblings(".on").removeClass("on").end().addClass("on");
      } else {
        $(this).parent().toggleClass("on");
      } //if
    });
}

$.fn.extend({
  scrollAction: function (ac) {
    var scroll = $(window).scrollTop();
    var obj = $(this);
    var objOffset = obj.offset().top;
    var objHeight = obj.outerHeight();

    if (isie7 || isie8) {
    } else {
      if (ac == "opacity") {
        obj.css({ display: "block", opacity: 0 });
        function scrollOpacityAction() {
          scroll = $(window).scrollTop();
          var opa = Math.round((scroll / objHeight) * 10) / 10;

          obj.stop().animate(
            {
              opacity: opa,
            },
            50
          );
        }
        // con("opa::::::::::::"+opa);
        // con("scroll::::::::::"+scroll);
        // con("spotCoverOffset::::::::::"+spotCoverOffset);
        // con("spotCoverHeight::::::::::"+spotCoverHeight);
        $(window).on("scroll.opacityAction", scrollOpacityAction);
      }
    } //isie7 || isie8
  } /*//scrollAction*/,
});

//차례로 페이드  함수
function forFade(chi, sw, spd, de) {
  var child = chi;
  var Switch = sw;
  var sp = spd;
  var del = de;
  if (Modernizr.opacity) {
    var length = child.length;
    if (Switch) {
      for (var i = 0; i < length; i++) {
        child
          .filter(":eq(" + i + ")")
          .css({
            display: "block",
            opacity: 0,
          })
          .stop()
          .delay(del * i)
          .animate(
            {
              opacity: 1,
            },
            sp
          );
      }
    } else {
      for (var i = 0; i < length; i++) {
        child
          .filter(":eq(" + i + ")")
          .stop()
          .animate(
            {
              opacity: 0,
            },
            sp,
            function () {
              $(this).css({ display: "none" });
            }
          );
      }
    }
  } else {
    //ie8
    child.css("display", Switch ? "block" : "none");
  } //Modernizr
} //forFade

//if(isie7 || isie8 || isie9){ isie6=false;}
//if(isie9){ isie=false;}
//if(isapple || isios || isipad || isandroid){}else{}
var W3CDOM = document.createElement && document.getElementsByTagName;

function initFileUploads() {
  if (!W3CDOM) {
    return;
  }
  var fakeFileUpload = document.createElement("div");
  fakeFileUpload.className = "fakefile";
  var inputbox = document.createElement("input");
  fakeFileUpload.appendChild(inputbox);
  var image = document.createElement("img");

  //if()
  image.src = "/oktomato/images/btn/btn_upload_off.gif";
  fakeFileUpload.appendChild(image);
  var x = document.getElementsByTagName("input");
  for (var i = 0; i < x.length; i++) {
    if (x[i].type != "file") continue;
    if (x[i].parentNode.className != "fileinputs") continue;
    x[i].className = "file";
    var clone = fakeFileUpload.cloneNode(true);
    x[i].parentNode.appendChild(clone);
    x[i].relatedElement = clone.getElementsByTagName("input")[0];
    x[i].onchange = x[i].onmouseout = function () {
      this.relatedElement.value = this.value;
    };
  }
  $(".fileinputs").each(function () {
    if ($(this).data("src") != undefined)
      $(this).find(".fakefile > img").attr("src", $(this).data("src"));
    $(this).off("mouseenter mouseleave", function (e) {
      if ($(this).find(".fakefile > img").length > 0) {
        if (e.type == "mouseenter") {
          $(this).find(".fakefile > img").imgConversion(true);
        } else {
          $(this).find(".fakefile > img").imgConversion(false);
        }
      }
    });
  });
}
(function (w) {
  // version check
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");

  if (
    msie > 0 &&
    parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10) < 7
  ) {
    location.href = "/NoticeIE6.html";
  }
})(window);

//$('.example1demo').popupWindow({ height:500, width:800, top:50, left:50 });
//http://swip.codylindley.com/popupWindowDemo.html
(function ($) {
  $.fn.popupWindow = function (instanceSettings) {
    return this.each(function () {
      $(this).click(function () {
        $.fn.popupWindow.defaultSettings = {
          centerBrowser: 0, // center window over browser window? {1 (YES) or 0 (NO)}. overrides top and left
          centerScreen: 0, // center window over entire screen? {1 (YES) or 0 (NO)}. overrides top and left
          height: 500, // sets the height in pixels of the window.
          left: 0, // left position when the window appears.
          location: 0, // determines whether the address bar is displayed {1 (YES) or 0 (NO)}.
          menubar: 0, // determines whether the menu bar is displayed {1 (YES) or 0 (NO)}.
          resizable: 0, // whether the window can be resized {1 (YES) or 0 (NO)}. Can also be overloaded using resizable.
          scrollbars: 0, // determines whether scrollbars appear on the window {1 (YES) or 0 (NO)}.
          status: 0, // whether a status line appears at the bottom of the window {1 (YES) or 0 (NO)}.
          width: 500, // sets the width in pixels of the window.
          windowName: null, // name of window set from the name attribute of the element that invokes the click
          windowURL: null, // url used for the popup
          top: 0, // top position when the window appears.
          toolbar: 0, // determines whether a toolbar (includes the forward and back buttons) is displayed {1 (YES) or 0 (NO)}.
        };

        settings = $.extend(
          {},
          $.fn.popupWindow.defaultSettings,
          instanceSettings || {}
        );

        var windowFeatures =
          "height=" +
          settings.height +
          ",width=" +
          settings.width +
          ",toolbar=" +
          settings.toolbar +
          ",scrollbars=" +
          settings.scrollbars +
          ",status=" +
          settings.status +
          ",resizable=" +
          settings.resizable +
          ",location=" +
          settings.location +
          ",menuBar=" +
          settings.menubar;

        settings.windowName = this.name || settings.windowName;
        settings.windowURL = this.href || settings.windowURL;
        var centeredY, centeredX;

        if (settings.centerBrowser) {
          if ($.browser.msie) {
            //hacked together for IE browsers
            centeredY =
              window.screenTop -
              120 +
              ((document.documentElement.clientHeight + 120) / 2 -
                settings.height / 2);
            centeredX =
              window.screenLeft +
              ((document.body.offsetWidth + 20) / 2 - settings.width / 2);
          } else {
            centeredY =
              window.screenY + (window.outerHeight / 2 - settings.height / 2);
            centeredX =
              window.screenX + (window.outerWidth / 2 - settings.width / 2);
          }
          window
            .open(
              settings.windowURL,
              settings.windowName,
              windowFeatures + ",left=" + centeredX + ",top=" + centeredY
            )
            .focus();
        } else if (settings.centerScreen) {
          centeredY = (screen.height - settings.height) / 2;
          centeredX = (screen.width - settings.width) / 2;
          window
            .open(
              settings.windowURL,
              settings.windowName,
              windowFeatures + ",left=" + centeredX + ",top=" + centeredY
            )
            .focus();
        } else {
          window
            .open(
              settings.windowURL,
              settings.windowName,
              windowFeatures + ",left=" + settings.left + ",top=" + settings.top
            )
            .focus();
        }
        return false;
      });
    });
  };
})(jQuery);

//모달 팝업창
function LayerPopup_type(obj) {
  var id_Motion = $(".popup_layer");
  var objHeight = $(obj).outerHeight();
  var winHeight = $(window).height();
  var scrollT = $(window).scrollTop();
  if (obj == "close") {
    //for(var i=0; i<=id_Motion.length; i++){
    //$(id_Motion[i]).css("display","none");
    id_Motion.css("display", "none");
    $("#cover").remove();
    //}
  } else {
    /*$(window).on('scroll',function(){
        var scrollT = $(window).scrollTop();
        $(obj).stop().animate({"top":  scrollT + 110  });
    });*/
    var backgound = $("<div>")
      .attr({
        id: "cover",
      })
      .css({
        height: $("body").outerHeight(),
      });
    $("body").append(backgound);

    for (var i = 0; i <= id_Motion.length; i++) {
      $(id_Motion[i]).css("display", "none");
    }
    $(obj).css({
      display: "block",
      "z-index": 150,
      top: scrollT + (winHeight - objHeight) / 2,
      //"left":"50%",
      //"margin-left":-( $(obj).outerWidth() / 2)
    });
    //alert(objHeight +",,,,"+ winHeight );
    //if(objHeight > winHeight){}
    backgound.off().on("click", function () {
      id_Motion.css("display", "none");
      backgound.remove();
      backgound.off("click");
    });
  } //if
} //LayerPopup_type

function square_checkbox_onoff(obj) {
  if ($(obj).attr("checked")) {
    $(obj)
      .parent()
      .find("label .square_checkbox>span")
      .css({ background: "#666" });
  } else {
    $(obj)
      .parent()
      .find("label .square_checkbox>span")
      .css({ background: "#ffffff" });
  }
}

function checkListMotion(obj) {
  if (obj == undefined) {
    var o = $(".lst_check");
  } else {
    var o = $(obj);
  }

  o.each(function () {
    //if($(this).hasClass("radio")){
    var $this = $(this);
    var prev;
    $this.find(">span").each(function () {
      if ($(this).find(" > input").prop("checked")) {
        $(this).addClass("on");
      }
    }); //each
    //}else{

    //}//if
  }); //each

  o.find(" > span > label")
    .off()
    .on("click", function () {
      if ($(this).parent().parent().hasClass("radio")) {
        $(this).parent().siblings(".on").removeClass("on").end().addClass("on");
      } else {
        $(this).parent().toggleClass("on");
      } //if
    });
}

function show_pop_j(e) {
  window.open(
    "http://kind.krx.co.kr/common/chart.do?method=loadInitPage&ispopup=true&isurcd=05137#",
    "JWindow",
    "toolbar=no, scrollbars=yes, resizable=yes, top=0, left=0, width=880, height=700"
  );
}

function MusicFadeMotion(obj, s) {
  var musicFileBox = $(obj);
  var pageing = musicFileBox.find(".pageing");
  var txt = musicFileBox.find(".txt");
  var img = musicFileBox.find(".img");
  var startMusicNum = "visualAudio" + s;
  var musicOn = false;
  var ep_e = [];
  var first = s;

  function init() {
    img
      .find(">ul>li")
      .not(img.find(">ul>li:eq(" + (first - 1) + ")").addClass("on"))
      .css("opacity", 0);
    pageing
      .find("button:eq(" + (first - 1) + ")")
      .addClass("on")
      .find("img")
      .imgConversion(true);

    if (isie7 || isie8) {
      var div_explan = document.getElementById("aplay");
      //var music = musicFileBox.find("embed");
      if (div_explan) {
        /*var explan_a = div_explan.getElementsByName(startMusicNum);
        explan_a.play();*/
        var explan_a = div_explan.getElementsByTagName("embed");
        for (i = 0; i < explan_a.length; i++) {
          ep_e = explan_a[i];
          if (ep_e.name == startMusicNum) {
            ep_e.play();
            musicOn = true;
            startMusicNum = ep_e;
          } else {
            ep_e.Stop();
          }
        }
      } //if
    } else {
      startMusicNum = document.getElementById(startMusicNum);
      startMusicNum.play();
    } //if : ie
  } //init

  function fadeMotion(num) {
    img
      .find(">ul>li.on")
      .removeClass("on")
      .stop()
      .animate({ opacity: 0 }, 1000);
    img
      .find(">ul>li:eq(" + (num - 1) + ")")
      .addClass("on")
      .stop()
      .animate({ opacity: 1 }, 600);
    pageing
      .find("button.on")
      .removeClass("on")
      .find("img")
      .imgConversion(false);
    pageing
      .find("button:eq(" + (num - 1) + ")")
      .addClass("on")
      .find("img")
      .imgConversion(true);
    PlayMusic(num);
  }

  function soundMute() {
    if (isie7 || isie8) {
      if (musicOn) {
        startMusicNum.Stop();
      } else {
        startMusicNum.play();
      }
      musicOn = !musicOn;
    } else {
      if (startMusicNum.paused) {
        startMusicNum.play();
      } else {
        startMusicNum.pause();
      }
    }
  } //soundMute

  function PlayMusic(num) {
    if (isie7 || isie8) {
      //ie
      startMusicNum = "visualAudio" + num;
      var div_explan = document.getElementById("aplay");
      var ep_e = [];
      var musicOn = false;
      //alert(startMusicNum);
      //var music = musicFileBox.find("embed");
      if (div_explan) {
        /*var explan_a = div_explan.getElementsByName(startMusicNum);
        explan_a.play();*/
        var explan_a = div_explan.getElementsByTagName("embed");
        for (i = 0; i < explan_a.length; i++) {
          ep_e = explan_a[i];
          if (ep_e.name == startMusicNum) {
            ep_e.play();
            musicOn = true;
            startMusicNum = ep_e;
          } else {
            ep_e.Stop();
          }
        }
      } //if
      //ie end
    } else {
      //Other
      startMusicNum.pause();
      startMusicNum.currentTime = 0;
      startMusicNum = document.getElementById("visualAudio" + num);
      startMusicNum.play();
    } //isie7 || isie8
  } /*//PlayMusic*/

  pageing.find(".sound").on("click", soundMute);
  pageing.find("> button.c").on("click", function () {
    var index = $(this).index() + 1;
    fadeMotion(index);
  });

  init();
} //MusicFadeMotion

$(function () {
  var $lnb = $("#lnb");
  var $snb = $("#side");

  if (pageNum > 0 && pageNum <= $lnb.find(".list > ul > li").length) {
    $lnb.state = $lnb.find(".list>ul>li.m" + pageNum);
    $lnb.state.addClass("on").find(" > a > span > img").imgConversion(true);
    //.end().find(".depth2").css("display","block");
  }
  if ((subNum > 0) & (subNum <= $snb.find("ul.snb>li").length)) {
    $snb.find("ul.snb > li.s" + subNum).addClass("on");

    //옵션추가 dmp : snb고정모션
    var mountain1 = $(
      '<span class="mountain1"><img src="/images/side/bg_m1.png" ></span>'
    );
    var mountain2 = $(
      '<span class="mountain2"><img src="/images/side/bg_m2.png" ></span>'
    );
    $snb
      .find("ul.snb > li.s" + subNum + "> a")
      .append(mountain1)
      .append(mountain2);
    mountain1.animate({ marginBottom: 0 }, 1000);
    mountain2.animate({ marginBottom: 0 }, 1500);
    //옵션추가 끝

    if ((thirdNum > 0) & (thirdNum <= $snb.find(".depth3>ul>li").length)) {
      $snb
        .find("ul.snb > li.s" + subNum + " .depth3")
        .css("display", "block")
        .find("> ul > li.s" + thirdNum)
        .addClass("on");
    }
  }
});

function playMp3(oMyObj) {
  var div_explan = document.getElementById("aplay");
  if (div_explan) {
    var explan_a = div_explan.getElementsByTagName("embed");
    for (i = 0; i < explan_a.length; i++) {
      //alert(explan_a[i].name+"|"+oMyObj);
      var ep_e = explan_a[i];
      if (ep_e.name == oMyObj) {
        ep_e.play();
      } else {
        ep_e.Stop();
      }
    }
  }
} //var myAudio = document.getElementById("visualAudio1"); //myAudio.play();

function aud_play_pause() {
  if (myAudio.paused) {
    myAudio.play();
    // console.log(
    //  "currentSrc : " + myAudio.currentSrc + "\n\n" +
    //  "currentTime : " + myAudio.currentTime + "\n\n" +
    //  "startTime : " + myAudio.startTime + "\n\n" +
    //  "duration : " + myAudio.duration + "\n\n" +
    //  "paused : " + myAudio.paused + "\n\n" +
    //  "defaultPlaybackRate : " + myAudio.defaultPlaybackRate + "\n\n" +
    //  "playbackRate : " + myAudio.playbackRate + "\n\n" +
    //  "ended : " + myAudio.ended + "\n\n" +
    //  "muted : " + myAudio.muted + "\n\n" +
    //  "volume : " + myAudio.volume + "\n\n"
    // );
  } else {
    myAudio.pause();
    // console.log(
    //  "currentSrc : " + myAudio.currentSrc + "\n\n" +
    //  "currentTime : " + myAudio.currentTime + "\n\n" +
    //  "startTime : " + myAudio.startTime + "\n\n" +
    //  "duration : " + myAudio.duration + "\n\n" +
    //  "paused : " + myAudio.paused + "\n\n" +
    //  "defaultPlaybackRate : " + myAudio.defaultPlaybackRate + "\n\n" +
    //  "playbackRate : " + myAudio.playbackRate + "\n\n" +
    //  "ended : " + myAudio.ended + "\n\n" +
    //  "muted : " + myAudio.muted + "\n\n" +
    //  "volume : " + myAudio.volume + "\n\n"
    // );
  }
}

function thumbFadeRolling(o) {
  var obj = $(o);
  var direction = obj.find(" > .controls-direction");
  var itemDirection = obj.find(".pager-item > .controls-direction");
  var thumbLarge = obj.find(".thumb-large");
  var thumbPos = obj.find(".pager-item > .pos");
  var ovrBox = $('<span class="ovr"></span>');
  var thumbItems = obj.find(".pager-item  > .pos > ul > li");
  var thumbItemsWidth = thumbItems.outerWidth(true);
  var total = thumbItems.length;
  var thumbItemEx = 5;
  var exNum = 0;

  var actionNum = 1;

  function init() {
    itemMotion(actionNum);
    if (thumbItemEx >= total) {
      itemDirection.css("display", "none");
    }
    obj.find(".pager-item  > .pos > ul").css("width", thumbItemsWidth * total);
  }

  function directionMotion2() {
    var direction = $(this).attr("class");
    if (direction == "prev") {
      if (exNum <= 0) {
        exNum = total - thumbItemEx;
      } else {
        exNum--;
      }
    } else if (direction == "next") {
      //direction
      if (exNum >= total - thumbItemEx) {
        exNum = 0;
      } else {
        exNum++;
      }
    } //direction
    thumbPos
      .find(">ul")
      .stop()
      .animate({ "margin-left": -(thumbItemsWidth * exNum) }, 300);
  } //directionMotion

  function itemMotion(num) {
    var img = $('<img class="ovr">').attr({
      src: thumbItems
        .filter(":eq(" + (num - 1) + ")")
        .find(".thumb > img")
        .attr("src"),
      alt: "",
    });
    var head = thumbItems
      .filter(":eq(" + (num - 1) + ")")
      .find(".hadeline")
      .text();
    var t1 = thumbItems
      .filter(":eq(" + (num - 1) + ")")
      .find(".t1")
      .text();
    var data = thumbItems
      .filter(":eq(" + (num - 1) + ")")
      .find(".data")
      .text();
    thumbLarge
      .prepend(img)
      .find(".ovr")
      .hide()
      .fadeTo(200, 1, function () {
        $(this).removeClass("ovr").next().remove();
      });
    thumbLarge
      .find(".headline")
      .text(head)
      .end()
      .find(".t1")
      .text(t1)
      .end()
      .find(".data")
      .text(data);
    thumbItems.each(function () {
      $(this)
        .removeClass("on")
        .find(".ovr")
        .remove()
        .end()
        .find(".gra")
        .css("display", "block");
    });
    thumbItems
      .filter(":eq(" + (num - 1) + ")")
      .addClass("on")
      .append(ovrBox)
      .find(".gra")
      .css("display", "none");
  }

  function thumbAction() {
    var index = $(this).index();
    itemMotion(index + 1);
  }

  function thumbAction() {
    var index = $(this).index();
    itemMotion(index + 1);
  }

  init();
  itemDirection.find("button").bind("click", directionMotion2);
  thumbItems.bind("click", thumbAction);
} //thumbFadeRolling

function thumbSoundRolling(o) {
  var obj = $(o);
  var audioTag = "visualAudio";
  var direction = obj.find(" > .controls-direction");
  var itemDirection = obj.find(".pager-item > .controls-direction");
  var thumbLarge = obj.find(".thumb-large");
  var thumbPos = obj.find(".pager-item > .pos");
  var ovrBox = $('<span class="ovr"></span>');
  var thumbItems = obj.find(".pager-item  > .pos > ul > li");
  var thumbItemsWidth = thumbItems.outerWidth(true);
  var total = thumbItems.length;
  var thumbItemEx = 5;
  var exNum = 0;
  var actionNum = 1;

  function init() {
    itemMotion(actionNum);
    if (thumbItemEx >= total) {
      itemDirection.css("display", "none");
    }
    obj.find(".pager-item  > .pos > ul").css("width", thumbItemsWidth * total);
    var soundSrc = thumbItems
      .filter(":eq(" + (actionNum - 1) + ")")
      .data("sound");
  }

  function thumbEnter(e) {
    if (e.type == "mouseenter") {
      var backgound = $("<div>")
        .attr({
          id: "cover",
        })
        .css({
          width: thumbLarge.outerWidth(true),
          height: thumbLarge.outerHeight(),
        });
      if (isie7 || isie8) {
        thumbLarge.append(backgound);
      } else {
        thumbLarge.append(backgound);
        backgound.css("opacity", 0).stop().animate({ opacity: 1 }, 100);
      }
      thumbLarge.find(".play").addClass("on");
    } else if (e.type == "mouseleave") {
      if (isie7 || isie8) {
        $("#cover").remove();
      } else {
        $("#cover")
          .stop()
          .animate({ opacity: 0 }, 100, function () {
            $("#cover").remove();
          });
      }
      thumbLarge.find(".play").removeClass("on");
    }
  } //thumbEnter

  function thumbSoundClick() {
    if (isie7 || isie8) {
      //ie
      var div_explan = document.getElementById("aplay");
      var ep_e = [];
      var musicOn = false;
      //alert(startMusicNum);
      //var music = musicFileBox.find("embed");
      if (div_explan) {
        //var explan_a = div_explan.getElementsByName(startMusicNum);
        //explan_a.play();
        var explan_a = div_explan.getElementsByTagName("embed");
        for (i = 0; i < explan_a.length; i++) {
          ep_e = explan_a[i];
          if (ep_e.name == startMusicNum) {
            ep_e.play();
            musicOn = true;
            startMusicNum = ep_e;
          } else {
            ep_e.Stop();
          }
        }
      } //if
      //ie end
    } else {
      startMusicName = document.getElementById(audioTag);
      if (startMusicName.paused) {
        startMusicName.play();
        thumbLarge
          .find(".play > img")
          .attr(
            "src",
            thumbLarge
              .find(".play > img")
              .attr("src")
              .split("play")
              .join("stop")
          );
      } else {
        startMusicName.pause();
        thumbLarge
          .find(".play > img")
          .attr(
            "src",
            thumbLarge
              .find(".play > img")
              .attr("src")
              .split("stop")
              .join("play")
          );
      }
    } //isie7 || isie8
  } //thumbSoundClick

  function directionMotion2() {
    var direction = $(this).attr("class");
    if (direction == "prev") {
      if (exNum <= 0) {
        exNum = total - thumbItemEx;
      } else {
        exNum--;
      }
    } else if (direction == "next") {
      //direction
      if (exNum >= total - thumbItemEx) {
        exNum = 0;
      } else {
        exNum++;
      }
    } //direction
    thumbPos
      .find(">ul")
      .stop()
      .animate({ "margin-left": -(thumbItemsWidth * exNum) }, 300);
  } //directionMotion

  function itemMotion(num) {
    thumbLarge
      .find(".play > img")
      .attr(
        "src",
        thumbLarge.find(".play > img").attr("src").split("stop").join("play")
      );
    var soundSrc = thumbItems.filter(":eq(" + (num - 1) + ")").data("sound");
    var audiobox = $('<audio id="' + audioTag + '" loop="true" ></audio');
    var sourceMp4 = $('<source src="' + soundSrc + '" type="audio/mpeg">');
    var sourceOgg = $('<source src="' + soundSrc + '" type="audio/ogg">');
    var img = $('<img class="ovr">').attr({
      src: thumbItems
        .filter(":eq(" + (num - 1) + ")")
        .find(".thumb > img")
        .attr("src"),
      alt: "",
    });

    var t1 = thumbItems
      .filter(":eq(" + (num - 1) + ")")
      .find(".t1")
      .text();
    var data = thumbItems
      .filter(":eq(" + (num - 1) + ")")
      .find(".data")
      .text();
    thumbLarge
      .prepend(img)
      .find(".ovr")
      .hide()
      .fadeTo(200, 1, function () {
        $(this).removeClass("ovr").next().remove();
      });
    thumbItems.each(function () {
      $(this)
        .removeClass("on")
        .find(".ovr")
        .remove()
        .end()
        .find(".gra")
        .css("display", "block");
    });
    thumbLarge.find(".t1").text(t1).end().find(".data").text(data);
    thumbItems
      .filter(":eq(" + (num - 1) + ")")
      .addClass("on")
      .append(ovrBox)
      .find(".gra")
      .css("display", "none");
    if ($("#aplay").find("#" + audioTag + "").length > 0) {
      $("#aplay #" + audioTag + "").remove();
    }
    $("#aplay").append(audiobox);
    $("#aplay #" + audioTag + "")
      .append(sourceMp4)
      .append(sourceOgg);
  }

  function thumbAction() {
    var index = $(this).index();
    itemMotion(index + 1);
  }

  function thumbAction() {
    var index = $(this).index();
    itemMotion(index + 1);
  }

  init();
  thumbLarge.on("mouseenter mouseleave", thumbEnter);
  thumbLarge.find(".play").on("click", thumbSoundClick);
  itemDirection.find("button").bind("click", directionMotion2);
  thumbItems.bind("click", thumbAction);
} //thumbSoundRolling

(function ($, window, document, undefined) {
  var pluginName = "stellar",
    defaults = {
      scrollProperty: "scroll",
      positionProperty: "position",
      horizontalScrolling: true,
      verticalScrolling: true,
      horizontalOffset: 0,
      verticalOffset: 0,
      responsive: false,
      parallaxBackgrounds: true,
      parallaxElements: true,
      hideDistantElements: true,
      hideElement: function ($elem) {
        $elem.hide();
      },
      showElement: function ($elem) {
        $elem.show();
      },
    },
    scrollProperty = {
      scroll: {
        getLeft: function ($elem) {
          return $elem.scrollLeft();
        },
        setLeft: function ($elem, val) {
          $elem.scrollLeft(val);
        },

        getTop: function ($elem) {
          return $elem.scrollTop();
        },
        setTop: function ($elem, val) {
          $elem.scrollTop(val);
        },
      },
      position: {
        getLeft: function ($elem) {
          return parseInt($elem.css("left"), 10) * -1;
        },
        getTop: function ($elem) {
          return parseInt($elem.css("top"), 10) * -1;
        },
      },
      margin: {
        getLeft: function ($elem) {
          return parseInt($elem.css("margin-left"), 10) * -1;
        },
        getTop: function ($elem) {
          return parseInt($elem.css("margin-top"), 10) * -1;
        },
      },
      transform: {
        getLeft: function ($elem) {
          var computedTransform = getComputedStyle($elem[0])[prefixedTransform];
          return computedTransform !== "none"
            ? parseInt(computedTransform.match(/(-?[0-9]+)/g)[4], 10) * -1
            : 0;
        },
        getTop: function ($elem) {
          var computedTransform = getComputedStyle($elem[0])[prefixedTransform];
          return computedTransform !== "none"
            ? parseInt(computedTransform.match(/(-?[0-9]+)/g)[5], 10) * -1
            : 0;
        },
      },
    },
    positionProperty = {
      position: {
        setLeft: function ($elem, left) {
          $elem.css("left", left);
        },
        setTop: function ($elem, top) {
          $elem.css("top", top);
        },
      },
      transform: {
        setPosition: function ($elem, left, startingLeft, top, startingTop) {
          $elem[0].style[prefixedTransform] =
            "translate3d(" +
            (left - startingLeft) +
            "px, " +
            (top - startingTop) +
            "px, 0)";
        },
      },
    },
    // Returns a function which adds a vendor prefix to any CSS property name
    vendorPrefix = (function () {
      var prefixes = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
        style = $("script")[0].style,
        prefix = "",
        prop;

      for (prop in style) {
        if (prefixes.test(prop)) {
          prefix = prop.match(prefixes)[0];
          break;
        }
      }

      if ("WebkitOpacity" in style) {
        prefix = "Webkit";
      }
      if ("KhtmlOpacity" in style) {
        prefix = "Khtml";
      }

      return function (property) {
        return (
          prefix +
          (prefix.length > 0
            ? property.charAt(0).toUpperCase() + property.slice(1)
            : property)
        );
      };
    })(),
    prefixedTransform = vendorPrefix("transform"),
    supportsBackgroundPositionXY =
      $("<div />", { style: "background:#fff" }).css(
        "background-position-x"
      ) !== undefined,
    setBackgroundPosition = supportsBackgroundPositionXY
      ? function ($elem, x, y) {
          $elem.css({
            "background-position-x": x,
            "background-position-y": y,
          });
        }
      : function ($elem, x, y) {
          $elem.css("background-position", x + " " + y);
        },
    getBackgroundPosition = supportsBackgroundPositionXY
      ? function ($elem) {
          return [
            $elem.css("background-position-x"),
            $elem.css("background-position-y"),
          ];
        }
      : function ($elem) {
          return $elem.css("background-position").split(" ");
        },
    requestAnimFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        setTimeout(callback, 1000 / 60);
      };

  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  Plugin.prototype = {
    init: function () {
      this.options.name = pluginName + "_" + Math.floor(Math.random() * 1e9);

      this._defineElements();
      this._defineGetters();
      this._defineSetters();
      this._handleWindowLoadAndResize();
      this._detectViewport();

      this.refresh({ firstLoad: true });

      if (this.options.scrollProperty === "scroll") {
        this._handleScrollEvent();
      } else {
        this._startAnimationLoop();
      }
    },
    _defineElements: function () {
      if (this.element === document.body) this.element = window;
      this.$scrollElement = $(this.element);
      this.$element = this.element === window ? $("body") : this.$scrollElement;
      this.$viewportElement =
        this.options.viewportElement !== undefined
          ? $(this.options.viewportElement)
          : this.$scrollElement[0] === window ||
            this.options.scrollProperty === "scroll"
          ? this.$scrollElement
          : this.$scrollElement.parent();
    },
    _defineGetters: function () {
      var self = this,
        scrollPropertyAdapter = scrollProperty[self.options.scrollProperty];

      this._getScrollLeft = function () {
        return scrollPropertyAdapter.getLeft(self.$scrollElement);
      };

      this._getScrollTop = function () {
        return scrollPropertyAdapter.getTop(self.$scrollElement);
      };
    },
    _defineSetters: function () {
      var self = this,
        scrollPropertyAdapter = scrollProperty[self.options.scrollProperty],
        positionPropertyAdapter =
          positionProperty[self.options.positionProperty],
        setScrollLeft = scrollPropertyAdapter.setLeft,
        setScrollTop = scrollPropertyAdapter.setTop;

      this._setScrollLeft =
        typeof setScrollLeft === "function"
          ? function (val) {
              setScrollLeft(self.$scrollElement, val);
            }
          : $.noop;

      this._setScrollTop =
        typeof setScrollTop === "function"
          ? function (val) {
              setScrollTop(self.$scrollElement, val);
            }
          : $.noop;

      this._setPosition =
        positionPropertyAdapter.setPosition ||
        function ($elem, left, startingLeft, top, startingTop) {
          if (self.options.horizontalScrolling) {
            positionPropertyAdapter.setLeft($elem, left, startingLeft);
          }

          if (self.options.verticalScrolling) {
            positionPropertyAdapter.setTop($elem, top, startingTop);
          }
        };
    },
    _handleWindowLoadAndResize: function () {
      var self = this,
        $window = $(window);

      if (self.options.responsive) {
        $window.bind("load." + this.name, function () {
          self.refresh();
        });
      }

      $window.bind("resize." + this.name, function () {
        self._detectViewport();

        if (self.options.responsive) {
          self.refresh();
        }
      });
    },
    refresh: function (options) {
      var self = this,
        oldLeft = self._getScrollLeft(),
        oldTop = self._getScrollTop();

      if (!options || !options.firstLoad) {
        this._reset();
      }

      this._setScrollLeft(0);
      this._setScrollTop(0);

      this._setOffsets();
      this._findParticles();
      this._findBackgrounds();

      // Fix for WebKit background rendering bug
      if (options && options.firstLoad && /WebKit/.test(navigator.userAgent)) {
        $(window).load(function () {
          var oldLeft = self._getScrollLeft(),
            oldTop = self._getScrollTop();

          self._setScrollLeft(oldLeft + 1);
          self._setScrollTop(oldTop + 1);

          self._setScrollLeft(oldLeft);
          self._setScrollTop(oldTop);
        });
      }

      this._setScrollLeft(oldLeft);
      this._setScrollTop(oldTop);
    },
    _detectViewport: function () {
      var viewportOffsets = this.$viewportElement.offset(),
        hasOffsets = viewportOffsets !== null && viewportOffsets !== undefined;

      this.viewportWidth = this.$viewportElement.width();
      this.viewportHeight = this.$viewportElement.height();

      this.viewportOffsetTop = hasOffsets ? viewportOffsets.top : 0;
      this.viewportOffsetLeft = hasOffsets ? viewportOffsets.left : 0;
    },
    _findParticles: function () {
      var self = this,
        scrollLeft = this._getScrollLeft(),
        scrollTop = this._getScrollTop();

      if (this.particles !== undefined) {
        for (var i = this.particles.length - 1; i >= 0; i--) {
          this.particles[i].$element.data("stellar-elementIsActive", undefined);
        }
      }

      this.particles = [];

      if (!this.options.parallaxElements) return;

      this.$element.find("[data-stellar-ratio]").each(function (i) {
        var $this = $(this),
          horizontalOffset,
          verticalOffset,
          positionLeft,
          positionTop,
          marginLeft,
          marginTop,
          $offsetParent,
          offsetLeft,
          offsetTop,
          parentOffsetLeft = 0,
          parentOffsetTop = 0,
          tempParentOffsetLeft = 0,
          tempParentOffsetTop = 0;

        // Ensure this element isn't already part of another scrolling element
        if (!$this.data("stellar-elementIsActive")) {
          $this.data("stellar-elementIsActive", this);
        } else if ($this.data("stellar-elementIsActive") !== this) {
          return;
        }

        self.options.showElement($this);

        // Save/restore the original top and left CSS values in case we refresh the particles or destroy the instance
        if (!$this.data("stellar-startingLeft")) {
          $this.data("stellar-startingLeft", $this.css("left"));
          $this.data("stellar-startingTop", $this.css("top"));
        } else {
          $this.css("left", $this.data("stellar-startingLeft"));
          $this.css("top", $this.data("stellar-startingTop"));
        }

        positionLeft = $this.position().left;
        positionTop = $this.position().top;

        // Catch-all for margin top/left properties (these evaluate to 'auto' in IE7 and IE8)
        marginLeft =
          $this.css("margin-left") === "auto"
            ? 0
            : parseInt($this.css("margin-left"), 10);
        marginTop =
          $this.css("margin-top") === "auto"
            ? 0
            : parseInt($this.css("margin-top"), 10);

        offsetLeft = $this.offset().left - marginLeft;
        offsetTop = $this.offset().top - marginTop;

        // Calculate the offset parent
        $this.parents().each(function () {
          var $this = $(this);

          if ($this.data("stellar-offset-parent") === true) {
            parentOffsetLeft = tempParentOffsetLeft;
            parentOffsetTop = tempParentOffsetTop;
            $offsetParent = $this;

            return false;
          } else {
            tempParentOffsetLeft += $this.position().left;
            tempParentOffsetTop += $this.position().top;
          }
        });

        // Detect the offsets
        horizontalOffset =
          $this.data("stellar-horizontal-offset") !== undefined
            ? $this.data("stellar-horizontal-offset")
            : $offsetParent !== undefined &&
              $offsetParent.data("stellar-horizontal-offset") !== undefined
            ? $offsetParent.data("stellar-horizontal-offset")
            : self.horizontalOffset;
        verticalOffset =
          $this.data("stellar-vertical-offset") !== undefined
            ? $this.data("stellar-vertical-offset")
            : $offsetParent !== undefined &&
              $offsetParent.data("stellar-vertical-offset") !== undefined
            ? $offsetParent.data("stellar-vertical-offset")
            : self.verticalOffset;

        // Add our object to the particles collection
        self.particles.push({
          $element: $this,
          $offsetParent: $offsetParent,
          isFixed: $this.css("position") === "fixed",
          horizontalOffset: horizontalOffset,
          verticalOffset: verticalOffset,
          startingPositionLeft: positionLeft,
          startingPositionTop: positionTop,
          startingOffsetLeft: offsetLeft,
          startingOffsetTop: offsetTop,
          parentOffsetLeft: parentOffsetLeft,
          parentOffsetTop: parentOffsetTop,
          stellarRatio:
            $this.data("stellar-ratio") !== undefined
              ? $this.data("stellar-ratio")
              : 1,
          width: $this.outerWidth(true),
          height: $this.outerHeight(true),
          isHidden: false,
        });
      });
    },
    _findBackgrounds: function () {
      var self = this,
        scrollLeft = this._getScrollLeft(),
        scrollTop = this._getScrollTop(),
        $backgroundElements;

      this.backgrounds = [];

      if (!this.options.parallaxBackgrounds) return;

      $backgroundElements = this.$element.find(
        "[data-stellar-background-ratio]"
      );

      if (this.$element.data("stellar-background-ratio")) {
        $backgroundElements = $backgroundElements.add(this.$element);
      }

      $backgroundElements.each(function () {
        var $this = $(this),
          backgroundPosition = getBackgroundPosition($this),
          horizontalOffset,
          verticalOffset,
          positionLeft,
          positionTop,
          marginLeft,
          marginTop,
          offsetLeft,
          offsetTop,
          $offsetParent,
          parentOffsetLeft = 0,
          parentOffsetTop = 0,
          tempParentOffsetLeft = 0,
          tempParentOffsetTop = 0;

        // Ensure this element isn't already part of another scrolling element
        if (!$this.data("stellar-backgroundIsActive")) {
          $this.data("stellar-backgroundIsActive", this);
        } else if ($this.data("stellar-backgroundIsActive") !== this) {
          return;
        }

        // Save/restore the original top and left CSS values in case we destroy the instance
        if (!$this.data("stellar-backgroundStartingLeft")) {
          $this.data("stellar-backgroundStartingLeft", backgroundPosition[0]);
          $this.data("stellar-backgroundStartingTop", backgroundPosition[1]);
        } else {
          setBackgroundPosition(
            $this,
            $this.data("stellar-backgroundStartingLeft"),
            $this.data("stellar-backgroundStartingTop")
          );
        }

        // Catch-all for margin top/left properties (these evaluate to 'auto' in IE7 and IE8)
        marginLeft =
          $this.css("margin-left") === "auto"
            ? 0
            : parseInt($this.css("margin-left"), 10);
        marginTop =
          $this.css("margin-top") === "auto"
            ? 0
            : parseInt($this.css("margin-top"), 10);

        offsetLeft = $this.offset().left - marginLeft - scrollLeft;
        offsetTop = $this.offset().top - marginTop - scrollTop;

        // Calculate the offset parent
        $this.parents().each(function () {
          var $this = $(this);

          if ($this.data("stellar-offset-parent") === true) {
            parentOffsetLeft = tempParentOffsetLeft;
            parentOffsetTop = tempParentOffsetTop;
            $offsetParent = $this;

            return false;
          } else {
            tempParentOffsetLeft += $this.position().left;
            tempParentOffsetTop += $this.position().top;
          }
        });

        // Detect the offsets
        horizontalOffset =
          $this.data("stellar-horizontal-offset") !== undefined
            ? $this.data("stellar-horizontal-offset")
            : $offsetParent !== undefined &&
              $offsetParent.data("stellar-horizontal-offset") !== undefined
            ? $offsetParent.data("stellar-horizontal-offset")
            : self.horizontalOffset;
        verticalOffset =
          $this.data("stellar-vertical-offset") !== undefined
            ? $this.data("stellar-vertical-offset")
            : $offsetParent !== undefined &&
              $offsetParent.data("stellar-vertical-offset") !== undefined
            ? $offsetParent.data("stellar-vertical-offset")
            : self.verticalOffset;

        self.backgrounds.push({
          $element: $this,
          $offsetParent: $offsetParent,
          isFixed: $this.css("background-attachment") === "fixed",
          horizontalOffset: horizontalOffset,
          verticalOffset: verticalOffset,
          startingValueLeft: backgroundPosition[0],
          startingValueTop: backgroundPosition[1],
          startingBackgroundPositionLeft: isNaN(
            parseInt(backgroundPosition[0], 10)
          )
            ? 0
            : parseInt(backgroundPosition[0], 10),
          startingBackgroundPositionTop: isNaN(
            parseInt(backgroundPosition[1], 10)
          )
            ? 0
            : parseInt(backgroundPosition[1], 10),
          startingPositionLeft: $this.position().left,
          startingPositionTop: $this.position().top,
          startingOffsetLeft: offsetLeft,
          startingOffsetTop: offsetTop,
          parentOffsetLeft: parentOffsetLeft,
          parentOffsetTop: parentOffsetTop,
          stellarRatio:
            $this.data("stellar-background-ratio") === undefined
              ? 1
              : $this.data("stellar-background-ratio"),
        });
      });
    },
    _reset: function () {
      var particle, startingPositionLeft, startingPositionTop, background, i;

      for (i = this.particles.length - 1; i >= 0; i--) {
        particle = this.particles[i];
        startingPositionLeft = particle.$element.data("stellar-startingLeft");
        startingPositionTop = particle.$element.data("stellar-startingTop");

        this._setPosition(
          particle.$element,
          startingPositionLeft,
          startingPositionLeft,
          startingPositionTop,
          startingPositionTop
        );

        this.options.showElement(particle.$element);

        particle.$element
          .data("stellar-startingLeft", null)
          .data("stellar-elementIsActive", null)
          .data("stellar-backgroundIsActive", null);
      }

      for (i = this.backgrounds.length - 1; i >= 0; i--) {
        background = this.backgrounds[i];

        background.$element
          .data("stellar-backgroundStartingLeft", null)
          .data("stellar-backgroundStartingTop", null);

        setBackgroundPosition(
          background.$element,
          background.startingValueLeft,
          background.startingValueTop
        );
      }
    },
    destroy: function () {
      this._reset();

      this.$scrollElement
        .unbind("resize." + this.name)
        .unbind("scroll." + this.name);
      this._animationLoop = $.noop;

      $(window)
        .unbind("load." + this.name)
        .unbind("resize." + this.name);
    },
    _setOffsets: function () {
      var self = this,
        $window = $(window);

      $window
        .unbind("resize.horizontal-" + this.name)
        .unbind("resize.vertical-" + this.name);

      if (typeof this.options.horizontalOffset === "function") {
        this.horizontalOffset = this.options.horizontalOffset();
        $window.bind("resize.horizontal-" + this.name, function () {
          self.horizontalOffset = self.options.horizontalOffset();
        });
      } else {
        this.horizontalOffset = this.options.horizontalOffset;
      }

      if (typeof this.options.verticalOffset === "function") {
        this.verticalOffset = this.options.verticalOffset();
        $window.bind("resize.vertical-" + this.name, function () {
          self.verticalOffset = self.options.verticalOffset();
        });
      } else {
        this.verticalOffset = this.options.verticalOffset;
      }
    },
    _repositionElements: function () {
      var scrollLeft = this._getScrollLeft(),
        scrollTop = this._getScrollTop(),
        horizontalOffset,
        verticalOffset,
        particle,
        fixedRatioOffset,
        background,
        bgLeft,
        bgTop,
        isVisibleVertical = true,
        isVisibleHorizontal = true,
        newPositionLeft,
        newPositionTop,
        newOffsetLeft,
        newOffsetTop,
        i;

      // First check that the scroll position or container size has changed
      if (
        this.currentScrollLeft === scrollLeft &&
        this.currentScrollTop === scrollTop &&
        this.currentWidth === this.viewportWidth &&
        this.currentHeight === this.viewportHeight
      ) {
        return;
      } else {
        this.currentScrollLeft = scrollLeft;
        this.currentScrollTop = scrollTop;
        this.currentWidth = this.viewportWidth;
        this.currentHeight = this.viewportHeight;
      }

      // Reposition elements
      for (i = this.particles.length - 1; i >= 0; i--) {
        particle = this.particles[i];

        fixedRatioOffset = particle.isFixed ? 1 : 0;

        // Calculate position, then calculate what the particle's new offset will be (for visibility check)
        if (this.options.horizontalScrolling) {
          newPositionLeft =
            (scrollLeft +
              particle.horizontalOffset +
              this.viewportOffsetLeft +
              particle.startingPositionLeft -
              particle.startingOffsetLeft +
              particle.parentOffsetLeft) *
              -(particle.stellarRatio + fixedRatioOffset - 1) +
            particle.startingPositionLeft;
          newOffsetLeft =
            newPositionLeft -
            particle.startingPositionLeft +
            particle.startingOffsetLeft;
        } else {
          newPositionLeft = particle.startingPositionLeft;
          newOffsetLeft = particle.startingOffsetLeft;
        }

        if (this.options.verticalScrolling) {
          newPositionTop =
            (scrollTop +
              particle.verticalOffset +
              this.viewportOffsetTop +
              particle.startingPositionTop -
              particle.startingOffsetTop +
              particle.parentOffsetTop) *
              -(particle.stellarRatio + fixedRatioOffset - 1) +
            particle.startingPositionTop;
          newOffsetTop =
            newPositionTop -
            particle.startingPositionTop +
            particle.startingOffsetTop;
        } else {
          newPositionTop = particle.startingPositionTop;
          newOffsetTop = particle.startingOffsetTop;
        }

        // Check visibility
        if (this.options.hideDistantElements) {
          isVisibleHorizontal =
            !this.options.horizontalScrolling ||
            (newOffsetLeft + particle.width >
              (particle.isFixed ? 0 : scrollLeft) &&
              newOffsetLeft <
                (particle.isFixed ? 0 : scrollLeft) +
                  this.viewportWidth +
                  this.viewportOffsetLeft);
          isVisibleVertical =
            !this.options.verticalScrolling ||
            (newOffsetTop + particle.height >
              (particle.isFixed ? 0 : scrollTop) &&
              newOffsetTop <
                (particle.isFixed ? 0 : scrollTop) +
                  this.viewportHeight +
                  this.viewportOffsetTop);
        }

        if (isVisibleHorizontal && isVisibleVertical) {
          if (particle.isHidden) {
            this.options.showElement(particle.$element);
            particle.isHidden = false;
          }

          this._setPosition(
            particle.$element,
            newPositionLeft,
            particle.startingPositionLeft,
            newPositionTop,
            particle.startingPositionTop
          );
        } else {
          if (!particle.isHidden) {
            this.options.hideElement(particle.$element);
            particle.isHidden = true;
          }
        }
      }

      // Reposition backgrounds
      for (i = this.backgrounds.length - 1; i >= 0; i--) {
        background = this.backgrounds[i];

        fixedRatioOffset = background.isFixed ? 0 : 1;
        bgLeft = this.options.horizontalScrolling
          ? (scrollLeft +
              background.horizontalOffset -
              this.viewportOffsetLeft -
              background.startingOffsetLeft +
              background.parentOffsetLeft -
              background.startingBackgroundPositionLeft) *
              (fixedRatioOffset - background.stellarRatio) +
            "px"
          : background.startingValueLeft;
        bgTop = this.options.verticalScrolling
          ? (scrollTop +
              background.verticalOffset -
              this.viewportOffsetTop -
              background.startingOffsetTop +
              background.parentOffsetTop -
              background.startingBackgroundPositionTop) *
              (fixedRatioOffset - background.stellarRatio) +
            "px"
          : background.startingValueTop;

        setBackgroundPosition(background.$element, bgLeft, bgTop);
      }
    },
    _handleScrollEvent: function () {
      var self = this,
        ticking = false;

      var update = function () {
        self._repositionElements();
        ticking = false;
      };

      var requestTick = function () {
        if (!ticking) {
          requestAnimFrame(update);
          ticking = true;
        }
      };

      this.$scrollElement.bind("scroll." + this.name, requestTick);
      requestTick();
    },
    _startAnimationLoop: function () {
      var self = this;

      this._animationLoop = function () {
        requestAnimFrame(self._animationLoop);
        self._repositionElements();
      };
      this._animationLoop();
    },
  };

  $.fn[pluginName] = function (options) {
    var args = arguments;
    if (options === undefined || typeof options === "object") {
      return this.each(function () {
        if (!$.data(this, "plugin_" + pluginName)) {
          $.data(this, "plugin_" + pluginName, new Plugin(this, options));
        }
      });
    } else if (
      typeof options === "string" &&
      options[0] !== "_" &&
      options !== "init"
    ) {
      return this.each(function () {
        var instance = $.data(this, "plugin_" + pluginName);
        if (
          instance instanceof Plugin &&
          typeof instance[options] === "function"
        ) {
          instance[options].apply(
            instance,
            Array.prototype.slice.call(args, 1)
          );
        }
        if (options === "destroy") {
          $.data(this, "plugin_" + pluginName, null);
        }
      });
    }
  };

  $[pluginName] = function (options) {
    var $window = $(window);
    return $window.stellar.apply(
      $window,
      Array.prototype.slice.call(arguments, 0)
    );
  };

  // Expose the scroll and position property function hashes so they can be extended
  $[pluginName].scrollProperty = scrollProperty;
  $[pluginName].positionProperty = positionProperty;

  // Expose the plugin class so it can be modified
  window.Stellar = Plugin;
})(jQuery, this, document);

function tab(o, s) {
  $obj = $(o);

  $obj.each(function () {
    var $this = $(this);
    var $total = $this.find("li").length;
    var $first = s - 1;
    var $prev = $first;
    var tab_id = new Array();
    var $btn = $this.find("li");
    var $start = $btn.eq($first);

    for (var i = 0; i < $total; i++) {
      if (!$btn.eq(i).hasClass("link")) {
        tab_id[i] = $btn.eq(i).find("a").attr("href");
        $(tab_id[i]).css("display", "none");
        $(tab_id[$first]).css("display", "block");
      } else {
        tab_id[i] = "none";
      }
    }

    $start.addClass("on");
    if ($start.find(">a>img.ovr").length > 0)
      $start.find(">a>img.ovr").imgConversion(true);

    $btn.bind("click", function () {
      var $this = $(this);
      var $index = $(this).index();

      if (!$this.hasClass("link")) {
        if ($this.find(">a>img.ovr").length > 0) {
          $this.parent().find("li.on").find(">a>img.ovr").imgConversion(false);
          $this.find(">a>img.ovr").imgConversion(true);
        }

        if (!$this.hasClass("on")) {
          $btn.each(function () {
            $(this).removeClass("on");
          });

          $this.addClass("on");
          $(tab_id[$prev]).css("display", "none");
          $(tab_id[$index]).css("display", "block");
          $prev = $index;
        }
        //예약현황시 스크롤 초기화
        if ($this.parent().parent().hasClass("tab_pro")) viewReset();
        return false;
      }
    });
  }); //each
} //tab

function tab_depth4(o, s) {
  $obj = $(o);

  $obj.each(function () {
    var $this = $(this);
    var $total = $this.find("li").length;
    var $first = s - 1;
    var $prev = $first;
    var tab_id = new Array();
    var $btn = $this.find("li");
    var $start = $btn.eq($first);
    var pos = new Array();
    var ml = new Array();
    var pl = new Array();
    var wl = new Array();
    var $parent = $this.parent();
    var arr = $('<span><img src="/images/bg/bg_tab_arr.gif" alt=""></span>');
    arr.css({
      position: "absolute",
      left: 0,
      top: 0,
    });

    for (var i = 0; i < $total; i++) {
      tab_id[i] = $btn.eq(i).find("a").attr("href");
      if (!$btn.eq(i).hasClass("link")) {
        pos[i] = $btn.eq(i).position().left;
        ml[i] = parseInt($btn.eq(i).css("margin-left"));
        pl[i] = parseInt($btn.eq(i).css("padding-left"));
        wl[i] = parseInt($btn.eq(i).find(">a").width());

        $(tab_id[i]).css("display", "none");
        $(tab_id[$first]).css("display", "block");
      }
    }

    $this.append(arr);
    arr.css({
      top: $parent.outerHeight() - 19,
      left: pos[$first] + ml[$first] + pl[$first] + wl[$first] / 2 - 5,
    });
    pos[0] = pos[0] - 7;
    pos[pos.length - 1] = pos[pos.length - 1] - 10;
    $start.addClass("on");

    $btn.bind("click", function () {
      var $this = $(this);
      var $index = $(this).index();
      if (!$this.hasClass("link")) {
        if (!$this.hasClass("on")) {
          $btn.each(function () {
            $(this).removeClass("on");
          });
          $this.addClass("on");
          $(tab_id[$prev]).css("display", "none");
          $(tab_id[$index]).css("display", "block");
          $prev = $index;
          arr.stop().animate(
            {
              /*"left":pos[$index] +  ($btn.eq($index).outerWidth(true) / 2) + 15*/
              left:
                $btn.eq($index).position().left +
                ml[$index] +
                pl[$index] +
                wl[$index] / 2 -
                7,
            },
            300
          );
        }
        //예약현황시 스크롤 초기화
        if ($this.parent().hasClass("myResInfo")) myHomeScroll1.refresh();
        return false;
      }
    });
  }); //each
} //tab

function tab_circle(o, s) {
  $obj = $(o);

  $obj.each(function () {
    var $this = $(this);
    var $total = $this.find("li").length;
    var $first = s - 1;
    var $prev = $first;
    var tab_id = new Array();
    var $btn = $this.find("li");
    var $start = $btn.eq($first);
    var pos = new Array();
    var $parent = $this.parent();
    var arr = $('<span><img src="/images/bg/bg_tab_arr.gif" alt=""></span>');
    arr.css({
      position: "absolute",
      left: 0,
      top: 0,
    });

    for (var i = 0; i < $total; i++) {
      tab_id[i] = $btn.eq(i).find("a").attr("href");
      pos[i] = $btn.eq(i).position().left;
      $(tab_id[i]).css("display", "none");
      $(tab_id[$first]).css("display", "block");
    }

    // console.log(pos);
    $this.append(arr);
    arr.css({
      top: $parent.outerHeight() - 19,
      left: pos[$first] + $btn.eq($first).outerWidth(true) / 2 + 7,
    });
    pos[0] = pos[0] - 7;
    pos[pos.length - 1] = pos[pos.length - 1] - 10;
    $start.addClass("on");

    $btn.bind("click", function () {
      var $this = $(this);
      var $index = $(this).index();

      if (!$this.hasClass("link")) {
        if (!$this.hasClass("on")) {
          $btn.each(function () {
            $(this).removeClass("on");
          });
          $this.addClass("on");
          $(tab_id[$prev]).css("display", "none");
          $(tab_id[$index]).css("display", "block");
          $prev = $index;
          arr.stop().animate(
            {
              left: pos[$index] + $btn.eq($index).outerWidth(true) / 2 + 15,
            },
            300
          );
        }
        //예약현황시 스크롤 초기화
        if ($this.parent().hasClass("myResInfo")) myHomeScroll1.refresh();
        return false;
      }
    });
  }); //each
} //tab

function bannerChange(obj) {
  var o = $(obj);
  o.each(function () {
    var $this = $(this);
    var activeNum = 0;
    var lst = $this.find(".banner_wrapper .lst");
    var total = lst.length;
    var action = $this.find(".motion");
    var controlBox = $this.find(".control"),
      result = controlBox.find(".result"),
      direction = controlBox.find(".prev , .next");

    var myInterval;

    var lstPrev = lst.eq(activeNum);
    lst.css("display", "none");
    lstPrev.css("display", "block");
    result
      .find(".num")
      .text(activeNum + 1)
      .end()
      .find(".total")
      .text(total);

    function boxAction(num) {
      lstPrev.css("display", "none");
      lst.eq(num).css("display", "block");
      result.find(".num").text(num + 1);
      lstPrev = lst.eq(num);
    }

    function directionMotion(pageing) {
      if (!action.is(":animated")) {
        if (pageing == "prev") {
          if (activeNum == 0) {
            activeNum = total - 1;
          } else {
            activeNum--;
          }
          boxAction(activeNum);
        } else {
          //next
          if (activeNum >= total - 1) {
            activeNum = 0;
          } else {
            activeNum++;
          }
          boxAction(activeNum);
        } //if
      } //is
    }

    direction.bind("click", function () {
      var c = $(this).attr("class");
      directionMotion(c);
    });
  });
} //bannerChange

function productAllMotion(sNum, sNum2) {
  var startNum = sNum;
  var startNum2 = 0;
  startNum2 = sNum2;
  var $container = $("#product_isotope");
  var scrollNewsStartFlag = false;
  var loadingImg = $("<img>")
    .addClass("loading")
    .attr("src", "../images/ico/ajax-loader.gif")
    .css({
      position: "absolute",
      left: "50%",
      top: "50%",
      "margin-left": -15,
      "margin-top": -30,
    });
  var cover = $('<div class="cover_white">');
  $container.packery({
    itemSelector: ".box_item",
    gutter: 7,
  });

  var box_loading = cover.append(loadingImg);
  /*
   */

  function ajaxData(t, src) {
    $.ajax({
      type: "GET",
      url: src,
      dataType: "html",
      success: function (data) {
        var $this = t;
        var cont = $this.find(".box_item_after");
        $("<div id='tmpData'></div>").html(data).appendTo(cont);
        var $data2 = cont.find("#tmpData").html();
        $("#tmpData").remove();
        cont.append($data2);
        cont.imagesLoaded(function () {
          if (isie7 || isie8) {
          } else {
            // not
            box_loading.animate({ opacity: 0 }, 500, function () {
              $(this).remove();
              boxClose();
              $this.addClass("on");
              $container.packery();
              if (cont.find(".bannerRolling").length > 0) {
                bannerChange(".bannerRolling");
              }
              tab_product(".after_content .tab", 1);
              $this
                .off("click")
                .on("click", ".box_item_after .close", boxClose);
              setTimeout(function () {
                $("body,html").animate(
                  { scrollTop: $this.offset().top - 110 },
                  500,
                  function () {}
                );
              }, 600);
            });
          }
        });
      },
      error: function (xhr, status, error) {
        alert(error);
      },
    });
  } //ajaxData

  function ajaxStartData(t, src, tn2) {
    $.ajax({
      type: "GET",
      url: src,
      dataType: "html",
      success: function (data) {
        var $this = t;
        var cont = $this.find(".box_item_after");
        $("<div id='tmpData'></div>").html(data).appendTo(cont);
        var $data2 = cont.find("#tmpData").html();
        $("#tmpData").remove();
        cont.append($data2);
        cont.imagesLoaded(function () {
          $(this).remove();
          boxClose();
          $this.addClass("on");
          $container.packery();
          if (cont.find(".bannerRolling").length > 0) {
            bannerChange(".bannerRolling");
          }
          if (tn2 > 0) {
            tab_product(".after_content .tab", tn2);
          } else {
            tab_product(".after_content .tab", 1);
          }
          $this.off("click").on("click", ".box_item_after .close", boxClose);
          setTimeout(function () {
            $("body,html").animate(
              { scrollTop: $this.offset().top - 110 },
              0,
              function () {}
            );
          }, 600);
        });
      },
      error: function (xhr, status, error) {
        alert(error);
      },
    });
  } //ajaxData

  function boxOnMotion(t) {
    var $this = t;
    var $parent = $this.parent();
    var src = $parent.data("ajaxdata");
    $parent.append(box_loading);
    if (isie7 || isie8) {
      ajaxData($parent, src);
    } else {
      box_loading.css("opacity", 0).animate({ opacity: 1 }, 500, function () {
        ajaxData($parent, src);
      });
    }
  }

  function boxStartMotion(t, t2) {
    var $this = t;
    var $parent = $this.parent();
    var src = $parent.data("ajaxdata");
    ajaxStartData($parent, src, t2);
  }

  function boxClose() {
    $("#product_isotope .box_item.on")
      .removeClass("on")
      .find(".box_item_after .after_content")
      .remove();
    $container.packery();
  }

  function tab_product(o, s) {
    $obj = $(o);

    $obj.each(function () {
      var $this = $(this);
      var $total = $this.find("li").length;
      var $first = s - 1;
      var $prev = $first;
      var tab_id = new Array();
      var $btn = $this.find("li");
      var $start = $btn.eq($first);

      for (var i = 0; i < $total; i++) {
        tab_id[i] = $btn.eq(i).find("a").attr("href");
        $(tab_id[i]).css("display", "none");
        $(tab_id[$first]).css("display", "block");
      }

      $start.addClass("on");

      $btn.bind("click", function () {
        var $this = $(this);
        var $index = $(this).index();

        if (!$this.hasClass("link")) {
          if (!$this.hasClass("on")) {
            $btn.each(function () {
              $(this).removeClass("on");
            });
            $this.addClass("on");
            $(tab_id[$prev]).css("display", "none");
            $(tab_id[$index]).css("display", "block");
            $prev = $index;
          }
          //예약현황시 스크롤 초기화
          $container.packery();

          return false;
        }
      });
    }); //each
  } //tab

  if (startNum > 0) {
    boxStartMotion(
      $(
        "#product_isotope > .box_item:eq(" +
          (startNum - 1) +
          ") > .box_item_before"
      ),
      startNum2
    );
  }

  $container.on("click", ".box_item > .box_item_before", function () {
    boxOnMotion($(this));
  });

  //$container.off("click.motionView").on( 'click.motionView', '.newsBox',marketViewMotion);
  //var marketImgLoad = imagesLoaded( $container );
}

function langAlign() {
  $(".language_box .img_on").css({
    left: $(".language_box > ul > li.on").position().left + "px",
    visibility: "visible",
  });
}

/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

(function () {
  function e() {}
  function t(e, t) {
    for (var n = e.length; n--; ) if (e[n].listener === t) return n;
    return -1;
  }
  function n(e) {
    return function () {
      return this[e].apply(this, arguments);
    };
  }
  var i = e.prototype,
    r = this,
    o = r.EventEmitter;
  (i.getListeners = function (e) {
    var t,
      n,
      i = this._getEvents();
    if ("object" == typeof e) {
      t = {};
      for (n in i) i.hasOwnProperty(n) && e.test(n) && (t[n] = i[n]);
    } else t = i[e] || (i[e] = []);
    return t;
  }),
    (i.flattenListeners = function (e) {
      var t,
        n = [];
      for (t = 0; e.length > t; t += 1) n.push(e[t].listener);
      return n;
    }),
    (i.getListenersAsObject = function (e) {
      var t,
        n = this.getListeners(e);
      return n instanceof Array && ((t = {}), (t[e] = n)), t || n;
    }),
    (i.addListener = function (e, n) {
      var i,
        r = this.getListenersAsObject(e),
        o = "object" == typeof n;
      for (i in r)
        r.hasOwnProperty(i) &&
          -1 === t(r[i], n) &&
          r[i].push(o ? n : { listener: n, once: !1 });
      return this;
    }),
    (i.on = n("addListener")),
    (i.addOnceListener = function (e, t) {
      return this.addListener(e, { listener: t, once: !0 });
    }),
    (i.once = n("addOnceListener")),
    (i.defineEvent = function (e) {
      return this.getListeners(e), this;
    }),
    (i.defineEvents = function (e) {
      for (var t = 0; e.length > t; t += 1) this.defineEvent(e[t]);
      return this;
    }),
    (i.removeListener = function (e, n) {
      var i,
        r,
        o = this.getListenersAsObject(e);
      for (r in o)
        o.hasOwnProperty(r) &&
          ((i = t(o[r], n)), -1 !== i && o[r].splice(i, 1));
      return this;
    }),
    (i.off = n("removeListener")),
    (i.addListeners = function (e, t) {
      return this.manipulateListeners(!1, e, t);
    }),
    (i.removeListeners = function (e, t) {
      return this.manipulateListeners(!0, e, t);
    }),
    (i.manipulateListeners = function (e, t, n) {
      var i,
        r,
        o = e ? this.removeListener : this.addListener,
        s = e ? this.removeListeners : this.addListeners;
      if ("object" != typeof t || t instanceof RegExp)
        for (i = n.length; i--; ) o.call(this, t, n[i]);
      else
        for (i in t)
          t.hasOwnProperty(i) &&
            (r = t[i]) &&
            ("function" == typeof r ? o.call(this, i, r) : s.call(this, i, r));
      return this;
    }),
    (i.removeEvent = function (e) {
      var t,
        n = typeof e,
        i = this._getEvents();
      if ("string" === n) delete i[e];
      else if ("object" === n)
        for (t in i) i.hasOwnProperty(t) && e.test(t) && delete i[t];
      else delete this._events;
      return this;
    }),
    (i.removeAllListeners = n("removeEvent")),
    (i.emitEvent = function (e, t) {
      var n,
        i,
        r,
        o,
        s = this.getListenersAsObject(e);
      for (r in s)
        if (s.hasOwnProperty(r))
          for (i = s[r].length; i--; )
            (n = s[r][i]),
              n.once === !0 && this.removeListener(e, n.listener),
              (o = n.listener.apply(this, t || [])),
              o === this._getOnceReturnValue() &&
                this.removeListener(e, n.listener);
      return this;
    }),
    (i.trigger = n("emitEvent")),
    (i.emit = function (e) {
      var t = Array.prototype.slice.call(arguments, 1);
      return this.emitEvent(e, t);
    }),
    (i.setOnceReturnValue = function (e) {
      return (this._onceReturnValue = e), this;
    }),
    (i._getOnceReturnValue = function () {
      return this.hasOwnProperty("_onceReturnValue")
        ? this._onceReturnValue
        : !0;
    }),
    (i._getEvents = function () {
      return this._events || (this._events = {});
    }),
    (e.noConflict = function () {
      return (r.EventEmitter = o), e;
    }),
    "function" == typeof define && define.amd
      ? define("eventEmitter/EventEmitter", [], function () {
          return e;
        })
      : "object" == typeof module && module.exports
      ? (module.exports = e)
      : (this.EventEmitter = e);
}).call(this),
  (function (e) {
    function t(t) {
      var n = e.event;
      return (n.target = n.target || n.srcElement || t), n;
    }
    var n = document.documentElement,
      i = function () {};
    n.addEventListener
      ? (i = function (e, t, n) {
          e.addEventListener(t, n, !1);
        })
      : n.attachEvent &&
        (i = function (e, n, i) {
          (e[n + i] = i.handleEvent
            ? function () {
                var n = t(e);
                i.handleEvent.call(i, n);
              }
            : function () {
                var n = t(e);
                i.call(e, n);
              }),
            e.attachEvent("on" + n, e[n + i]);
        });
    var r = function () {};
    n.removeEventListener
      ? (r = function (e, t, n) {
          e.removeEventListener(t, n, !1);
        })
      : n.detachEvent &&
        (r = function (e, t, n) {
          e.detachEvent("on" + t, e[t + n]);
          try {
            delete e[t + n];
          } catch (i) {
            e[t + n] = void 0;
          }
        });
    var o = { bind: i, unbind: r };
    "function" == typeof define && define.amd
      ? define("eventie/eventie", o)
      : (e.eventie = o);
  })(this),
  (function (e, t) {
    "function" == typeof define && define.amd
      ? define(
          ["eventEmitter/EventEmitter", "eventie/eventie"],
          function (n, i) {
            return t(e, n, i);
          }
        )
      : "object" == typeof exports
      ? (module.exports = t(
          e,
          require("wolfy87-eventemitter"),
          require("eventie")
        ))
      : (e.imagesLoaded = t(e, e.EventEmitter, e.eventie));
  })(window, function (e, t, n) {
    function i(e, t) {
      for (var n in t) e[n] = t[n];
      return e;
    }
    function r(e) {
      return "[object Array]" === d.call(e);
    }
    function o(e) {
      var t = [];
      if (r(e)) t = e;
      else if ("number" == typeof e.length)
        for (var n = 0, i = e.length; i > n; n++) t.push(e[n]);
      else t.push(e);
      return t;
    }
    function s(e, t, n) {
      if (!(this instanceof s)) return new s(e, t);
      "string" == typeof e && (e = document.querySelectorAll(e)),
        (this.elements = o(e)),
        (this.options = i({}, this.options)),
        "function" == typeof t ? (n = t) : i(this.options, t),
        n && this.on("always", n),
        this.getImages(),
        a && (this.jqDeferred = new a.Deferred());
      var r = this;
      setTimeout(function () {
        r.check();
      });
    }
    function f(e) {
      this.img = e;
    }
    function c(e) {
      (this.src = e), (v[e] = this);
    }
    var a = e.jQuery,
      u = e.console,
      h = u !== void 0,
      d = Object.prototype.toString;
    (s.prototype = new t()),
      (s.prototype.options = {}),
      (s.prototype.getImages = function () {
        this.images = [];
        for (var e = 0, t = this.elements.length; t > e; e++) {
          var n = this.elements[e];
          "IMG" === n.nodeName && this.addImage(n);
          var i = n.nodeType;
          if (i && (1 === i || 9 === i || 11 === i))
            for (
              var r = n.querySelectorAll("img"), o = 0, s = r.length;
              s > o;
              o++
            ) {
              var f = r[o];
              this.addImage(f);
            }
        }
      }),
      (s.prototype.addImage = function (e) {
        var t = new f(e);
        this.images.push(t);
      }),
      (s.prototype.check = function () {
        function e(e, r) {
          return (
            t.options.debug && h && u.log("confirm", e, r),
            t.progress(e),
            n++,
            n === i && t.complete(),
            !0
          );
        }
        var t = this,
          n = 0,
          i = this.images.length;
        if (((this.hasAnyBroken = !1), !i)) return this.complete(), void 0;
        for (var r = 0; i > r; r++) {
          var o = this.images[r];
          o.on("confirm", e), o.check();
        }
      }),
      (s.prototype.progress = function (e) {
        this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
        var t = this;
        setTimeout(function () {
          t.emit("progress", t, e),
            t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e);
        });
      }),
      (s.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = !0;
        var t = this;
        setTimeout(function () {
          if ((t.emit(e, t), t.emit("always", t), t.jqDeferred)) {
            var n = t.hasAnyBroken ? "reject" : "resolve";
            t.jqDeferred[n](t);
          }
        });
      }),
      a &&
        (a.fn.imagesLoaded = function (e, t) {
          var n = new s(this, e, t);
          return n.jqDeferred.promise(a(this));
        }),
      (f.prototype = new t()),
      (f.prototype.check = function () {
        var e = v[this.img.src] || new c(this.img.src);
        if (e.isConfirmed)
          return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
        if (this.img.complete && void 0 !== this.img.naturalWidth)
          return (
            this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0
          );
        var t = this;
        e.on("confirm", function (e, n) {
          return t.confirm(e.isLoaded, n), !0;
        }),
          e.check();
      }),
      (f.prototype.confirm = function (e, t) {
        (this.isLoaded = e), this.emit("confirm", this, t);
      });
    var v = {};
    return (
      (c.prototype = new t()),
      (c.prototype.check = function () {
        if (!this.isChecked) {
          var e = new Image();
          n.bind(e, "load", this),
            n.bind(e, "error", this),
            (e.src = this.src),
            (this.isChecked = !0);
        }
      }),
      (c.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
      }),
      (c.prototype.onload = function (e) {
        this.confirm(!0, "onload"), this.unbindProxyEvents(e);
      }),
      (c.prototype.onerror = function (e) {
        this.confirm(!1, "onerror"), this.unbindProxyEvents(e);
      }),
      (c.prototype.confirm = function (e, t) {
        (this.isConfirmed = !0),
          (this.isLoaded = e),
          this.emit("confirm", this, t);
      }),
      (c.prototype.unbindProxyEvents = function (e) {
        n.unbind(e.target, "load", this), n.unbind(e.target, "error", this);
      }),
      s
    );
  });

/*!
 * Packery PACKAGED v1.4.1
 * bin-packing layout library
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * http://packery.metafizzy.co
 * Copyright 2015 Metafizzy
 */

(function (t) {
  function e() {}
  function i(t) {
    function i(e) {
      e.prototype.option ||
        (e.prototype.option = function (e) {
          t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e));
        });
    }
    function o(e, i) {
      t.fn[e] = function (o) {
        if ("string" == typeof o) {
          for (
            var s = n.call(arguments, 1), a = 0, h = this.length;
            h > a;
            a++
          ) {
            var p = this[a],
              u = t.data(p, e);
            if (u)
              if (t.isFunction(u[o]) && "_" !== o.charAt(0)) {
                var c = u[o].apply(u, s);
                if (void 0 !== c) return c;
              } else r("no such method '" + o + "' for " + e + " instance");
            else
              r(
                "cannot call methods on " +
                  e +
                  " prior to initialization; " +
                  "attempted to call '" +
                  o +
                  "'"
              );
          }
          return this;
        }
        return this.each(function () {
          var n = t.data(this, e);
          n
            ? (n.option(o), n._init())
            : ((n = new i(this, o)), t.data(this, e, n));
        });
      };
    }
    if (t) {
      var r =
        "undefined" == typeof console
          ? e
          : function (t) {
              console.error(t);
            };
      return (
        (t.bridget = function (t, e) {
          i(e), o(t, e);
        }),
        t.bridget
      );
    }
  }
  var n = Array.prototype.slice;
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery.bridget", ["jquery"], i)
    : "object" == typeof exports
    ? i(require("jquery"))
    : i(t.jQuery);
})(window),
  (function (t) {
    function e(t) {
      return RegExp("(^|\\s+)" + t + "(\\s+|$)");
    }
    function i(t, e) {
      var i = n(t, e) ? r : o;
      i(t, e);
    }
    var n, o, r;
    "classList" in document.documentElement
      ? ((n = function (t, e) {
          return t.classList.contains(e);
        }),
        (o = function (t, e) {
          t.classList.add(e);
        }),
        (r = function (t, e) {
          t.classList.remove(e);
        }))
      : ((n = function (t, i) {
          return e(i).test(t.className);
        }),
        (o = function (t, e) {
          n(t, e) || (t.className = t.className + " " + e);
        }),
        (r = function (t, i) {
          t.className = t.className.replace(e(i), " ");
        }));
    var s = {
      hasClass: n,
      addClass: o,
      removeClass: r,
      toggleClass: i,
      has: n,
      add: o,
      remove: r,
      toggle: i,
    };
    "function" == typeof define && define.amd
      ? define("classie/classie", s)
      : "object" == typeof exports
      ? (module.exports = s)
      : (t.classie = s);
  })(window),
  (function (t) {
    function e(t) {
      if (t) {
        if ("string" == typeof n[t]) return t;
        t = t.charAt(0).toUpperCase() + t.slice(1);
        for (var e, o = 0, r = i.length; r > o; o++)
          if (((e = i[o] + t), "string" == typeof n[e])) return e;
      }
    }
    var i = "Webkit Moz ms Ms O".split(" "),
      n = document.documentElement.style;
    "function" == typeof define && define.amd
      ? define("get-style-property/get-style-property", [], function () {
          return e;
        })
      : "object" == typeof exports
      ? (module.exports = e)
      : (t.getStyleProperty = e);
  })(window),
  (function (t) {
    function e(t) {
      var e = parseFloat(t),
        i = -1 === t.indexOf("%") && !isNaN(e);
      return i && e;
    }
    function i() {}
    function n() {
      for (
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          e = 0,
          i = s.length;
        i > e;
        e++
      ) {
        var n = s[e];
        t[n] = 0;
      }
      return t;
    }
    function o(i) {
      function o() {
        if (!d) {
          d = !0;
          var n = t.getComputedStyle;
          if (
            ((p = (function () {
              var t = n
                ? function (t) {
                    return n(t, null);
                  }
                : function (t) {
                    return t.currentStyle;
                  };
              return function (e) {
                var i = t(e);
                return (
                  i ||
                    r(
                      "Style returned " +
                        i +
                        ". Are you running this code in a hidden iframe on Firefox? " +
                        "See http://bit.ly/getsizebug1"
                    ),
                  i
                );
              };
            })()),
            (u = i("boxSizing")))
          ) {
            var o = document.createElement("div");
            (o.style.width = "200px"),
              (o.style.padding = "1px 2px 3px 4px"),
              (o.style.borderStyle = "solid"),
              (o.style.borderWidth = "1px 2px 3px 4px"),
              (o.style[u] = "border-box");
            var s = document.body || document.documentElement;
            s.appendChild(o);
            var a = p(o);
            (c = 200 === e(a.width)), s.removeChild(o);
          }
        }
      }
      function a(t) {
        if (
          (o(),
          "string" == typeof t && (t = document.querySelector(t)),
          t && "object" == typeof t && t.nodeType)
        ) {
          var i = p(t);
          if ("none" === i.display) return n();
          var r = {};
          (r.width = t.offsetWidth), (r.height = t.offsetHeight);
          for (
            var a = (r.isBorderBox = !(!u || !i[u] || "border-box" !== i[u])),
              d = 0,
              l = s.length;
            l > d;
            d++
          ) {
            var f = s[d],
              y = i[f];
            y = h(t, y);
            var m = parseFloat(y);
            r[f] = isNaN(m) ? 0 : m;
          }
          var g = r.paddingLeft + r.paddingRight,
            v = r.paddingTop + r.paddingBottom,
            x = r.marginLeft + r.marginRight,
            E = r.marginTop + r.marginBottom,
            b = r.borderLeftWidth + r.borderRightWidth,
            w = r.borderTopWidth + r.borderBottomWidth,
            _ = a && c,
            T = e(i.width);
          T !== !1 && (r.width = T + (_ ? 0 : g + b));
          var z = e(i.height);
          return (
            z !== !1 && (r.height = z + (_ ? 0 : v + w)),
            (r.innerWidth = r.width - (g + b)),
            (r.innerHeight = r.height - (v + w)),
            (r.outerWidth = r.width + x),
            (r.outerHeight = r.height + E),
            r
          );
        }
      }
      function h(e, i) {
        if (t.getComputedStyle || -1 === i.indexOf("%")) return i;
        var n = e.style,
          o = n.left,
          r = e.runtimeStyle,
          s = r && r.left;
        return (
          s && (r.left = e.currentStyle.left),
          (n.left = i),
          (i = n.pixelLeft),
          (n.left = o),
          s && (r.left = s),
          i
        );
      }
      var p,
        u,
        c,
        d = !1;
      return a;
    }
    var r =
        "undefined" == typeof console
          ? i
          : function (t) {
              console.error(t);
            },
      s = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ];
    "function" == typeof define && define.amd
      ? define(
          "get-size/get-size",
          ["get-style-property/get-style-property"],
          o
        )
      : "object" == typeof exports
      ? (module.exports = o(require("desandro-get-style-property")))
      : (t.getSize = o(t.getStyleProperty));
  })(window),
  (function (t) {
    function e(e) {
      var i = t.event;
      return (i.target = i.target || i.srcElement || e), i;
    }
    var i = document.documentElement,
      n = function () {};
    i.addEventListener
      ? (n = function (t, e, i) {
          t.addEventListener(e, i, !1);
        })
      : i.attachEvent &&
        (n = function (t, i, n) {
          (t[i + n] = n.handleEvent
            ? function () {
                var i = e(t);
                n.handleEvent.call(n, i);
              }
            : function () {
                var i = e(t);
                n.call(t, i);
              }),
            t.attachEvent("on" + i, t[i + n]);
        });
    var o = function () {};
    i.removeEventListener
      ? (o = function (t, e, i) {
          t.removeEventListener(e, i, !1);
        })
      : i.detachEvent &&
        (o = function (t, e, i) {
          t.detachEvent("on" + e, t[e + i]);
          try {
            delete t[e + i];
          } catch (n) {
            t[e + i] = void 0;
          }
        });
    var r = { bind: n, unbind: o };
    "function" == typeof define && define.amd
      ? define("eventie/eventie", r)
      : "object" == typeof exports
      ? (module.exports = r)
      : (t.eventie = r);
  })(window),
  function () {
    function t() {}
    function e(t, e) {
      for (var i = t.length; i--; ) if (t[i].listener === e) return i;
      return -1;
    }
    function i(t) {
      return function () {
        return this[t].apply(this, arguments);
      };
    }
    var n = t.prototype,
      o = this,
      r = o.EventEmitter;
    (n.getListeners = function (t) {
      var e,
        i,
        n = this._getEvents();
      if (t instanceof RegExp) {
        e = {};
        for (i in n) n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i]);
      } else e = n[t] || (n[t] = []);
      return e;
    }),
      (n.flattenListeners = function (t) {
        var e,
          i = [];
        for (e = 0; t.length > e; e += 1) i.push(t[e].listener);
        return i;
      }),
      (n.getListenersAsObject = function (t) {
        var e,
          i = this.getListeners(t);
        return i instanceof Array && ((e = {}), (e[t] = i)), e || i;
      }),
      (n.addListener = function (t, i) {
        var n,
          o = this.getListenersAsObject(t),
          r = "object" == typeof i;
        for (n in o)
          o.hasOwnProperty(n) &&
            -1 === e(o[n], i) &&
            o[n].push(r ? i : { listener: i, once: !1 });
        return this;
      }),
      (n.on = i("addListener")),
      (n.addOnceListener = function (t, e) {
        return this.addListener(t, { listener: e, once: !0 });
      }),
      (n.once = i("addOnceListener")),
      (n.defineEvent = function (t) {
        return this.getListeners(t), this;
      }),
      (n.defineEvents = function (t) {
        for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]);
        return this;
      }),
      (n.removeListener = function (t, i) {
        var n,
          o,
          r = this.getListenersAsObject(t);
        for (o in r)
          r.hasOwnProperty(o) &&
            ((n = e(r[o], i)), -1 !== n && r[o].splice(n, 1));
        return this;
      }),
      (n.off = i("removeListener")),
      (n.addListeners = function (t, e) {
        return this.manipulateListeners(!1, t, e);
      }),
      (n.removeListeners = function (t, e) {
        return this.manipulateListeners(!0, t, e);
      }),
      (n.manipulateListeners = function (t, e, i) {
        var n,
          o,
          r = t ? this.removeListener : this.addListener,
          s = t ? this.removeListeners : this.addListeners;
        if ("object" != typeof e || e instanceof RegExp)
          for (n = i.length; n--; ) r.call(this, e, i[n]);
        else
          for (n in e)
            e.hasOwnProperty(n) &&
              (o = e[n]) &&
              ("function" == typeof o
                ? r.call(this, n, o)
                : s.call(this, n, o));
        return this;
      }),
      (n.removeEvent = function (t) {
        var e,
          i = typeof t,
          n = this._getEvents();
        if ("string" === i) delete n[t];
        else if (t instanceof RegExp)
          for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e];
        else delete this._events;
        return this;
      }),
      (n.removeAllListeners = i("removeEvent")),
      (n.emitEvent = function (t, e) {
        var i,
          n,
          o,
          r,
          s = this.getListenersAsObject(t);
        for (o in s)
          if (s.hasOwnProperty(o))
            for (n = s[o].length; n--; )
              (i = s[o][n]),
                i.once === !0 && this.removeListener(t, i.listener),
                (r = i.listener.apply(this, e || [])),
                r === this._getOnceReturnValue() &&
                  this.removeListener(t, i.listener);
        return this;
      }),
      (n.trigger = i("emitEvent")),
      (n.emit = function (t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e);
      }),
      (n.setOnceReturnValue = function (t) {
        return (this._onceReturnValue = t), this;
      }),
      (n._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue")
          ? this._onceReturnValue
          : !0;
      }),
      (n._getEvents = function () {
        return this._events || (this._events = {});
      }),
      (t.noConflict = function () {
        return (o.EventEmitter = r), t;
      }),
      "function" == typeof define && define.amd
        ? define("eventEmitter/EventEmitter", [], function () {
            return t;
          })
        : "object" == typeof module && module.exports
        ? (module.exports = t)
        : (o.EventEmitter = t);
  }.call(this),
  (function (t) {
    function e(t) {
      "function" == typeof t && (e.isReady ? t() : s.push(t));
    }
    function i(t) {
      var i = "readystatechange" === t.type && "complete" !== r.readyState;
      e.isReady || i || n();
    }
    function n() {
      e.isReady = !0;
      for (var t = 0, i = s.length; i > t; t++) {
        var n = s[t];
        n();
      }
    }
    function o(o) {
      return (
        "complete" === r.readyState
          ? n()
          : (o.bind(r, "DOMContentLoaded", i),
            o.bind(r, "readystatechange", i),
            o.bind(t, "load", i)),
        e
      );
    }
    var r = t.document,
      s = [];
    (e.isReady = !1),
      "function" == typeof define && define.amd
        ? define("doc-ready/doc-ready", ["eventie/eventie"], o)
        : "object" == typeof exports
        ? (module.exports = o(require("eventie")))
        : (t.docReady = o(t.eventie));
  })(window),
  (function (t) {
    function e(t, e) {
      return t[s](e);
    }
    function i(t) {
      if (!t.parentNode) {
        var e = document.createDocumentFragment();
        e.appendChild(t);
      }
    }
    function n(t, e) {
      i(t);
      for (
        var n = t.parentNode.querySelectorAll(e), o = 0, r = n.length;
        r > o;
        o++
      )
        if (n[o] === t) return !0;
      return !1;
    }
    function o(t, n) {
      return i(t), e(t, n);
    }
    var r,
      s = (function () {
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (
          var e = ["webkit", "moz", "ms", "o"], i = 0, n = e.length;
          n > i;
          i++
        ) {
          var o = e[i],
            r = o + "MatchesSelector";
          if (t[r]) return r;
        }
      })();
    if (s) {
      var a = document.createElement("div"),
        h = e(a, "div");
      r = h ? e : o;
    } else r = n;
    "function" == typeof define && define.amd
      ? define("matches-selector/matches-selector", [], function () {
          return r;
        })
      : "object" == typeof exports
      ? (module.exports = r)
      : (window.matchesSelector = r);
  })(Element.prototype),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["doc-ready/doc-ready", "matches-selector/matches-selector"],
          function (i, n) {
            return e(t, i, n);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          t,
          require("doc-ready"),
          require("desandro-matches-selector")
        ))
      : (t.fizzyUIUtils = e(t, t.docReady, t.matchesSelector));
  })(window, function (t, e, i) {
    var n = {};
    (n.extend = function (t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }),
      (n.modulo = function (t, e) {
        return ((t % e) + e) % e;
      });
    var o = Object.prototype.toString;
    (n.isArray = function (t) {
      return "[object Array]" == o.call(t);
    }),
      (n.makeArray = function (t) {
        var e = [];
        if (n.isArray(t)) e = t;
        else if (t && "number" == typeof t.length)
          for (var i = 0, o = t.length; o > i; i++) e.push(t[i]);
        else e.push(t);
        return e;
      }),
      (n.indexOf = Array.prototype.indexOf
        ? function (t, e) {
            return t.indexOf(e);
          }
        : function (t, e) {
            for (var i = 0, n = t.length; n > i; i++) if (t[i] === e) return i;
            return -1;
          }),
      (n.removeFrom = function (t, e) {
        var i = n.indexOf(t, e);
        -1 != i && t.splice(i, 1);
      }),
      (n.isElement =
        "function" == typeof HTMLElement || "object" == typeof HTMLElement
          ? function (t) {
              return t instanceof HTMLElement;
            }
          : function (t) {
              return (
                t &&
                "object" == typeof t &&
                1 == t.nodeType &&
                "string" == typeof t.nodeName
              );
            }),
      (n.setText = (function () {
        function t(t, i) {
          (e =
            e ||
            (void 0 !== document.documentElement.textContent
              ? "textContent"
              : "innerText")),
            (t[e] = i);
        }
        var e;
        return t;
      })()),
      (n.getParent = function (t, e) {
        for (; t != document.body; )
          if (((t = t.parentNode), i(t, e))) return t;
      }),
      (n.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t;
      }),
      (n.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (n.filterFindElements = function (t, e) {
        t = n.makeArray(t);
        for (var o = [], r = 0, s = t.length; s > r; r++) {
          var a = t[r];
          if (n.isElement(a))
            if (e) {
              i(a, e) && o.push(a);
              for (
                var h = a.querySelectorAll(e), p = 0, u = h.length;
                u > p;
                p++
              )
                o.push(h[p]);
            } else o.push(a);
        }
        return o;
      }),
      (n.debounceMethod = function (t, e, i) {
        var n = t.prototype[e],
          o = e + "Timeout";
        t.prototype[e] = function () {
          var t = this[o];
          t && clearTimeout(t);
          var e = arguments,
            r = this;
          this[o] = setTimeout(function () {
            n.apply(r, e), delete r[o];
          }, i || 100);
        };
      }),
      (n.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i;
          })
          .toLowerCase();
      });
    var r = t.console;
    return (
      (n.htmlInit = function (i, o) {
        e(function () {
          for (
            var e = n.toDashed(o),
              s = document.querySelectorAll(".js-" + e),
              a = "data-" + e + "-options",
              h = 0,
              p = s.length;
            p > h;
            h++
          ) {
            var u,
              c = s[h],
              d = c.getAttribute(a);
            try {
              u = d && JSON.parse(d);
            } catch (l) {
              r &&
                r.error(
                  "Error parsing " +
                    a +
                    " on " +
                    c.nodeName.toLowerCase() +
                    (c.id ? "#" + c.id : "") +
                    ": " +
                    l
                );
              continue;
            }
            var f = new i(c, u),
              y = t.jQuery;
            y && y.data(c, o, f);
          }
        });
      }),
      n
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "outlayer/item",
          [
            "eventEmitter/EventEmitter",
            "get-size/get-size",
            "get-style-property/get-style-property",
            "fizzy-ui-utils/utils",
          ],
          function (i, n, o, r) {
            return e(t, i, n, o, r);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          t,
          require("wolfy87-eventemitter"),
          require("get-size"),
          require("desandro-get-style-property"),
          require("fizzy-ui-utils")
        ))
      : ((t.Outlayer = {}),
        (t.Outlayer.Item = e(
          t,
          t.EventEmitter,
          t.getSize,
          t.getStyleProperty,
          t.fizzyUIUtils
        )));
  })(window, function (t, e, i, n, o) {
    function r(t) {
      for (var e in t) return !1;
      return (e = null), !0;
    }
    function s(t, e) {
      t &&
        ((this.element = t),
        (this.layout = e),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    var a = t.getComputedStyle,
      h = a
        ? function (t) {
            return a(t, null);
          }
        : function (t) {
            return t.currentStyle;
          },
      p = n("transition"),
      u = n("transform"),
      c = p && u,
      d = !!n("perspective"),
      l = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "otransitionend",
        transition: "transitionend",
      }[p],
      f = [
        "transform",
        "transition",
        "transitionDuration",
        "transitionProperty",
      ],
      y = (function () {
        for (var t = {}, e = 0, i = f.length; i > e; e++) {
          var o = f[e],
            r = n(o);
          r && r !== o && (t[o] = r);
        }
        return t;
      })();
    o.extend(s.prototype, e.prototype),
      (s.prototype._create = function () {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: "absolute" });
      }),
      (s.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (s.prototype.getSize = function () {
        this.size = i(this.element);
      }),
      (s.prototype.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
          var n = y[i] || i;
          e[n] = t[i];
        }
      }),
      (s.prototype.getPosition = function () {
        var t = h(this.element),
          e = this.layout.options,
          i = e.isOriginLeft,
          n = e.isOriginTop,
          o = parseInt(t[i ? "left" : "right"], 10),
          r = parseInt(t[n ? "top" : "bottom"], 10);
        (o = isNaN(o) ? 0 : o), (r = isNaN(r) ? 0 : r);
        var s = this.layout.size;
        (o -= i ? s.paddingLeft : s.paddingRight),
          (r -= n ? s.paddingTop : s.paddingBottom),
          (this.position.x = o),
          (this.position.y = r);
      }),
      (s.prototype.layoutPosition = function () {
        var t = this.layout.size,
          e = this.layout.options,
          i = {},
          n = e.isOriginLeft ? "paddingLeft" : "paddingRight",
          o = e.isOriginLeft ? "left" : "right",
          r = e.isOriginLeft ? "right" : "left",
          s = this.position.x + t[n];
        (s =
          e.percentPosition && !e.isHorizontal
            ? 100 * (s / t.width) + "%"
            : s + "px"),
          (i[o] = s),
          (i[r] = "");
        var a = e.isOriginTop ? "paddingTop" : "paddingBottom",
          h = e.isOriginTop ? "top" : "bottom",
          p = e.isOriginTop ? "bottom" : "top",
          u = this.position.y + t[a];
        (u =
          e.percentPosition && e.isHorizontal
            ? 100 * (u / t.height) + "%"
            : u + "px"),
          (i[h] = u),
          (i[p] = ""),
          this.css(i),
          this.emitEvent("layout", [this]);
      });
    var m = d
      ? function (t, e) {
          return "translate3d(" + t + "px, " + e + "px, 0)";
        }
      : function (t, e) {
          return "translate(" + t + "px, " + e + "px)";
        };
    (s.prototype._transitionTo = function (t, e) {
      this.getPosition();
      var i = this.position.x,
        n = this.position.y,
        o = parseInt(t, 10),
        r = parseInt(e, 10),
        s = o === this.position.x && r === this.position.y;
      if ((this.setPosition(t, e), s && !this.isTransitioning))
        return this.layoutPosition(), void 0;
      var a = t - i,
        h = e - n,
        p = {},
        u = this.layout.options;
      (a = u.isOriginLeft ? a : -a),
        (h = u.isOriginTop ? h : -h),
        (p.transform = m(a, h)),
        this.transition({
          to: p,
          onTransitionEnd: { transform: this.layoutPosition },
          isCleaning: !0,
        });
    }),
      (s.prototype.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition();
      }),
      (s.prototype.moveTo = c ? s.prototype._transitionTo : s.prototype.goTo),
      (s.prototype.setPosition = function (t, e) {
        (this.position.x = parseInt(t, 10)),
          (this.position.y = parseInt(e, 10));
      }),
      (s.prototype._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
      }),
      (s.prototype._transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration))
          return this._nonTransition(t), void 0;
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to)
          (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
          this.css(t.from);
          var n = this.element.offsetHeight;
          n = null;
        }
        this.enableTransition(t.to),
          this.css(t.to),
          (this.isTransitioning = !0);
      });
    var g = u && o.toDashed(u) + ",opacity";
    (s.prototype.enableTransition = function () {
      this.isTransitioning ||
        (this.css({
          transitionProperty: g,
          transitionDuration: this.layout.options.transitionDuration,
        }),
        this.element.addEventListener(l, this, !1));
    }),
      (s.prototype.transition =
        s.prototype[p ? "_transition" : "_nonTransition"]),
      (s.prototype.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t);
      }),
      (s.prototype.onotransitionend = function (t) {
        this.ontransitionend(t);
      });
    var v = {
      "-webkit-transform": "transform",
      "-moz-transform": "transform",
      "-o-transform": "transform",
    };
    (s.prototype.ontransitionend = function (t) {
      if (t.target === this.element) {
        var e = this._transn,
          i = v[t.propertyName] || t.propertyName;
        if (
          (delete e.ingProperties[i],
          r(e.ingProperties) && this.disableTransition(),
          i in e.clean &&
            ((this.element.style[t.propertyName] = ""), delete e.clean[i]),
          i in e.onEnd)
        ) {
          var n = e.onEnd[i];
          n.call(this), delete e.onEnd[i];
        }
        this.emitEvent("transitionEnd", [this]);
      }
    }),
      (s.prototype.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(l, this, !1),
          (this.isTransitioning = !1);
      }),
      (s.prototype._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e);
      });
    var x = { transitionProperty: "", transitionDuration: "" };
    return (
      (s.prototype.removeTransitionStyles = function () {
        this.css(x);
      }),
      (s.prototype.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: "" }),
          this.emitEvent("remove", [this]);
      }),
      (s.prototype.remove = function () {
        if (!p || !parseFloat(this.layout.options.transitionDuration))
          return this.removeElem(), void 0;
        var t = this;
        this.once("transitionEnd", function () {
          t.removeElem();
        }),
          this.hide();
      }),
      (s.prototype.reveal = function () {
        delete this.isHidden, this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("visibleStyle");
        (e[i] = this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (s.prototype.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal");
      }),
      (s.prototype.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i;
      }),
      (s.prototype.hide = function () {
        (this.isHidden = !0), this.css({ display: "" });
        var t = this.layout.options,
          e = {},
          i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        (e[i] = this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (s.prototype.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({ display: "none" }), this.emitEvent("hide"));
      }),
      (s.prototype.destroy = function () {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: "",
        });
      }),
      s
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "outlayer/outlayer",
          [
            "eventie/eventie",
            "eventEmitter/EventEmitter",
            "get-size/get-size",
            "fizzy-ui-utils/utils",
            "./item",
          ],
          function (i, n, o, r, s) {
            return e(t, i, n, o, r, s);
          }
        )
      : "object" == typeof exports
      ? (module.exports = e(
          t,
          require("eventie"),
          require("wolfy87-eventemitter"),
          require("get-size"),
          require("fizzy-ui-utils"),
          require("./item")
        ))
      : (t.Outlayer = e(
          t,
          t.eventie,
          t.EventEmitter,
          t.getSize,
          t.fizzyUIUtils,
          t.Outlayer.Item
        ));
  })(window, function (t, e, i, n, o, r) {
    function s(t, e) {
      var i = o.getQueryElement(t);
      if (!i)
        return (
          a &&
            a.error(
              "Bad element for " + this.constructor.namespace + ": " + (i || t)
            ),
          void 0
        );
      (this.element = i),
        h && (this.$element = h(this.element)),
        (this.options = o.extend({}, this.constructor.defaults)),
        this.option(e);
      var n = ++u;
      (this.element.outlayerGUID = n),
        (c[n] = this),
        this._create(),
        this.options.isInitLayout && this.layout();
    }
    var a = t.console,
      h = t.jQuery,
      p = function () {},
      u = 0,
      c = {};
    return (
      (s.namespace = "outlayer"),
      (s.Item = r),
      (s.defaults = {
        containerStyle: { position: "relative" },
        isInitLayout: !0,
        isOriginLeft: !0,
        isOriginTop: !0,
        isResizeBound: !0,
        isResizingContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" },
      }),
      o.extend(s.prototype, i.prototype),
      (s.prototype.option = function (t) {
        o.extend(this.options, t);
      }),
      (s.prototype._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          o.extend(this.element.style, this.options.containerStyle),
          this.options.isResizeBound && this.bindResize();
      }),
      (s.prototype.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      }),
      (s.prototype._itemize = function (t) {
        for (
          var e = this._filterFindItemElements(t),
            i = this.constructor.Item,
            n = [],
            o = 0,
            r = e.length;
          r > o;
          o++
        ) {
          var s = e[o],
            a = new i(s, this);
          n.push(a);
        }
        return n;
      }),
      (s.prototype._filterFindItemElements = function (t) {
        return o.filterFindElements(t, this.options.itemSelector);
      }),
      (s.prototype.getItemElements = function () {
        for (var t = [], e = 0, i = this.items.length; i > e; e++)
          t.push(this.items[e].element);
        return t;
      }),
      (s.prototype.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t =
          void 0 !== this.options.isLayoutInstant
            ? this.options.isLayoutInstant
            : !this._isLayoutInited;
        this.layoutItems(this.items, t), (this._isLayoutInited = !0);
      }),
      (s.prototype._init = s.prototype.layout),
      (s.prototype._resetLayout = function () {
        this.getSize();
      }),
      (s.prototype.getSize = function () {
        this.size = n(this.element);
      }),
      (s.prototype._getMeasurement = function (t, e) {
        var i,
          r = this.options[t];
        r
          ? ("string" == typeof r
              ? (i = this.element.querySelector(r))
              : o.isElement(r) && (i = r),
            (this[t] = i ? n(i)[e] : r))
          : (this[t] = 0);
      }),
      (s.prototype.layoutItems = function (t, e) {
        (t = this._getItemsForLayout(t)),
          this._layoutItems(t, e),
          this._postLayout();
      }),
      (s.prototype._getItemsForLayout = function (t) {
        for (var e = [], i = 0, n = t.length; n > i; i++) {
          var o = t[i];
          o.isIgnored || e.push(o);
        }
        return e;
      }),
      (s.prototype._layoutItems = function (t, e) {
        if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
          for (var i = [], n = 0, o = t.length; o > n; n++) {
            var r = t[n],
              s = this._getItemLayoutPosition(r);
            (s.item = r), (s.isInstant = e || r.isLayoutInstant), i.push(s);
          }
          this._processLayoutQueue(i);
        }
      }),
      (s.prototype._getItemLayoutPosition = function () {
        return { x: 0, y: 0 };
      }),
      (s.prototype._processLayoutQueue = function (t) {
        for (var e = 0, i = t.length; i > e; e++) {
          var n = t[e];
          this._positionItem(n.item, n.x, n.y, n.isInstant);
        }
      }),
      (s.prototype._positionItem = function (t, e, i, n) {
        n ? t.goTo(e, i) : t.moveTo(e, i);
      }),
      (s.prototype._postLayout = function () {
        this.resizeContainer();
      }),
      (s.prototype.resizeContainer = function () {
        if (this.options.isResizingContainer) {
          var t = this._getContainerSize();
          t &&
            (this._setContainerMeasure(t.width, !0),
            this._setContainerMeasure(t.height, !1));
        }
      }),
      (s.prototype._getContainerSize = p),
      (s.prototype._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
          var i = this.size;
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft +
                i.paddingRight +
                i.borderLeftWidth +
                i.borderRightWidth
              : i.paddingBottom +
                i.paddingTop +
                i.borderTopWidth +
                i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? "width" : "height"] = t + "px");
        }
      }),
      (s.prototype._emitCompleteOnItems = function (t, e) {
        function i() {
          o.emitEvent(t + "Complete", [e]);
        }
        function n() {
          s++, s === r && i();
        }
        var o = this,
          r = e.length;
        if (!e || !r) return i(), void 0;
        for (var s = 0, a = 0, h = e.length; h > a; a++) {
          var p = e[a];
          p.once(t, n);
        }
      }),
      (s.prototype.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
      }),
      (s.prototype.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
      }),
      (s.prototype.stamp = function (t) {
        if ((t = this._find(t))) {
          this.stamps = this.stamps.concat(t);
          for (var e = 0, i = t.length; i > e; e++) {
            var n = t[e];
            this.ignore(n);
          }
        }
      }),
      (s.prototype.unstamp = function (t) {
        if ((t = this._find(t)))
          for (var e = 0, i = t.length; i > e; e++) {
            var n = t[e];
            o.removeFrom(this.stamps, n), this.unignore(n);
          }
      }),
      (s.prototype._find = function (t) {
        return t
          ? ("string" == typeof t && (t = this.element.querySelectorAll(t)),
            (t = o.makeArray(t)))
          : void 0;
      }),
      (s.prototype._manageStamps = function () {
        if (this.stamps && this.stamps.length) {
          this._getBoundingRect();
          for (var t = 0, e = this.stamps.length; e > t; t++) {
            var i = this.stamps[t];
            this._manageStamp(i);
          }
        }
      }),
      (s.prototype._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(),
          e = this.size;
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
        };
      }),
      (s.prototype._manageStamp = p),
      (s.prototype._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(),
          i = this._boundingRect,
          o = n(t),
          r = {
            left: e.left - i.left - o.marginLeft,
            top: e.top - i.top - o.marginTop,
            right: i.right - e.right - o.marginRight,
            bottom: i.bottom - e.bottom - o.marginBottom,
          };
        return r;
      }),
      (s.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (s.prototype.bindResize = function () {
        this.isResizeBound ||
          (e.bind(t, "resize", this), (this.isResizeBound = !0));
      }),
      (s.prototype.unbindResize = function () {
        this.isResizeBound && e.unbind(t, "resize", this),
          (this.isResizeBound = !1);
      }),
      (s.prototype.onresize = function () {
        function t() {
          e.resize(), delete e.resizeTimeout;
        }
        this.resizeTimeout && clearTimeout(this.resizeTimeout);
        var e = this;
        this.resizeTimeout = setTimeout(t, 100);
      }),
      (s.prototype.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (s.prototype.needsResizeLayout = function () {
        var t = n(this.element),
          e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth;
      }),
      (s.prototype.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
      }),
      (s.prototype.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
      }),
      (s.prototype.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          var i = this.items.slice(0);
          (this.items = e.concat(i)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i);
        }
      }),
      (s.prototype.reveal = function (t) {
        this._emitCompleteOnItems("reveal", t);
        for (var e = t && t.length, i = 0; e && e > i; i++) {
          var n = t[i];
          n.reveal();
        }
      }),
      (s.prototype.hide = function (t) {
        this._emitCompleteOnItems("hide", t);
        for (var e = t && t.length, i = 0; e && e > i; i++) {
          var n = t[i];
          n.hide();
        }
      }),
      (s.prototype.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e);
      }),
      (s.prototype.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e);
      }),
      (s.prototype.getItem = function (t) {
        for (var e = 0, i = this.items.length; i > e; e++) {
          var n = this.items[e];
          if (n.element === t) return n;
        }
      }),
      (s.prototype.getItems = function (t) {
        t = o.makeArray(t);
        for (var e = [], i = 0, n = t.length; n > i; i++) {
          var r = t[i],
            s = this.getItem(r);
          s && e.push(s);
        }
        return e;
      }),
      (s.prototype.remove = function (t) {
        var e = this.getItems(t);
        if ((this._emitCompleteOnItems("remove", e), e && e.length))
          for (var i = 0, n = e.length; n > i; i++) {
            var r = e[i];
            r.remove(), o.removeFrom(this.items, r);
          }
      }),
      (s.prototype.destroy = function () {
        var t = this.element.style;
        (t.height = ""), (t.position = ""), (t.width = "");
        for (var e = 0, i = this.items.length; i > e; e++) {
          var n = this.items[e];
          n.destroy();
        }
        this.unbindResize();
        var o = this.element.outlayerGUID;
        delete c[o],
          delete this.element.outlayerGUID,
          h && h.removeData(this.element, this.constructor.namespace);
      }),
      (s.data = function (t) {
        t = o.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && c[e];
      }),
      (s.create = function (t, e) {
        function i() {
          s.apply(this, arguments);
        }
        return (
          Object.create
            ? (i.prototype = Object.create(s.prototype))
            : o.extend(i.prototype, s.prototype),
          (i.prototype.constructor = i),
          (i.defaults = o.extend({}, s.defaults)),
          o.extend(i.defaults, e),
          (i.prototype.settings = {}),
          (i.namespace = t),
          (i.data = s.data),
          (i.Item = function () {
            r.apply(this, arguments);
          }),
          (i.Item.prototype = new r()),
          o.htmlInit(i, t),
          h && h.bridget && h.bridget(t, i),
          i
        );
      }),
      (s.Item = r),
      s
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("packery/js/rect", e)
      : "object" == typeof exports
      ? (module.exports = e())
      : ((t.Packery = t.Packery || {}), (t.Packery.Rect = e()));
  })(window, function () {
    function t(e) {
      for (var i in t.defaults) this[i] = t.defaults[i];
      for (i in e) this[i] = e[i];
    }
    var e = (window.Packery = function () {});
    return (
      (e.Rect = t),
      (t.defaults = { x: 0, y: 0, width: 0, height: 0 }),
      (t.prototype.contains = function (t) {
        var e = t.width || 0,
          i = t.height || 0;
        return (
          this.x <= t.x &&
          this.y <= t.y &&
          this.x + this.width >= t.x + e &&
          this.y + this.height >= t.y + i
        );
      }),
      (t.prototype.overlaps = function (t) {
        var e = this.x + this.width,
          i = this.y + this.height,
          n = t.x + t.width,
          o = t.y + t.height;
        return n > this.x && e > t.x && o > this.y && i > t.y;
      }),
      (t.prototype.getMaximalFreeRects = function (e) {
        if (!this.overlaps(e)) return !1;
        var i,
          n = [],
          o = this.x + this.width,
          r = this.y + this.height,
          s = e.x + e.width,
          a = e.y + e.height;
        return (
          this.y < e.y &&
            ((i = new t({
              x: this.x,
              y: this.y,
              width: this.width,
              height: e.y - this.y,
            })),
            n.push(i)),
          o > s &&
            ((i = new t({
              x: s,
              y: this.y,
              width: o - s,
              height: this.height,
            })),
            n.push(i)),
          r > a &&
            ((i = new t({ x: this.x, y: a, width: this.width, height: r - a })),
            n.push(i)),
          this.x < e.x &&
            ((i = new t({
              x: this.x,
              y: this.y,
              width: e.x - this.x,
              height: this.height,
            })),
            n.push(i)),
          n
        );
      }),
      (t.prototype.canFit = function (t) {
        return this.width >= t.width && this.height >= t.height;
      }),
      t
    );
  }),
  (function (t, e) {
    if ("function" == typeof define && define.amd)
      define("packery/js/packer", ["./rect"], e);
    else if ("object" == typeof exports) module.exports = e(require("./rect"));
    else {
      var i = (t.Packery = t.Packery || {});
      i.Packer = e(i.Rect);
    }
  })(window, function (t) {
    function e(t, e, i) {
      (this.width = t || 0),
        (this.height = e || 0),
        (this.sortDirection = i || "downwardLeftToRight"),
        this.reset();
    }
    (e.prototype.reset = function () {
      (this.spaces = []), (this.newSpaces = []);
      var e = new t({ x: 0, y: 0, width: this.width, height: this.height });
      this.spaces.push(e),
        (this.sorter = i[this.sortDirection] || i.downwardLeftToRight);
    }),
      (e.prototype.pack = function (t) {
        for (var e = 0, i = this.spaces.length; i > e; e++) {
          var n = this.spaces[e];
          if (n.canFit(t)) {
            this.placeInSpace(t, n);
            break;
          }
        }
      }),
      (e.prototype.placeInSpace = function (t, e) {
        (t.x = e.x), (t.y = e.y), this.placed(t);
      }),
      (e.prototype.placed = function (t) {
        for (var e = [], i = 0, n = this.spaces.length; n > i; i++) {
          var o = this.spaces[i],
            r = o.getMaximalFreeRects(t);
          r ? e.push.apply(e, r) : e.push(o);
        }
        (this.spaces = e), this.mergeSortSpaces();
      }),
      (e.prototype.mergeSortSpaces = function () {
        e.mergeRects(this.spaces), this.spaces.sort(this.sorter);
      }),
      (e.prototype.addSpace = function (t) {
        this.spaces.push(t), this.mergeSortSpaces();
      }),
      (e.mergeRects = function (t) {
        for (var e = 0, i = t.length; i > e; e++) {
          var n = t[e];
          if (n) {
            var o = t.slice(0);
            o.splice(e, 1);
            for (var r = 0, s = 0, a = o.length; a > s; s++) {
              var h = o[s],
                p = e > s ? 0 : 1;
              n.contains(h) && (t.splice(s + p - r, 1), r++);
            }
          }
        }
        return t;
      });
    var i = {
      downwardLeftToRight: function (t, e) {
        return t.y - e.y || t.x - e.x;
      },
      rightwardTopToBottom: function (t, e) {
        return t.x - e.x || t.y - e.y;
      },
    };
    return e;
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "packery/js/item",
          [
            "get-style-property/get-style-property",
            "outlayer/outlayer",
            "./rect",
          ],
          e
        )
      : "object" == typeof exports
      ? (module.exports = e(
          require("desandro-get-style-property"),
          require("outlayer"),
          require("./rect")
        ))
      : (t.Packery.Item = e(t.getStyleProperty, t.Outlayer, t.Packery.Rect));
  })(window, function (t, e, i) {
    var n = t("transform"),
      o = function () {
        e.Item.apply(this, arguments);
      };
    o.prototype = new e.Item();
    var r = o.prototype._create;
    return (
      (o.prototype._create = function () {
        r.call(this), (this.rect = new i()), (this.placeRect = new i());
      }),
      (o.prototype.dragStart = function () {
        this.getPosition(),
          this.removeTransitionStyles(),
          this.isTransitioning && n && (this.element.style[n] = "none"),
          this.getSize(),
          (this.isPlacing = !0),
          (this.needsPositioning = !1),
          this.positionPlaceRect(this.position.x, this.position.y),
          (this.isTransitioning = !1),
          (this.didDrag = !1);
      }),
      (o.prototype.dragMove = function (t, e) {
        this.didDrag = !0;
        var i = this.layout.size;
        (t -= i.paddingLeft), (e -= i.paddingTop), this.positionPlaceRect(t, e);
      }),
      (o.prototype.dragStop = function () {
        this.getPosition();
        var t = this.position.x != this.placeRect.x,
          e = this.position.y != this.placeRect.y;
        (this.needsPositioning = t || e), (this.didDrag = !1);
      }),
      (o.prototype.positionPlaceRect = function (t, e, i) {
        (this.placeRect.x = this.getPlaceRectCoord(t, !0)),
          (this.placeRect.y = this.getPlaceRectCoord(e, !1, i));
      }),
      (o.prototype.getPlaceRectCoord = function (t, e, i) {
        var n = e ? "Width" : "Height",
          o = this.size["outer" + n],
          r = this.layout[e ? "columnWidth" : "rowHeight"],
          s = this.layout.size["inner" + n];
        e ||
          ((s = Math.max(s, this.layout.maxY)),
          this.layout.rowHeight || (s -= this.layout.gutter));
        var a;
        if (r) {
          (r += this.layout.gutter),
            (s += e ? this.layout.gutter : 0),
            (t = Math.round(t / r));
          var h;
          h = this.layout.options.isHorizontal
            ? e
              ? "ceil"
              : "floor"
            : e
            ? "floor"
            : "ceil";
          var p = Math[h](s / r);
          (p -= Math.ceil(o / r)), (a = p);
        } else a = s - o;
        return (t = i ? t : Math.min(t, a)), (t *= r || 1), Math.max(0, t);
      }),
      (o.prototype.copyPlaceRectPosition = function () {
        (this.rect.x = this.placeRect.x), (this.rect.y = this.placeRect.y);
      }),
      (o.prototype.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.layout.packer.addSpace(this.rect),
          this.emitEvent("remove", [this]);
      }),
      o
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          [
            "classie/classie",
            "get-size/get-size",
            "outlayer/outlayer",
            "packery/js/rect",
            "packery/js/packer",
            "packery/js/item",
          ],
          e
        )
      : "object" == typeof exports
      ? (module.exports = e(
          require("desandro-classie"),
          require("get-size"),
          require("outlayer"),
          require("./rect"),
          require("./packer"),
          require("./item")
        ))
      : (t.Packery = e(
          t.classie,
          t.getSize,
          t.Outlayer,
          t.Packery.Rect,
          t.Packery.Packer,
          t.Packery.Item
        ));
  })(window, function (t, e, i, n, o, r) {
    function s(t, e) {
      return t.position.y - e.position.y || t.position.x - e.position.x;
    }
    function a(t, e) {
      return t.position.x - e.position.x || t.position.y - e.position.y;
    }
    n.prototype.canFit = function (t) {
      return this.width >= t.width - 1 && this.height >= t.height - 1;
    };
    var h = i.create("packery");
    return (
      (h.Item = r),
      (h.prototype._create = function () {
        i.prototype._create.call(this),
          (this.packer = new o()),
          this.stamp(this.options.stamped);
        var t = this;
        (this.handleDraggabilly = {
          dragStart: function () {
            t.itemDragStart(this.element);
          },
          dragMove: function () {
            t.itemDragMove(this.element, this.position.x, this.position.y);
          },
          dragEnd: function () {
            t.itemDragEnd(this.element);
          },
        }),
          (this.handleUIDraggable = {
            start: function (e) {
              t.itemDragStart(e.currentTarget);
            },
            drag: function (e, i) {
              t.itemDragMove(e.currentTarget, i.position.left, i.position.top);
            },
            stop: function (e) {
              t.itemDragEnd(e.currentTarget);
            },
          });
      }),
      (h.prototype._resetLayout = function () {
        this.getSize(), this._getMeasurements();
        var t = this.packer;
        this.options.isHorizontal
          ? ((t.width = Number.POSITIVE_INFINITY),
            (t.height = this.size.innerHeight + this.gutter),
            (t.sortDirection = "rightwardTopToBottom"))
          : ((t.width = this.size.innerWidth + this.gutter),
            (t.height = Number.POSITIVE_INFINITY),
            (t.sortDirection = "downwardLeftToRight")),
          t.reset(),
          (this.maxY = 0),
          (this.maxX = 0);
      }),
      (h.prototype._getMeasurements = function () {
        this._getMeasurement("columnWidth", "width"),
          this._getMeasurement("rowHeight", "height"),
          this._getMeasurement("gutter", "width");
      }),
      (h.prototype._getItemLayoutPosition = function (t) {
        return this._packItem(t), t.rect;
      }),
      (h.prototype._packItem = function (t) {
        this._setRectSize(t.element, t.rect),
          this.packer.pack(t.rect),
          this._setMaxXY(t.rect);
      }),
      (h.prototype._setMaxXY = function (t) {
        (this.maxX = Math.max(t.x + t.width, this.maxX)),
          (this.maxY = Math.max(t.y + t.height, this.maxY));
      }),
      (h.prototype._setRectSize = function (t, i) {
        var n = e(t),
          o = n.outerWidth,
          r = n.outerHeight;
        (o || r) &&
          ((o = this._applyGridGutter(o, this.columnWidth)),
          (r = this._applyGridGutter(r, this.rowHeight))),
          (i.width = Math.min(o, this.packer.width)),
          (i.height = Math.min(r, this.packer.height));
      }),
      (h.prototype._applyGridGutter = function (t, e) {
        if (!e) return t + this.gutter;
        e += this.gutter;
        var i = t % e,
          n = i && 1 > i ? "round" : "ceil";
        return (t = Math[n](t / e) * e);
      }),
      (h.prototype._getContainerSize = function () {
        return this.options.isHorizontal
          ? { width: this.maxX - this.gutter }
          : { height: this.maxY - this.gutter };
      }),
      (h.prototype._manageStamp = function (t) {
        var e,
          i = this.getItem(t);
        if (i && i.isPlacing) e = i.placeRect;
        else {
          var o = this._getElementOffset(t);
          e = new n({
            x: this.options.isOriginLeft ? o.left : o.right,
            y: this.options.isOriginTop ? o.top : o.bottom,
          });
        }
        this._setRectSize(t, e), this.packer.placed(e), this._setMaxXY(e);
      }),
      (h.prototype.sortItemsByPosition = function () {
        var t = this.options.isHorizontal ? a : s;
        this.items.sort(t);
      }),
      (h.prototype.fit = function (t, e, i) {
        var n = this.getItem(t);
        n &&
          (this._getMeasurements(),
          this.stamp(n.element),
          n.getSize(),
          (n.isPlacing = !0),
          (e = void 0 === e ? n.rect.x : e),
          (i = void 0 === i ? n.rect.y : i),
          n.positionPlaceRect(e, i, !0),
          this._bindFitEvents(n),
          n.moveTo(n.placeRect.x, n.placeRect.y),
          this.layout(),
          this.unstamp(n.element),
          this.sortItemsByPosition(),
          (n.isPlacing = !1),
          n.copyPlaceRectPosition());
      }),
      (h.prototype._bindFitEvents = function (t) {
        function e() {
          n++, 2 == n && i.emitEvent("fitComplete", [t]);
        }
        var i = this,
          n = 0;
        t.on("layout", function () {
          return e(), !0;
        }),
          this.on("layoutComplete", function () {
            return e(), !0;
          });
      }),
      (h.prototype.resize = function () {
        var t = e(this.element),
          i = this.size && t,
          n = this.options.isHorizontal ? "innerHeight" : "innerWidth";
        (i && t[n] == this.size[n]) || this.layout();
      }),
      (h.prototype.itemDragStart = function (t) {
        this.stamp(t);
        var e = this.getItem(t);
        e && e.dragStart();
      }),
      (h.prototype.itemDragMove = function (t, e, i) {
        function n() {
          r.layout(), delete r.dragTimeout;
        }
        var o = this.getItem(t);
        o && o.dragMove(e, i);
        var r = this;
        this.clearDragTimeout(), (this.dragTimeout = setTimeout(n, 40));
      }),
      (h.prototype.clearDragTimeout = function () {
        this.dragTimeout && clearTimeout(this.dragTimeout);
      }),
      (h.prototype.itemDragEnd = function (e) {
        var i,
          n = this.getItem(e);
        if (
          (n && ((i = n.didDrag), n.dragStop()),
          !n || (!i && !n.needsPositioning))
        )
          return this.unstamp(e), void 0;
        t.add(n.element, "is-positioning-post-drag");
        var o = this._getDragEndLayoutComplete(e, n);
        n.needsPositioning
          ? (n.on("layout", o), n.moveTo(n.placeRect.x, n.placeRect.y))
          : n && n.copyPlaceRectPosition(),
          this.clearDragTimeout(),
          this.on("layoutComplete", o),
          this.layout();
      }),
      (h.prototype._getDragEndLayoutComplete = function (e, i) {
        var n = i && i.needsPositioning,
          o = 0,
          r = n ? 2 : 1,
          s = this;
        return function () {
          return (
            o++,
            o != r
              ? !0
              : (i &&
                  (t.remove(i.element, "is-positioning-post-drag"),
                  (i.isPlacing = !1),
                  i.copyPlaceRectPosition()),
                s.unstamp(e),
                s.sortItemsByPosition(),
                n && s.emitEvent("dragItemPositioned", [i]),
                !0)
          );
        };
      }),
      (h.prototype.bindDraggabillyEvents = function (t) {
        t.on("dragStart", this.handleDraggabilly.dragStart),
          t.on("dragMove", this.handleDraggabilly.dragMove),
          t.on("dragEnd", this.handleDraggabilly.dragEnd);
      }),
      (h.prototype.bindUIDraggableEvents = function (t) {
        t.on("dragstart", this.handleUIDraggable.start)
          .on("drag", this.handleUIDraggable.drag)
          .on("dragstop", this.handleUIDraggable.stop);
      }),
      (h.Rect = n),
      (h.Packer = o),
      h
    );
  });
