function getOSInfo() {
  var ua = navigator.userAgent;

  if (ua.indexOf("NT 6.0") != -1) return "Windows Vista/Server 2008";
  else if (ua.indexOf("NT 6.1") != -1) return "Windows 7";
  else if (ua.indexOf("NT 6.2") != -1) return "Windows 8";
  else if (ua.indexOf("NT 6.4") != -1) return "Windows 10";
  else if (ua.indexOf("NT 5.0") != -1) return "Windows 2000";
  else if (ua.indexOf("NT 5.1") != -1) return "Windows XP";
  else if (ua.indexOf("NT 5.2") != -1) return "Windows Server 2003";
  else if (ua.indexOf("NT") != -1) return "Windows NT";
  else if (ua.indexOf("9x 4.90") != -1) return "Windows Me";
  else if (ua.indexOf("98") != -1) return "Windows 98";
  else if (ua.indexOf("95") != -1) return "Windows 95";
  else if (ua.indexOf("Win16") != -1) return "Windows 3.x";
  else if (ua.indexOf("Windows") != -1) return "Windows";
  else if (ua.indexOf("Linux") != -1) return "Linux";
  else if (ua.indexOf("Macintosh") != -1) return "Macintosh";
  else return "OTHER OS";
}

function visitorStatistics() {
  if (getCookie("visit") != "ok") {
    var x = window.screen.width;
    var y = window.screen.height;
    var os = getOSInfo();
    var url = location.pathname;
    var ei = navigator.userAgent;
    var referrer = document.referrer;
    var ei_ver = "";

    if (ei.indexOf("MSIE ") > 0) {
      ei_ver = parseInt(ei.split(";")[1].replace(" MSIE ", ""));
      ei = "Microsoft Internet Explorer";
    } else if (ei.indexOf("Trident") > 0) {
      ei_ver = parseInt(ei.split("rv:")[1]);
      ei = "Microsoft Internet Explorer";
    } else if (ei.indexOf("Firefox") > 0) {
      ei_ver = parseInt(ei.split("Firefox/")[1]);
      ei = "Firefox";
    } else if (ei.indexOf("Opera") >= 0) {
      ei_ver = ei
        .split(" ")
        [ei.split(" ").length - 1].replace("Version/", "")
        .split(".")[0];
      ei = "Opera";
    } else if (ei.indexOf("OPR") >= 0) {
      ei_ver = parseInt(ei.split("OPR/")[1]);
      ei = "Opera";
    } else if (ei.indexOf("Chrome") > 0) {
      ei_ver = ei
        .split(" ")
        [ei.split(" ").length - 2].replace("Chrome/", "")
        .split(".")[0];
      ei = "Chrome";
    } else if (ei.indexOf("Safari") > 0) {
      ei_ver = ei
        .split(" ")
        [ei.split(" ").length - 2].replace("Version/", "")
        .split(".")[0];
      ei = "Safari";
    } else {
      ei_ver = 0;
      ei = "OTHER BROWSER";
    }

    $.ajax({
      url: "/statistics/__statistics_visitor.php",
      async: true,
      data: {
        screen_x: x,
        screen_y: y,
        ei: ei,
        ei_ver: ei_ver,
        os: os,
        referrer: referrer,
      },
    });
  }

  $.ajax({
    url: "/statistics/__statistics_page_view.php",
    async: true,
  });
}
visitorStatistics();
