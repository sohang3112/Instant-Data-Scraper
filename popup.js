/*! InstantDataScraperNext - 2021-01-21 */

function e(e, t, n, o, a, r, i) {
  var s = {},
    c = null,
    l = !1,
    u = !1,
    d = {
      urls: ["<all_urls>"],
      tabId: n,
      types: [
        "main_frame",
        "sub_frame",
        "stylesheet",
        "script",
        "font",
        "object",
        "xmlhttprequest",
        "other",
      ],
    };
  function f() {
    !l &&
      u &&
      (
        i ||
        function (e) {
          e(!0);
        }
      )(function (e) {
        if (!e) return h();
        l ||
          ((l = !0),
          chrome.webRequest.onBeforeRequest.removeListener(p),
          chrome.webRequest.onCompleted.removeListener(g),
          t());
      });
  }
  function p(e) {
    (s[e.requestId] = 1), (c = new Date());
  }
  function g(e) {
    c && (delete s[e.requestId], Object.keys(s).length || h());
  }
  function h() {
    setTimeout(function () {
      new Date() - c < a || Object.keys(s).length || f();
    }, a);
  }
  chrome.webRequest.onBeforeRequest.addListener(p, d),
    chrome.webRequest.onCompleted.addListener(g, d),
    chrome.webRequest.onErrorOccurred.addListener(g, d),
    (
      e ||
      function (e) {
        e();
      }
    )(function () {
      setTimeout(f, o),
        setTimeout(function () {
          (u = !0), h();
        }, r);
    });
}
var t = { id: parseInt(c("tabid")), url: c("url") },
  n = {},
  o = 1e3;
console.log("currentTab.url: ", t.url);
var a = null;
async function r() {
  null !== t.url.toLowerCase().match(/\/\/[a-z]+\.linkedin\.com/)
    ? ($("#waitHeader").hide(),
      l(
        "We're unable to collect data from LinkedIn. Sorry for the inconvenience.  If you have further questons please contact us at info@webrobots.io",
        "noResponseErr",
        !1,
        !0
      ))
    : (q(),
      D(),
      setTimeout(function () {
        $("#waitHeader").is(":visible") && S(!0);
      }, 3e4),
      $(window).resize(function () {
        v();
      }));
}
function i(e, t) {
  return (t || ".") + e.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&");
}
function s(e) {
  return (e.attr("class") || "")
    .trim()
    .split(/\s+/)
    .filter(function (e) {
      return e;
    });
}
function c(e) {
  for (
    var t = window.location.search.substring(1).split("&"), n = 0;
    n < t.length;
    n++
  ) {
    var o = t[n].split("=");
    if (decodeURIComponent(o[0]) == e) return decodeURIComponent(o[1]);
  }
  console.log("Query variable %s not found", e);
}
function l(e, o, a, r) {
  if ("" === e) return $("#" + o).hide();
  $("#" + o)
    .show()
    .text(e),
    a && I(),
    r && _gaq.push(["_trackEvent", "Error", n.startingUrl || t.url, e, 1]);
}
function u(e) {
  var t = e.length,
    o = { "": 1 / 0 },
    a = {},
    r = {},
    s = {},
    c = {};
  function l(e) {
    return e in o ? o[e] : ((o[e] = $(i(e)).length), o[e]);
  }
  e.map(function (e) {
    for (var t in e) t in a || (a[t] = 0), a[t]++;
  }),
    Object.keys(a)
      .map(function (e) {
        return [a[e], e];
      })
      .forEach(function (n) {
        var o = "",
          a = 1 / 0;
        n[1]
          .split(" ")[0]
          .split("/")
          .slice(1)
          .reverse()
          .forEach(function (e) {
            e.split(".")
              .slice(1)
              .forEach(function (e) {
                a < 2 * t || l(e) >= a || ((o = e), (a = l(e)));
              });
          });
        var i = n[1].split(" ")[1],
          u = 0,
          d = e.map(function (e) {
            return n[1] in e;
          });
        i && isNaN(i) && (o += " " + i),
          o in r
            ? (r[o].forEach(function (e, t) {
                if (!u) {
                  var n = !0;
                  e.forEach(function (e, t) {
                    n &= !(d[t] && e);
                  }),
                    n && (u = t + 1);
                }
              }),
              u
                ? (r[o][u - 1] = r[o][u - 1].map(function (e, t) {
                    return d[t] || e;
                  }))
                : (r[o].push(d), (u = r[o].length)),
              u > 1 && (o += " " + u))
            : (r[o] = [d]),
          o in s || (s[o] = []),
          s[o].push(n[1]),
          o in c || (c[o] = 0),
          (c[o] += n[0]);
      });
  var u = {},
    d = 0,
    f = 0,
    p = 0;
  (r = Object.keys(s).filter(function (o) {
    var a = {},
      r = [];
    return (
      !(o in n.config.deletedFields) &&
      (e.map(function (e) {
        for (var t, n = 0; n < s[o].length; n++)
          s[o][n] in e && ((t = e[s[o][n]]) in a || (a[t] = 0), a[t]++);
        r.push(t);
      }),
      Object.keys(a).length && a[Object.keys(a)[0]] == t
        ? (f++, !1)
        : (r = JSON.stringify(r)) in u
        ? (d++, !1)
        : ((u[r] = 1), !(c[o] < 0.2 * t) || (p++, !1)))
    );
  })),
    console.log("Same columns: " + d),
    console.log("Columns with same rows: " + f),
    console.log("Columns with few rows: " + p),
    console.log("Generated column names:", r);

  // THIS IS ACTUAL GENERATED CSV DATA  
  window.generatedCSVData = {
    fields: r,
    data: e.map(function (e) {
      return r.map(function (t) {
        for (var n = 0; n < s[t].length; n++)
          if (s[t][n] in e) return e[s[t][n]];
        return "";
      });
    }),
  };
  return console.log("Generated csv:", generatedCSVData), generatedCSVData;
}
function d(e) {
  return e.map(function (e) {
    return e in n.config.headers ? n.config.headers[e] : e;
  });
}
function f(e) {
  var t = u(e);
  return (t.fields = d(t.fields)), t;
}
function p(e) {
  for (
    var t = new ArrayBuffer(e.length), n = new Uint8Array(t), o = 0;
    o != e.length;
    ++o
  )
    n[o] = 255 & e.charCodeAt(o);
  return t;
}
function g(e, t) {
  return (
    t && (e += 1462), (Date.parse(e) - new Date(Date.UTC(1899, 11, 30))) / 864e5
  );
}
function h(e, t) {
  for (
    var n = {}, o = { s: { c: 1e7, r: 1e7 }, e: { c: 0, r: 0 } }, a = 0;
    a != e.length;
    ++a
  )
    for (var r = 0; r != e[a].length; ++r) {
      o.s.r > a && (o.s.r = a),
        o.s.c > r && (o.s.c = r),
        o.e.r < a && (o.e.r = a),
        o.e.c < r && (o.e.c = r);
      var i = { v: e[a][r] };
      if (null !== i.v) {
        var s = XLSX.utils.encode_cell({ c: r, r: a });
        "number" == typeof i.v
          ? (i.t = "n")
          : "boolean" == typeof i.v
          ? (i.t = "b")
          : i.v instanceof Date
          ? ((i.t = "n"), (i.z = XLSX.SSF._table[14]), (i.v = g(i.v)))
          : (i.t = "s"),
          (n[s] = i);
      }
    }
  return o.s.c < 1e7 && (n["!ref"] = XLSX.utils.encode_range(o)), n;
}
function w(e, t) {
  e.data.unshift(e.fields);
  var n = new (function e() {
      if (!(this instanceof e)) return new e();
      (this.SheetNames = []), (this.Sheets = {});
    })(),
    o = h(e.data);
  return (
    n.SheetNames.push(t), (n.Sheets[t] = o), XLSX.write(n, { type: "binary" })
  );
}
function m() {
  _gaq.push([
    "_trackEvent",
    "Download",
    n.hostName,
    n.startingUrl,
    n.data.length,
  ]);
}
function v() {
  console.log("Showing preview");
  var e = u(n.data);
  (e.data = e.data.slice(0, o)), (n.previewLength = e.data.length);
  var t = $(".wtHolder").scrollTop(),
    a = $(".wtHolder").scrollLeft(),
    r = !1;
  $("#hot").empty();
  new Handsontable($("#hot").get(0), {
    data: e.data,
    colHeaders: d(e.fields),
    wordWrap: !1,
    manualColumnResize: !0,
    width: $(window).width() - 20,
    height: $(window).height() - 300,
    afterRender: function () {
      r ||
        ((r = !0), $(".wtHolder").scrollTop(t), $(".wtHolder").scrollLeft(a));
    },
    modifyColWidth: function (e, t) {
      if (e > 300) return 300;
    },
    afterGetColHeader: function (t, o) {
      if (-1 != t && !($(o).children().length > 1)) {
        var a = this,
          r = $("<div>", { class: "hot-header" }),
          i = $("<div>", {
            class: "header-input",
            contenteditable: "true",
            text: o.firstChild.textContent,
          });
        $(o).append(r),
          r.append(i),
          r.append(
            $("<span>", {
              class: "glyphicon glyphicon-remove remove-column",
            }).click(function () {
              (n.config.deletedFields[e.fields[t]] = !0),
                b(),
                $("#resetColumns").show(),
                v();
            })
          ),
          $(o).click(function () {
            console.log("a"),
              setTimeout(function () {
                i.trigger("focus");
              }, 10);
          }),
          Handsontable.Dom.addEvent(i.get(0), "input", function (o) {
            var r = a.getColHeader();
            (r[t] = i.text()),
              console.log(i.text()),
              (n.config.headers[e.fields[t]] = i.text()),
              b(),
              a.updateSettings({ colHeaders: r });
          }),
          (o.firstChild.style.display = "none");
      }
    },
    beforeOnCellMouseDown: function (e, t, n) {
      t.row < 0 && e.stopImmediatePropagation();
    },
  });
}
function b() {
  localStorage.setItem(n.configName, JSON.stringify(n.config));
}
function S(e) {
  $("#waitHeader").hide(),
    l(
      "Instant Data doesn't support data extraction from this site yet. Our administrators are notified and will try to add support in the future. Thanks for trying us out!",
      "noResponseErr",
      !1,
      !0
    );
}
function k() {
  return localStorage.getItem("nextSelector:" + n.hostName);
}
function x(e, o) {
  if (!e)
    return t.reloaded
      ? S()
      : ((t.reloaded = !0),
        chrome.tabs.reload(t.id, {}, function () {
          setTimeout(D, 1e3);
        }));
  (n.tableId = e.tableId),
    (n.scraping = !1),
    (n.tableSelector = e.tableSelector),
    (n.startingUrl = e.href),
    (n.hostName = e.hostname),
    (n.previewLength = 0),
    (n.configName = e.hostname + "-config"),
    (n.config = JSON.parse(localStorage.getItem(n.configName)) || {
      headers: {},
      deletedFields: {},
      crawlDelay: 1e3,
      maxWait: 2e4,
    }),
    _gaq.push([
      "_trackEvent",
      o ? "OpenPopup" : "AnotherTable",
      n.hostName,
      n.startingUrl,
      1,
    ]),
    Object.keys(n.config.deletedFields).length && $("#resetColumns").show();
  var a = y(t.url);
  $("#wrongTable").show(),
    n.config.infinateScrollChecked && $("#infinateScroll").click(),
    chrome.tabs.sendRequest(t.id, { action: "getTableData" }, function (e) {
      e.tableId == n.tableId &&
        (n.pages ||
          ($("#nextButton").show(),
          (n.nextSelector = k()),
          console.log("Next selector for " + n.hostName, n.nextSelector),
          n.nextSelector &&
            chrome.tabs.sendRequest(
              t.id,
              { action: "markNextButton", selector: n.nextSelector },
              function (e) {
                e.error ||
                  ($("#nextButton").hide(), $("#startScraping").show());
              }
            )),
        $("#wait").hide(),
        $("#content").show(),
        l(
          'Download data or locate "Next" to crawl multiple pages',
          "instructions"
        ),
        (n.data = e.data),
        (n.pages = 1),
        (n.lastRows = e.data.length),
        (n.tableSelector = e.tableSelector),
        (n.workingTime = 0),
        L(),
        v(),
        $(".download-button").show(),
        $("#csv")
          .off("click")
          .click(function () {
            console.log("Downloading CSV..."),
              m(),
              E({ download: !0 }),
              saveAs(
                new Blob([Papa.unparse(f(n.data))], {
                  type: "application/octet-stream",
                }),
                a + ".csv"
              );
          }),
        $("#xlsx")
          .off("click")
          .click(function () {
            console.log("Downloading XLS..."),
              m(),
              E({ download: !0 }),
              saveAs(
                new Blob([p(w(f(n.data), t.url.substring(0, 100)))], {
                  type: "application/octet-stream",
                }),
                a + ".xlsx"
              );
          }),
        $("#copy")
          .off("click")
          .click(function () {
            console.log("Copying tsv data to clipboard"),
              m(),
              E({ download: !0 }),
              R(Papa.unparse(f(n.data), { delimiter: "\t" }));
          }));
    });
}
function y(e) {
  var t = new URL(e).hostname.split(".");
  return t[0].indexOf("www") > -1 ? t[1] : t[0];
}
function R(e) {
  var t = function (t) {
    t.preventDefault(),
      t.clipboardData
        ? t.clipboardData.setData("text/plain", e)
        : window.clipboardData && window.clipboardData.setData("Text", e);
  };
  window.addEventListener("copy", t),
    document.execCommand("copy"),
    window.removeEventListener("copy", t);
}
function D() {
  chrome.tabs.sendRequest(
    t.id,
    { action: "findTables", robot: a },
    function (e) {
      x(e, !0);
    }
  );
}
function N() {
  return $("#infinateScroll").is(":checked");
}
function C(e) {
  n.data = n.data.concat(e);
  var t = new Set();
  n.data.forEach((e) => t.add(JSON.stringify(e))),
    (n.data = Array.from(t, (e) => JSON.parse(e)));
}
function q() {
  $("#stopScraping").click(I),
    $("#crawlDelay").bind(
      "propertychange change click keyup input paste",
      function () {
        var e = $(this).val();
        if (isNaN(e) || e < 0 || parseInt(1e3 * e) >= n.config.maxWait)
          return l("Bad min waiting value", "inputError");
        l("", "inputError"), (n.config.crawlDelay = parseInt(1e3 * e)), b();
      }
    ),
    $("#maxWait").bind(
      "propertychange change click keyup input paste",
      function () {
        var e = $(this).val();
        if (isNaN(e) || parseInt(1e3 * e) <= n.config.crawlDelay)
          return l("Bad max waiting value", "inputError");
        l("", "inputError"), (n.config.maxWait = parseInt(1e3 * e)), b();
      }
    ),
    $("#resetColumns").click(function () {
      (n.config.deletedFields = {}), b(), $("#resetColumns").hide(), v();
    }),
    $("#infinateScroll").click(function (e) {
      $(this).is(":checked")
        ? ((n.config.infinateScrollChecked = !0),
          $("#nextButton").hide(),
          $("#startScraping").show())
        : ((n.config.infinateScrollChecked = !1),
          $("#nextButton").show(),
          $("#startScraping").hide()),
        b();
    });
}
function I() {
  (n.scraping = !1),
    console.log("Scraping stopped."),
    $("#startScraping").show(),
    $("#stopScraping").hide(),
    l(
      "Crawling stopped. Please download data or continue crawling.",
      "instructions"
    );
}
function T() {
  $("#pleaseRate").show(),
    $("#rateLater")
      .show()
      .click(function () {
        E({ rate: "later" }),
          $("#pleaseRate").hide(),
          _gaq.push(["_trackEvent", "Click", "Rate later", "", 1]);
      }),
    $("#rate")
      .show()
      .click(function () {
        E({ rate: "now" }),
          $("#pleaseRate").hide(),
          _gaq.push(["_trackEvent", "Click", "Rate now", "", 1]),
          chrome.tabs.create({
            url: "https://chrome.google.com/webstore/detail/instant-data-scraper/ofaokhiedipichpaobibbnahnkdoiiah/reviews",
          });
      });
}
function E(e) {
  var t = JSON.parse(localStorage.getItem("stats")) || {
    pages: 0,
    rows: 0,
    downloads: 0,
    tabs: 0,
    lastRateRequest: null,
    lastDownloads: 0,
    lastRows: 0,
    rated: !1,
  };
  e.download
    ? t.downloads++
    : e.rate
    ? ("later" == e.rate &&
        ((t.lastRateRequest = new Date().getTime()),
        (t.lastDownloads = t.downloads),
        (t.lastRows = t.rows)),
      "now" == e.rate && (t.rated = !0))
    : (1 == n.pages && t.tabs++, t.pages++, (t.rows += n.lastRows)),
    !t.rated &&
      new Date().getTime() - t.lastRateRequest > 52704e5 &&
      t.downloads - t.lastDownloads > 9 &&
      t.rows - t.lastRows > 999 &&
      T(),
    localStorage.setItem("stats", JSON.stringify(t));
}
function L() {
  $("#stats")
    .empty()
    .append($("<div>", { text: "Pages scraped: " + n.pages }))
    .append($("<div>", { text: "Rows collected: " + n.data.length }))
    .append($("<div>", { text: "Rows from last page: " + n.lastRows }))
    .append(
      $("<div>", {
        text: "Working time: " + parseInt(n.workingTime / 1e3) + "s",
      })
    ),
    _gaq.push([
      "_trackEvent",
      "GotRows",
      n.hostName,
      n.startingUrl,
      n.lastRows,
    ]),
    E({});
}
r(),
  $("#wrongTable").click(function () {
    chrome.tabs.sendRequest(t.id, { action: "nextTable" }, x);
  }),
  $("#nextButton").click(function () {
    $("#nextButton").hide(),
      $("#infinateScrollElement").hide(),
      l('Mark "Next" button or link', "instructions"),
      (n.gettingNext = !0),
      (function e() {
        chrome.tabs.sendRequest(
          t.id,
          { action: "getNextButton" },
          function (t) {
            n.scraping ||
              (n.gettingNext && e(),
              t.selector &&
                ($("#startScraping").show(),
                l(
                  '"Next" button located. Press "Start crawling" to get more pages or mark another button/link if marked incorrectly.',
                  "instructions"
                ),
                (n.nextSelector = t.selector),
                localStorage.setItem("nextSelector:" + n.hostName, t.selector),
                console.log(t)));
          }
        );
      })();
  }),
  $("#startScraping").click(function () {
    (n.gettingNext = !1),
      (n.scraping = !0),
      console.log("Starting scraping..."),
      $("#startScraping").hide(),
      $("#nextButton").hide(),
      $("#stopScraping").show(),
      l("", "error"),
      l('Please wait for more pages or press "Stop crawling".', "instructions"),
      N() && $("#infinateScrollElement").hide();
    var a = new Date();
    !(function r() {
      const i = function (e) {
        chrome.tabs.sendRequest(t.id, { action: "scrollDown" }, function (t) {
          if (t && t.error)
            return l("", "instructions"), l(t.error, t.errorId || "error", !0);
          $("#wrongTable").hide(), e();
        });
      };
      var s = function (e) {
        chrome.tabs.sendRequest(
          t.id,
          { action: "clickNext", selector: n.nextSelector },
          function (t) {
            if (t && t.error)
              return l("", "instructions"), l(t.error, t.errorId, !0);
            $("#wrongTable").hide(), e();
          }
        );
      };
      N() && (s = i),
        e(
          s,
          function () {
            chrome.tabs.sendRequest(
              t.id,
              { action: "getTableData", selector: n.tableSelector },
              function (e) {
                if (e) {
                  if (e.error)
                    return (
                      l("", "instructions"),
                      l(e.error, e.errorId || "error", !0)
                    );
                  (n.lastRows = e.data.length),
                    n.pages++,
                    (n.workingTime += new Date() - a),
                    (a = new Date()),
                    C(e.data),
                    L(),
                    n.previewLength < o
                      ? v()
                      : l("Preview limited to 1000 rows.", "previewLimit"),
                    n.scraping && r();
                }
              }
            );
          },
          t.id,
          n.config.maxWait,
          100,
          n.config.crawlDelay,
          function (e) {
            chrome.tabs.sendRequest(t.id, {}, function (t) {
              e(void 0 !== t);
            });
          }
        );
    })();
  });
